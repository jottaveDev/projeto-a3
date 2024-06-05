import { Router } from 'express';
import { atualizaUser, insertUser, login, receberUser } from './dbCrud.js';
import TaskManager from './entities/TaskManager.js';

const routes = Router();
const taskManager = new TaskManager();

routes.post('/login', async (request, response) => {
  const { email, password } = request.body;
  const user = { email, password };
  const id = await login(user);
  if (!id) return response.status(401).json({ message: 'Não autenticado' });
  return response.status(200).json({ message: 'Autenticado' });
});

routes.get('/users', async (request, response) => {
  const users = await receberUser();
  return response.json(users);
});
routes.post('/users', async (request, response) => {
  const { nome, email, senha } = request.body;
  const user = { nome, email, senha };
  await insertUser(user);
  return response.json(user);
});
routes.put('/users/:id', async (request, response) => {
  const { id } = request.params;
  const { nome, senha } = request.body;
  const user = { nome, senha };
  await atualizaUser(id, user);
  return response.json(user);
});
routes.delete('/users/:id', async (request, response) => {
  const { id } = request.params;
  await deletaUser(id);
  return response.status(204).send();
});

routes.get('/tasks', (request, response) => {
  return response.send(taskManager.getTasks());
});
routes.get('/tasks/:id', async (request, response) => {
  const { id } = request.params;
  const task = await taskManager.getTask(id);
  return response.send(task);
});
routes.post('/tasks', async (request, response) => {
  const { title, id } = request.body;
  const addTask = await taskManager.addTask(title, id);
  if (!addTask)
    return response.status(400).json({ message: 'Erro ao adicionar tarefa' });
  return response.json({ message: 'Tarefa adicionada com sucesso' });
});
routes.put('/tasks/:id', (request, response) => {
  const { id } = request.params;
  const updatedTask = request.body;
  const updated = taskManager.updateTask(id, updatedTask);
  if (updated) return response.json(updated);
  return response.status(404).send('Tarefa não encontrada');
});
routes.delete('/tasks/:id', (request, response) => {
  const { id } = request.params;
  const deleted = taskManager.deleteTask(id);
  if (deleted) return response.status(204).send();
  return response.status(404).send('Tarefa não encontrada');
});

export default routes;
