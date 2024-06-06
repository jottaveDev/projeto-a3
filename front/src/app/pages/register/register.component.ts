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
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  form: FormGroup = this.formBuilder.group({
    nome: ['', [V.required]],
    email: ['', [V.required, V.email]],
    senha: ['', [V.required, V.minLength(6)]],
  });

  onSubmit() {
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => console.error(err),
      });
      this.router.navigate(['/login']);
    }
  }
}