import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginPageComponent } from './login-page/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { LoginWindowComponent } from './login-window/login-window.component';

@NgModule({
  declarations: [LoginPageComponent, LoginWindowComponent],
  imports: [CommonModule, SharedModule, FormsModule],
  exports: [LoginPageComponent],
})
export class LoginPageModule {}
