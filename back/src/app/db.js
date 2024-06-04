import mysql from 'mysql2/promise';

export const conectar = async () => {
  if (global.conexao && global.conexao.state != 'disconected')
    return global.conexao;
  const con = await mysql.createConnection({
    host: 'srv1193.hstgr.io',
    user: 'u464362699_a3_projeto_use',
    password: 'B7/3DxPYq=v',
    database: 'u464362699_a3_projeto',
  });
  console.log('Conectado');
  global.conexao = con;
  return con;
};
