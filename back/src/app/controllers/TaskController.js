import TaskRepository from '../repositories/TaskRepository.js';

class TaskController {
  async index(request, response) {
    const { id } = request.params;
    const categories = await TaskRepository.findAllByUser(id);
    response.json(categories);
  }

  async store(request, response) {
    const { title, idUser } = request.body;
    const task = {
      user_id_fk: idUser,
      task_task: title,
    };
    const [newTask] = await TaskRepository.create(task);
    response.json(newTask);
  }

  async update(request, response) {
    const { id } = request.params;
    const { title } = request.body;
    const task = {
      id_task: id,
      task_task: title,
    };
    await TaskRepository.update(task);
    response.json(task);
  }

  async delete(request, response) {
    const { id } = request.params;
    await TaskRepository.delete(id);
    response.sendStatus(204);
  }
}

export default new TaskController();
