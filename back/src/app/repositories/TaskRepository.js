import {
  atualizaTaskUser,
  deletaTaskUser,
  insertTaskUser,
  receberTaskUser,
} from '../dbCrud.js';

class TaskRepository {
  async findAllByUser(idUser) {
    const tasks = await receberTaskUser(idUser);
    return tasks;
  }

  async findById(id) {
    const task = await receberTaskUser(id);
    return task;
  }

  async create(task) {
    const [taskResult] = await insertTaskUser(task);
    return taskResult;
  }

  async update(task) {
    const updated = await atualizaTaskUser(task);
    return updated;
  }

  async delete(idTask) {
    const deleteOp = await deletaTaskUser(idTask);
    return deleteOp;
  }
}

export default new TaskRepository();
