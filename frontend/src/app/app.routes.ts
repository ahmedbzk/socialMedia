import { Routes } from '@angular/router';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { LoginComponent } from './components/pages/login/login.component';
import { authGuard, loginGuard } from './services/auth-guard'

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'homepage', component: HomepageComponent,canActivate: [authGuard] },
    { path: 'login', component: LoginComponent,canActivate: [loginGuard]},
    { path: 'header', component: LoginComponent,canActivate: [authGuard]}


  ];