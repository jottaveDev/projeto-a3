import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, ToastModule, RippleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  form: FormGroup = this.formBuilder.group({
    email: ['', [V.required, V.email]],
    senha: ['', [V.required, V.minLength(6)]],
  });

  navigateByRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: (data: any) => {
          localStorage.setItem('token', data.id);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login feito com sucesso!',
          });
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
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
  }
}
