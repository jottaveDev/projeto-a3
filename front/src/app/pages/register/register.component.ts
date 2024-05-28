import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  form: FormGroup = this.formBuilder.group({
    name: ['', [V.required]],
    email: ['', [V.required, V.email]],
    password: ['', [V.required, V.minLength(6)]],
  });

  onSubmit() {
    if (this.form.valid) this.router.navigate(['/login']);
  }
}
