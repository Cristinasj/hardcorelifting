import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth-service';
import { Router } from '@angular/router';
import { RouterOutlet, RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-decide',
  imports: [],
  templateUrl: './decide.html',
  styleUrl: './decide.css'
})
export class Decide implements OnInit {
  constructor(public authService: AuthService, private router: Router) {
    // Initialization logic can go here
  }

  // On load it goes to /home or /landing
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/landing']);
    }
  }
}
