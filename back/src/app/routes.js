import { Router } from 'express';
import TaskController from './controllers/TaskController.js';
import UserController from './controllers/UserController.js';

const routes = Router();

routes.post('/login', UserController.login);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/tasks/:id', TaskController.index);
routes.post('/tasks', TaskController.store);
routes.delete('/tasks/:id', TaskController.delete);
routes.put('/tasks/:id', TaskController.update);

export default routes;
