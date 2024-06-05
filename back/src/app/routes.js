import { Router } from 'express';
import TaskController from './controllers/TaskController.js';
import { atualizaUser, insertUser, login, receberUser } from './dbCrud.js';

const routes = Router();

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

routes.get('/tasks/:id', TaskController.index);
routes.post('/tasks', TaskController.store);
routes.delete('/tasks/:id', TaskController.delete);
routes.put('/tasks/:id', TaskController.update);

export default routes;
