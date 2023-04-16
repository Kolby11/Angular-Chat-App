import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageComponent } from './login-page/login-page.component';
import { LoginWindowComponent } from './login-window/login-window.component';
import { RegisterWindowComponent } from './register-window/register-window.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    LoginWindowComponent,
    RegisterWindowComponent,
  ],
  imports: [CommonModule],
  exports: [LoginPageComponent],
})
export class LoginPageModule {}
