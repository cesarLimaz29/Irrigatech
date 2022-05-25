const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');


const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3000;
const HABILITAR_OPERACAO_INSERIR = true;

const serial = async (
    valoresFkSensor,
    valoresDht11Umidade,
    valoresDht11Temperatura
) => {
    const poolBancoDados = mysql.createPool(
        {
            host: 'localhost',
            port: 3306,
            user: 'admin',
            password: 'admin',
            database: 'projeto_iot'
        }
    ).promise();

    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        const valores = data.split(';');
        const fkSensor = parseFloat(valores[0])
        const dht11Umidade = parseFloat(valores[1]);
        const dht11Temperatura = parseFloat(valores[2]);

        valoresFkSensor.push(fkSensor);
        valoresDht11Umidade.push(dht11Umidade);
        valoresDht11Temperatura.push(dht11Temperatura);

        if (HABILITAR_OPERACAO_INSERIR) {
            await poolBancoDados.execute(
                'INSERT INTO dados_sensor (fk_sensor, umidade, temperatura) VALUES (?, ?, ?)',
                [fkSensor, dht11Umidade, dht11Temperatura]
            );
            console.log("valores inseridos no banco pelo sensor" + fkSensor + ": " + dht11Umidade + ", " + dht11Temperatura)
        }

    });
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

const servidor = (
    valoresFkSensor,
    valoresDht11Umidade,
    valoresDht11Temperatura,
) => {
    const app = express();
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });
    app.get('/sensores/fkSensor', (_, response) => {
        return response.json(valoresFkSensor);
    });
    app.get('/sensores/dht11/umidade', (_, response) => {
        return response.json(valoresDht11Umidade);
    });
    app.get('/sensores/dht11/temperatura', (_, response) => {
        return response.json(valoresDht11Temperatura);
    });
}

(async () => {
    const valoresFkSensor = []
    const valoresDht11Umidade = [];
    const valoresDht11Temperatura = [];
    await serial(
        valoresFkSensor,
        valoresDht11Umidade,
        valoresDht11Temperatura,
    );
    servidor(
        valoresFkSensor,
        valoresDht11Umidade,
        valoresDht11Temperatura,
    );
})();
