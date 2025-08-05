import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

/*
This service gets data from the backend API 
and posts stuff to it (exercises, lifts, ...)
*/

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  async getExercises() {
    const response: any = await firstValueFrom(this.http.get('http://localhost:3001/api/exercises'));
    return response.exercises || [];
  }

  async getUserStats() {
    const response: any = await firstValueFrom(this.http.get('http://localhost:3001/api/user-info'));
    return response;
  }

  async getExerciseHistory(exercise : string) {
    const response: any = await firstValueFrom(this.http.get(`http://localhost:3001/api/exercises/${exercise}/history`));
    return response;
  }


  
}
