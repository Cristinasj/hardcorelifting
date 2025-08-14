import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { TitleizePipe } from '../../pipes/titleize-pipe';

@Component({
  selector: 'app-exercise-card',
  imports: [TitleizePipe],
  templateUrl: './exercise-card.html',
  styleUrl: './exercise-card.css'
})

export class ExerciseCard {
  @Input() exercise: any;

  constructor() {
  }
  
}
