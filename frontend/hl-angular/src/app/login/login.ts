import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  protected readonly title = signal('Welcome to HardcoreLifting');
}