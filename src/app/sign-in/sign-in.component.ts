import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatCard,
    MatLabel,
    MatFormField,
    MatButton,
    MatInput
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

}
