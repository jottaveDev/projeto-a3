import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule, ConfirmPopupModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ProfileComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private usersService: UsersService,
    private confirmationService: ConfirmationService
  ) {}

  protected url = 'http://localhost:3000';
  protected user: any = {};
  form: FormGroup = this.formBuilder.group({});

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [V.required]],
      email: ['', [V.email]],
      senha: ['', [V.required]],
    });

    this.usersService.getUser().subscribe({
      next: (data: any) => {
        this.user = data;
        this.form.patchValue({
          nome: data.nome_user,
          email: data.email_user,
        });
      },
      error: (err) => console.error(err),
    });
  }

  onSubmit() {
    this.usersService.updateUser(this.form.value).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Dados atualizados com sucesso!',
        });
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar dados!',
        });
      },
    });
  }

  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Tem certeza que deseja excluir?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.usersService.deleteUser().subscribe({
          next: () => {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmação',
              detail: 'Usuário excluido com sucesso!',
              life: 3000,
            });
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          },
          error: (err) => console.error(err),
        });
      },
      reject: () => {},
    });
  }
}
