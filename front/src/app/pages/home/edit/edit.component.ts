import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts/contacts.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}

  protected task: any;

  ngOnInit(): void {
    this.task = history.state.data;
  }

  edit(task: any) {
    this.contactsService.editTask(task).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => console.error(err),
    });
  }
}
