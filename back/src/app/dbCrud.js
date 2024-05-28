const conexaoDB=require('./db')//recebe os parametros para conexão com o banco de dados SQL

const  receberUser = async ()=>{ // ---------------- FUNÇÃO SELECT -------------------------
  const con = await conexaoDB.conectar()
  
  const sql = 'SELECT * FROM user'

  const [linhas] = await con.query(sql)
  return await linhas
  
  
}

const  insertUser = async (user)=>{//--------------------------- FUNÇÃO INSERT ----------------------
  const con = await conexaoDB.conectar()
  
  const sql = 'INSERT INTO user (nome_user,senha_user) VALUES (?,?)'
  const valores =[user.nome,user.senha] 
  await con.query(sql,valores)
  
  
  
}

const  atualizaUser = async (idUser,user)=>{//---------------------------------- FUNÇÃO UPDATE ----------------------
  const con = await conexaoDB.conectar()

  const sql = 'UPDATE user SET nome_user=?,senha_user=? WHERE id_user=?'
  const valores =[user.nome,user.senha,idUser] 
  await con.query(sql,valores)
  
}

const  deletaUser = async (idUser)=>{ //--------------------------- FUNÇÃO DELETE -----------------------------------------
  const con = await conexaoDB.conectar()

  const sql = 'DELETE FROM user WHERE id_user=?'
  const valores =[idUser] 
  await con.query(sql,valores)
  
}

module.exports = {receberUser,insertUser,atualizaUser,deletaUser}