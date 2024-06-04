import express from 'express';
import { atualizaUser, deletaUser, insertUser, receberUser } from './dbCrud.js';
import TaskManager from './entities/TaskManager.js';
import cors from './middlewares/cors.js';

const app = express();
const port = 3000;
const taskManager = new TaskManager();

app.use(express.json());
app.use(cors);

app.get('/users', async (request, response) => {
  const users = await receberUser();
  return response.json(users);
});
app.post('/users', async (request, response) => {
  const { nome, senha } = request.body;
  const user = { nome, senha };
  await insertUser(user);
  return response.json(user);
});
app.post('/users/login', (request, response) => {
  const { email, senha } = request.body;
  const user = { email, senha };
  if (user.email == '<EMAIL>' && user.senha == '<PASSWORD>') {
    return response.json({ message: 'autenticado' });
  }
  return response.status(401).json({ message: 'Não autenticado' });
});
app.put('/users/:id', async (request, response) => {
  const { id } = request.params;
  const { nome, senha } = request.body;
  const user = { nome, senha };
  await atualizaUser(id, user);
  return response.json(user);
});
app.delete('/users/:id', async (request, response) => {
  const { id } = request.params;
  await deletaUser(id);
  return response.status(204).send();
});

app.get('/tasks', (request, response) => {
  return response.send(taskManager.tasks);
});
app.get('/tasks/:id', (request, response) => {
  const { id } = request.params;
  const task = taskManager.getTask(id);
  return response.send(task);
});
app.post('/tasks', (request, response) => {
  const task = request.body;
  const newTask = taskManager.addTask(task);
  return response.json(newTask);
});
app.put('/tasks/:id', (request, response) => {
  const { id } = request.params;
  const updatedTask = request.body;
  const updated = taskManager.updateTask(id, updatedTask);
  if (updated) return response.json(updated);
  return response.status(404).send('Tarefa não encontrada');
});
app.delete('/tasks/:id', (request, response) => {
  const { id } = request.params;
  const deleted = taskManager.deleteTask(id);
  if (deleted) return response.status(204).send();
  return response.status(404).send('Tarefa não encontrada');
});

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`),
);
