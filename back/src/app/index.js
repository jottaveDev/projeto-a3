import express from 'express';
import TaskManager from './entities/TaskManager.js';

const app = express();
const port = 3000;
const taskManager = new TaskManager();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
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
  console.log(Server started on http://localhost:${port}),
  );