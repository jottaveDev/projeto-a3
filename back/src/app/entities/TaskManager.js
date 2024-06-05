import { insertTaskUser, receberTaskUser } from '../dbCrud.js';

export default class TaskManager {
  constructor() {
    this.tasks = [];
  }

  async getTasks(user) {
    const tasks = await receberTaskUser(user);
    this.tasks = tasks;
    return this.tasks;
  }

  async getTask(id) {
    const tasks = await receberTaskUser(id);
    this.tasks = tasks;
    return this.tasks;
  }

  async addTask(task, userId) {
    const newTask = await insertTaskUser(task, userId);
    this.tasks.push(task);
    return newTask;
  }

  updateTask(id, updatedTask) {
    const taskIndex = this.tasks.findIndex((task) => task.id === parseInt(id));
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = updatedTask;
      return updatedTask;
    }
    return null;
  }

  deleteTask(id) {
    const taskIndex = this.tasks.findIndex((task) => task.id === parseInt(id));
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      return true;
    }
    return false;
  }
}
