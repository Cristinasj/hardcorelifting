import { Component, signal } from '@angular/core';
import { AuthService } from '../services/auth/auth-service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [RouterOutlet, RouterLink, NgIf, FormsModule]
})
export class Login {
  username: string = '';
  password: string = '';

  constructor(public authService: AuthService, private router: Router) {
  }
  //protected readonly title = signal('Welcome to HardcoreLifting');

  async onFormSubmit() {
    const loginResult = await this.authService.login(this.username, this.password);
    if (loginResult.success) {
      this.router.navigate(['/home']);
    } else {
      alert(loginResult.message); // Display error message to the user
    }
  }
}