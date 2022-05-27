var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {
    instrucaoSql = `
    select umidade,
        temperatura,
            hora_sensor,
                    from Dados_sensor 
                        where fksensor = ${idAquario}
                            order by id desc limit ${limite_linhas}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {
    instrucaoSql = `
    select umidade,
        temperatura,
            hora_sensor,
                    from Dados_sensor 
                        where fksensor = ${idAquario} 
                            order by id desc limit 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}