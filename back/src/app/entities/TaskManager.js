export default class TaskManager {
  constructor() {
    this.tasks = [
      { id: 1, title: 'Estudar HTML' },
      { id: 2, title: 'Estudar CSS' },
      { id: 3, title: 'Estudar JS' },
    ];
  }

  getTask(id) {
    return this.tasks.find((task) => task.id === parseInt(id));
  }

  addTask(task) {
    const newTask = {
      id: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
      title: task.title,
    };
    this.tasks.push(newTask);
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