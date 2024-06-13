import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private tasksService: TasksService, private router: Router) {}

  protected tasks: any;
  protected inputValue: string = '';
  protected id = localStorage.getItem('token');

  ngOnInit() {
    if (this.id !== null) {
      this.tasksService.getTasks(this.id).subscribe({
        next: (res) => (this.tasks = res),
        error: (err) => console.log(err),
      });
      return;
    }
    this.router.navigate(['/login']);
  }

  addTask(title: string) {
    if (title === '') return;
    this.tasksService.postTask({ title: title, idUser: this.id }).subscribe({
      next: (res) => this.tasks.push(res),
      error: (err) => console.error(err),
    });
  }

  editTask(task: any) {
    this.router.navigate([`/home/edit/${task.id_task}`], {
      state: { data: task },
    });
  }

  deleteTask(task: any) {
    this.tasksService.deleteTask(task).subscribe({
      next: () => this.tasks.splice(this.tasks.indexOf(task), 1),
      error: (err) => console.error(err),
    });
  }
}
