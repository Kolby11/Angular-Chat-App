import { BehaviorSubject, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginTime: Date | undefined;
  logoutTime: Date | undefined;
  users: IUser[] = [];
  loggedUser = new BehaviorSubject<IUser | undefined>(undefined);

  constructor(private userService: UserService, private router: Router) {
    this.userService.users.subscribe((user: IUser) => this.users.push(user));
  }

  setLoginTime(): void {
    this.loginTime = new Date();
  }

  setLogoutTime(): void {
    this.logoutTime = new Date();
  }

  getLoginTime(): Date | undefined {
    return this.loginTime;
  }

  getLogoutTime(): Date | undefined {
    return this.logoutTime;
  }

  getLoginDuration(): number | undefined {
    if (this.loginTime && this.logoutTime) {
      return this.logoutTime.getTime() - this.loginTime.getTime();
    } else {
      return undefined;
    }
  }

  login(firstName: string, lastName: string): void {
    let loggedUser: IUser | undefined = this.users.find((user: IUser) => {
      return user.firstName == firstName && user.lastName == lastName;
    });
    if (loggedUser) {
      this.loggedUser.next(loggedUser);
      this.setLoginTime();
      this.router.navigate(['/home']);
    }
  }

  logout(): void {
    this.loggedUser.next(undefined);
    this.setLogoutTime();
    this.router.navigate(['/info']);
  }
}
