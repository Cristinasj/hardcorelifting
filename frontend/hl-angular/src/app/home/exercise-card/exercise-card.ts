import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-exercise-card',
  imports: [],
  templateUrl: './exercise-card.html',
  styleUrl: './exercise-card.css'
})

export class ExerciseCard {
  @Input() exercise: any;

  constructor() {
  }
  
}
