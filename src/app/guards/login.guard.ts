import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  loggedUser: IUser | undefined = undefined;
  constructor(private loginService: LoginService, private router: Router) {
    loginService.loggedUser.subscribe((user: IUser | undefined) => {
      this.loggedUser = user;
    });
  }

  canActivate(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      if (this.loggedUser) {
        subscriber.next(true);
      } else {
        this.router.navigate(['/login']);
        subscriber.next(false);
      }
    });
  }
}
