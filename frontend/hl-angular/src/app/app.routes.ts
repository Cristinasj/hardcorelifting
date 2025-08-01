import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Login } from './login/login';
import { Landing } from './landing/landing';
import { Home } from './home/home';

export const routes: Routes = [
    {path: 'register', component: Register},
    {path: 'login', component: Login},
    {path: 'landing', component: Landing}, 
    {path: 'home', component: Home},
];
