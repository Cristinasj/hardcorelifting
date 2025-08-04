import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.css',
  imports: [RouterOutlet, RouterLink, NgIf, FormsModule]
})
export class Register {

  constructor(public authService: AuthService, private router: Router) {
  }

  username: string = '';
  password: string = '';

  async register() {
    const registerResult = await this.authService.register(this.username, this.password);
    if (registerResult.success) {
      this.router.navigate(['/home']);
    } else {
      alert(registerResult.message); // Display error message to the user
    }
  }

}