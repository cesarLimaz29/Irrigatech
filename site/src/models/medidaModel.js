var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {
    instrucaoSql = `select top ${limite_linhas} 
                    umidade,  
                    temperatura,
                    hora_sensor,
                    CONVERT(varchar, hora_sensor, 108) as momento_grafico
                from dados_sensor
                where fksensor = ${idAquario}
                order by id_dados desc`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {
    instrucaoSql = `select top 1 
                    umidade,
                    temperatura,  
                    CONVERT(varchar, hora_sensor, 108) as momento_grafico, 
                    fksensor
                    from dados_sensor where fksensor = ${idAquario} 
                order by id_dados desc`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}