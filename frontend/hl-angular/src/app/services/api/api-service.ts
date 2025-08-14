import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

/*
This service gets data from the backend API 
and posts stuff to it (exercises, lifts, ...)
*/

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly BASE_URL = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  async getExercises() {
    const response: any = await firstValueFrom(this.http.get(`${this.BASE_URL}/api/exercises`));
    return response.exercises || [];
  }

  async getUserStats() {
    const response: any = await firstValueFrom(this.http.get(`${this.BASE_URL}/api/user-info`));
    return response;
  }

  async getExerciseHistory(exercise: string) {
    const response: any = await firstValueFrom(this.http.get(`${this.BASE_URL}/api/exercises/${exercise}/history`));
    return response;
  }

  async postNewLift(exercise: string, unit: string, amount: number) {
    const response: any = await firstValueFrom(this.http.post(`${this.BASE_URL}/api/exercise-entry`, { exercise, unit, amount }));
    return response;
  }


}
