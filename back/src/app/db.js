const conectar = async ()=>{
    if (global.conexao && global.conexao.state != 'disconected')
        return global.conexao
    const mysql = require('mysql2/promise.js')
    const con = await mysql.createConnection({
        host: 'srv1193.hstgr.io',
        user: 'u464362699_a3_projeto_use',
        password: 'B7/3DxPYq=v',
        database: 'u464362699_a3_projeto'
       });
    
    console.log('Conectado')
    global.conexao = con
    return con
}

module.exports = {conectar} // exporta os paramentro da conexão com banco de dados SQL