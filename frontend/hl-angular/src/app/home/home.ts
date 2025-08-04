import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  constructor(public authService: AuthService) {
    // Initialization logic can go here
  }

  // You can add methods or properties specific to the Home component here
  getUserInfo() {
    return this.authService.getDebugInfo();
  }

}
