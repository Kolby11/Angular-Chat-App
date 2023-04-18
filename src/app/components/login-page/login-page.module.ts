import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageComponent } from './login-page/login-page.component';
import { LoginWindowComponent } from './login-window/login-window.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginPageComponent, LoginWindowComponent],
  imports: [CommonModule, SharedModule],
  exports: [LoginPageComponent],
})
export class LoginPageModule {}
