import {Component, signal} from '@angular/core';
import {AuthService} from '../services/auth/auth-service';
import {RouterOutlet, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [RouterOutlet, RouterLink, NgIf]
})
export class Login {
  constructor( public authService: AuthService) {
  }
  //protected readonly title = signal('Welcome to HardcoreLifting');
}