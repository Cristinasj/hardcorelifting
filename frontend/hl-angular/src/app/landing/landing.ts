import {Component, signal} from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
    imports: [RouterOutlet, RouterLink],
  styleUrl: './landing.css'
})
export class Landing {
  protected readonly title = signal('Welcome to HardcoreLifting');
}