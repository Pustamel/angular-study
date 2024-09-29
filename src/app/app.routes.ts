import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LayoutComponent } from './UI/layout/layout.component';
import { canActivateAuth } from './data/auth/access.guard';
import { EditPageComponent } from './pages/edit-page/edit-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [canActivateAuth],
    children: [
      { path: '', component: SearchPageComponent },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings', component: EditPageComponent },
      { path: 'search', component: SearchPageComponent },
    ],
  },
  { path: 'login', component: LoginPageComponent },
];
