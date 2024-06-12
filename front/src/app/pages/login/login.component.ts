import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
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
          this.router.navigate(['/home']);
        },
        error: (err) => console.error(err),
      });
    }
  }
}
