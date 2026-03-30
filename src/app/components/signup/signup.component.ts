// src/app/components/signup/signup.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get nameControl(): FormControl {
    return this.signupForm.get('name') as FormControl;
  }

  get emailControl(): FormControl {
    return this.signupForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.signupForm.get('password') as FormControl;
  }

  onSubmit(): void {
    if (this.signupForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.signup(this.signupForm.value).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        console.log('Token received:', response.token);
        console.log('User logged in:', this.authService.isLoggedIn());
        // User is now logged in, navigate to users list
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Signup failed:', error);
        this.errorMessage = error.message;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}