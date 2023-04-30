import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page/login-page.component';
import { HomePageComponent } from './components/home-page/home-page/home-page.component';
import { LoginGuard } from './guards/login.guard';
import { InfoPageComponent } from './components/info-page/info-page/info-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'info', component: InfoPageComponent },
  { path: 'home', component: HomePageComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
