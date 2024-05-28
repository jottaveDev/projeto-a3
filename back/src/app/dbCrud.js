const conexaoDB=require('./db')//recebe os parametros para conexão com o banco de dados SQL

//---------------------------------------- RECEBER DADOS DAS TABELAS USER E TASK -----------------------------------------------------------

const  receberUser = async ()=>{ // ---------------- FUNÇÃO SELECT USER-------------------------
  const con = await conexaoDB.conectar()
  
  const sql = 'SELECT * FROM user'

  const [linhas] = await con.query(sql)
  return await linhas
  
  
}

const  receberTaskUser = async (user)=>{ // ---------------- FUNÇÃO SELECT TASK-------------------------
  const con = await conexaoDB.conectar()
  
  const sql = 'SELECT * FROM `task` WHERE task.user_id_fk = ?'
  const valores =[user.id]

  const [linhas] = await con.query(sql,valores)
  return await linhas
  
  
}

//---------------------------------------- INSERT NAS TABELAS USER E TASK -----------------------------------------------------------
const  insertUser = async (user)=>{//--------------------------- FUNÇÃO INSERT USER ----------------------
  const con = await conexaoDB.conectar()
  
  const sql = 'INSERT INTO user (nome_user,senha_user) VALUES (?,?)'
  const valores =[user.nome,user.senha] 
  await con.query(sql,valores) 
  
}

const  insertTaskUser = async (task,idUser)=>{//--------------------------- FUNÇÃO INSERT TASK ----------------------
  const con = await conexaoDB.conectar()
  
  const sql = 'INSERT INTO `task` (`id_task`, `task_task`, `user_id_fk`) VALUES (NULL, ?, ?);'
  const valores =[task,idUser] 
  await con.query(sql,valores) 
  
}

//---------------------------------------- ATUALIZAÇÃO NAS TABELAS USER E TASK -----------------------------------------------------------

const  atualizaUser = async (idUser,user)=>{//---------------------------------- FUNÇÃO UPDATE ----------------------
  const con = await conexaoDB.conectar()

  const sql = 'UPDATE user SET nome_user=?,senha_user=? WHERE id_user=?'
  const valores =[user.nome,user.senha,idUser] 
  await con.query(sql,valores)
  
}

const  atualizaTaskUser = async (task)=>{//---------------------------------- FUNÇÃO UPDATE ----------------------
  const con = await conexaoDB.conectar()

  const sql = "UPDATE `task` SET `task_task` = ? WHERE `task`.`id_task` = ?;"
  const valores =[task.txt,task.id] 
  await con.query(sql,valores)
  
}

//---------------------------------------- DELETAR NAS TABELAS USER E TASK -----------------------------------------------------------

const  deletaUser = async (idUser)=>{ //--------------------------- FUNÇÃO DELETE USER-----------------------------------------
  const con = await conexaoDB.conectar()

  const sql = 'DELETE FROM user WHERE id_user=?'
  const valores =[idUser] 
  await con.query(sql,valores)
  
}

const  deletaTaskUser = async (idUser)=>{ //--------------------------- FUNÇÃO DELETE TASK-----------------------------------------
  const con = await conexaoDB.conectar()

  const sql = 'DELETE FROM user WHERE id_user=?'
  const valores =[idUser] 
  await con.query(sql,valores)
  
}

module.exports = {receberUser,receberTaskUser,insertUser,insertTaskUser,atualizaUser,atualizaTaskUser,deletaUser,deletaTaskUser}