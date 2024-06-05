import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts/contacts.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}

  protected tasks: any;
  protected inputValue: string = '';

  ngOnInit() {
    this.contactsService.getTasks().subscribe({
      next: (res) => (this.tasks = res),
      error: (err) => {
        console.log(err);
      },
    });
  }

  addTask(task: any) {
    this.contactsService.postTask({ title: task }).subscribe({
      next: (res) => this.tasks.push(res),
      error: (err) => console.error(err),
    });
  }

  editTask(task: any) {
    this.router.navigate([`/home/edit/${task.id}`], {
      state: { data: task },
    });
  }

  deleteTask(task: any) {
    this.contactsService.deleteTask(task).subscribe({
      next: () =>
        (this.tasks = this.tasks.filter((t: any) => t.id !== task.id)),
      error: (err) => console.error(err),
    });
  }
}
