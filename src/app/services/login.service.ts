import { BehaviorSubject, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  users: IUser[] = [];
  loggedUser = new BehaviorSubject<IUser | undefined>(undefined);

  constructor(private userService: UserService, private router: Router) {
    this.userService.users.subscribe((user: IUser) => this.users.push(user));
  }
  login(firstName: string, lastName: string): void {
    let loggedUser: IUser | undefined = this.users.find((user: IUser) => {
      return user.firstName == firstName && user.lastName == lastName;
    });
    if (loggedUser) {
      this.loggedUser.next(loggedUser);
      this.router.navigate(['/home']);
    }
  }
  logout(): void {
    this.loggedUser.next(undefined);
  }
}
