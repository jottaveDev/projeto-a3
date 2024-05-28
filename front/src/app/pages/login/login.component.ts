import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private router: Router, private formBuilder: FormBuilder) {}

  form: FormGroup = this.formBuilder.group({
    email: ['', [V.required, V.email]],
    password: ['', [V.required, V.minLength(6)]],
  });

  navigateByRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    if (this.form.valid) this.router.navigate(['/home']);
  }
}
