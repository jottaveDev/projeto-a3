const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const tasks = [
  { id: 1, title: 'Estudar html' },
  { id: 2, title: 'Estudar css' },
  { id: 3, title: 'Estudar js' },
];

const getTask = tasks.find((id) => (task) => task.id === parseInt(id));

app.get('/tasks', (request, response) => {
  response.send(tasks);
});

app.get('/tasks/:id', (request, response) => {
  const { id } = request.params;
  const task = getTask(id);
  response.send(task);
});

app.post('/tasks', (request, response) => {
  tasks.push(request.body);
  response.send(request.body);
});

app.put('/tasks/:id', (request, response) => {
  const { id } = request.params;
  const task = getTask(id);
  tasks.splice(tasks.indexOf(task), 1, request.body);
  response.send(request.body);
});

app.delete('/tasks/:id', (request, response) => {
  const { id } = request.params;
  const task = getTask(id);
  tasks.splice(tasks.indexOf(task), 1);
  response.status(204).send();
});

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`),
);