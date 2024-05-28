const express = require('express');
const app = express();
const port = 3000;

const tasks = [
  { id: 1, title: 'Estudar html' },
  { id: 2, title: 'Estudar css' },
  { id: 3, title: 'Estudar js' },
];

function getTask(id) {
  return tasks.find((task) => task.id === parseInt(id));
}

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/tasks', (request, response) => {
  response.send(tasks);
});

app.get('/tasks/:id', (request, response) => {
  const { id } = request.params;
  const task = getTask(id);
  response.send(task);
});

app.post('/tasks', (request, response) => {
  const { title } = request.body;
  const newTask = {
    id: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
    title,
  };
  tasks.push(newTask);
  response.send(newTask);
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
