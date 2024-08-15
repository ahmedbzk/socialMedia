import { Routes } from '@angular/router';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HeaderComponent } from './components/not-pages/header/header.component';

export const routes: Routes = [
    { path: '', redirectTo: 'homepage', pathMatch: 'full' },
    { path: 'homepage', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'header', component: HeaderComponent }

  ];