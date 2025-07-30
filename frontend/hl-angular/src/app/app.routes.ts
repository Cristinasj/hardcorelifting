import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Login } from './login/login';
import { Landing } from './landing/landing';

export const routes: Routes = [
    {path: 'register', component: Register},
    {path: 'login', component: Login},
    {path: '', component: Landing} // Assuming you want a default route to the landing page,
];
