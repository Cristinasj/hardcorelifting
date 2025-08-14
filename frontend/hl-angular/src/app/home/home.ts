import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth-service';
import { ApiService } from '../services/api/api-service';
import { OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { ExerciseCard } from './exercise-card/exercise-card';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, JsonPipe, ExerciseCard, NgIf, NgForOf],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  userExercisesPromise: Promise<any[]> = Promise.resolve([]);
  isModalOpen = false;

  constructor(public authService: AuthService, private apiService: ApiService) {
    // Initialization logic can go here
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // You can add methods or properties specific to the Home component here

  async getUserExercises() {
    const stats = await this.apiService.getUserStats();
    // Turn it into the right format: array of objects
    // with name, mostRecent, and pr (personal record)
    const exercises = stats.exercises;
    const statsArray = Object.keys(exercises).map(key => {
      return {
        name: key,
        mostRecent: exercises[key].mostRecent,
        pr: exercises[key].pr
      };
    });

    return statsArray;
  }

  ngOnInit() {
    this.userExercisesPromise = this.getUserExercises();

  }

}
