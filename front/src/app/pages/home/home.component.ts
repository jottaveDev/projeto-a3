import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ToastModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  constructor(
    private tasksService: TasksService,
    private router: Router,
    private messageService: MessageService
  ) {}

  protected tasks: any;
  protected inputValue: string = '';
  protected id = localStorage.getItem('token');

  ngOnInit() {
    if (this.id !== null) {
      this.tasksService.getTasks(this.id).subscribe({
        next: (res) => (this.tasks = res),
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Erro inesperado!',
          });
        },
      });
      return;
    }
    this.router.navigate(['/login']);
  }

  addTask(title: string) {
    if (title === '') return;
    this.tasksService.postTask({ title: title, idUser: this.id }).subscribe({
      next: (res) => {
        this.tasks.push(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tarefa adicionada com sucesso!',
        });
        this.inputValue = '';
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
      },
    });
  }

  editTask(task: any) {
    this.router.navigate([`/home/edit/${task.id_task}`], {
      state: { data: task },
    });
  }

  deleteTask(task: any) {
    this.tasksService.deleteTask(task).subscribe({
      next: () => {
        this.tasks.splice(this.tasks.indexOf(task), 1);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tarefa excluida com sucesso!',
        });
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Erro ao excluir tarefa!',
        });
      },
    });
  }
}
