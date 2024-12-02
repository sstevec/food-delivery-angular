import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatCard,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;
  mode: 'sign-in' | 'sign-up' = 'sign-in'; // Initial mode
  message: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Toggle mode between sign-in and sign-up
  toggleMode() {
    this.mode = this.mode === 'sign-in' ? 'sign-up' : 'sign-in';
    this.message = ''; // Clear any existing message
  }

  // Handle sign-in or sign-up based on the mode
  onSubmit() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      if (this.mode === 'sign-in') {
        const response = this.authService.signIn(email, password);
        this.message = response;

        if (response === 'Sign-in successful.') {
          this.router.navigate(['/']); // Redirect to home page
        }
      } else {
        this.message = this.authService.signUp(email, password);
      }
    } else {
      this.message = 'Please fill out the form correctly.';
    }
  }
}
