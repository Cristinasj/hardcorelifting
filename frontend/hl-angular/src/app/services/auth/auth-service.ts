import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | null = null;

  constructor(private http: HttpClient) {
    // Initialize the service, e.g., check for existing token
    this.token = localStorage.getItem('auth_token');
  }



  async login(username: string, password: string): Promise<{ success: boolean, message: string, token?: string }> {
    // Backend authentication logic here
    let loginResult: any = {}
    try {
      loginResult = await firstValueFrom(this.http.post('http://localhost:3001/login', { username, password }))
    } catch (error: any) {
      loginResult = { error: error.message || 'Login failed' };
    }
    const success = loginResult.error === undefined;
    if (success) {
      this.token = loginResult.token;

      if (this.token !== null) {
        localStorage.setItem('auth_token', this.token);
      }
      return { success: true, message: 'Login successful', token: this.token! }

    } else {
      return { success: false, message: loginResult.error };
    }

  }

  logout() {
    this.token = null;
    localStorage.removeItem('auth_token');
    this.http.post('http://localhost:3001/logout', {})
  }

  isLoggedIn(): boolean {
    // token exists and is not expired
    // if expired, set token to null
    if (this.token) {
      // Check token expiration logic here
      // For now, we assume the token is valid
      return true; // Assuming token is valid for now
    }
    return false;
  }

  getToken(): string | null {
    return this.isLoggedIn() ? this.token : null;
  }

  getDebugInfo(): string {
    return `Token: ${this.token ? this.token : 'No token available'}`;
  }

  async register(username: string, password: string): Promise<{ success: boolean, message: string, token?: string }> {
    // Backend registration logic here
    let registerResult: any = {}
    try {
      registerResult = await firstValueFrom(this.http.post('http://localhost:3001/register', { username, password }))
    } catch (error: any) {
      registerResult = { error: error.message || 'Registration failed' };
    }
    const success = registerResult.error === undefined;
    if (success) {
      // Login and set token
      const loginResult = await this.login(username, password);
      if (!loginResult.success) {
        return { success: false, message: "You are registered, but we couldn't log you in. Try through the form." };
      }
      return { success: true, message: 'Registration successful', token: loginResult.token!};
    } else {
      return { success: false, message: registerResult.error };
    }
  }
}
