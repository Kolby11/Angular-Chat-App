import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserData } from '../interfaces';
import { BehaviorSubject, Observable, filter, take } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //user data service
  url = 'https://dummyjson.com/users';
  //selected user service
  selectedUser = new BehaviorSubject<IUser | undefined>(undefined);

  constructor(private http: HttpClient) {}

  changeSelectedUser(user: IUser | undefined) {
    if (user === undefined) {
      this.selectedUser.next(undefined);
      return;
    }

    this.users
      .pipe(
        filter((user_tmp: IUser) => user_tmp.id === user.id),
        take(1)
      )
      .subscribe((selectedUser: IUser) => {
        this.selectedUser.next(selectedUser);
      });
  }

  data: Observable<IUserData> = new Observable((subscriber) => {
    this.http.get<IUserData>(this.url).subscribe((data: IUserData) => {
      subscriber.next(data);
    });
  });

  users: Observable<IUser> = new Observable((subscriber) => {
    this.data.subscribe((data: IUserData) => {
      data.users.map((user: IUser) => {
        subscriber.next(user);
      });
    });
  });

  getUserById(id: number | undefined): Observable<IUser | undefined> {
    return this.users.pipe(
      filter((u: IUser) => u.id === id),
      take(1)
    );
  }
}
