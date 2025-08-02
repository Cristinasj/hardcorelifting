import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth/auth-service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public authService : AuthService, private router: Router) {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/landing']);
  }


  //protected readonly title = signal('hl-angular');
}
