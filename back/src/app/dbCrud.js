import { conectar } from './db.js';

export const login = async (user) => {
  const con = await conectar();
  const sql = 'SELECT * FROM user WHERE email_user =? AND senha_user =?';
  const valores = [user.email, user.password];
  const [linhas] = await con.query(sql, valores);
  if (linhas.length > 0) return linhas[0].id_user;
  return false;
};

export const receberUser = async () => {
  const con = await conectar();
  const sql = 'SELECT * FROM user';
  const [linhas] = await con.query(sql);
  return await linhas;
};

export const receberTaskUser = async (id) => {
  const con = await conectar();
  const sql = 'SELECT * FROM `task` WHERE task.user_id_fk = ?';
  const valores = [id];
  const [linhas] = await con.query(sql, valores);
  return await linhas;
};

export const insertUser = async (user) => {
  const con = await conectar();
  const sql =
    'INSERT INTO user (nome_user,email_user,senha_user) VALUES (?,?,?)';
  const valores = [user.nome, user.email, user.senha];
  return await con.query(sql, valores);
};

export const insertTaskUser = async (task, idUser) => {
  const con = await conectar();
  const sql =
    'INSERT INTO `task` (`id_task`, `task_task`, `user_id_fk`) VALUES (NULL, ?, ?);';
  const valores = [task, idUser];
  return await con.query(sql, valores);
};

export const atualizaUser = async (idUser, user) => {
  const con = await conectar();
  const sql = 'UPDATE user SET nome_user=?,senha_user=? WHERE id_user=?';
  const valores = [user.nome, user.senha, idUser];
  await con.query(sql, valores);
};

export const atualizaTaskUser = async (task) => {
  const con = await conectar();
  const sql = 'UPDATE `task` SET `task_task` = ? WHERE `task`.`id_task` = ?;';
  const valores = [task.txt, task.id];
  await con.query(sql, valores);
};

export const deletaUser = async (idUser) => {
  const con = await conectar();
  const sql = 'DELETE FROM user WHERE id_user=?';
  const valores = [idUser];
  await con.query(sql, valores);
};

export const deletaTaskUser = async (idTask) => {
  const con = await conectar();
  const sql = '"DELETE FROM task WHERE `task`.`id_task` = ?"';
  const valores = [idTask];
  await con.query(sql, valores);
};
