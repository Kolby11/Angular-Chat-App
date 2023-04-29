import { LoginService } from './../../../services/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.scss'],
})
export class LoginWindowComponent {
  firstName: string = '';
  lastName: string = '';

  constructor(private loginService: LoginService) {}

  submitLogin() {
    this.loginService.login(this.firstName, this.lastName);
  }
}
