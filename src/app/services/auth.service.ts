import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private currentUserSubject = new BehaviorSubject<string | null>(null);
  currentUser$: Observable<string | null> = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUsersFromStorage();
  }

  // Load users from localStorage
  private loadUsersFromStorage() {
    const usersJson = localStorage.getItem('users');
    if (usersJson) {
      this.users = JSON.parse(usersJson);
    }
  }

  // Save users to localStorage
  private saveUsersToStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  // Sign up method
  signUp(email: string, password: string): string {
    const userExists = this.users.some(user => user.email === email);

    if (userExists) {
      return 'User already exists.';
    }

    this.users.push({ email, password });
    this.saveUsersToStorage(); // Save users to localStorage
    return 'User registered successfully.';
  }

  // Sign in method
  signIn(email: string, password: string): string {
    const user = this.users.find(user => user.email === email);

    if (!user) {
      return 'User does not exist.';
    }

    if (user.password !== password) {
      return 'Incorrect password.';
    }

    this.currentUserSubject.next(email); // Update current user
    return 'Sign-in successful.';
  }

  // Sign out method
  signOut() {
    this.currentUserSubject.next(null); // Clear current user
  }
}
