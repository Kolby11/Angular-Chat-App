import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserData } from '../interfaces';
import { BehaviorSubject, Observable, filter, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //selected user service
  private selectedUserSource = new BehaviorSubject<IUser | undefined>(
    undefined
  );
  selectedUser = this.selectedUserSource.asObservable();

  changeSelectedUser(id: number) {
    if (id === 0) {
      this.selectedUserSource.next(undefined);
    }
    console.log(`Change user ${id}`);

    this.users
      .pipe(
        filter((user: IUser) => user.id === id),
        take(1)
      )
      .subscribe((selectedUser: IUser) => {
        this.selectedUserSource.next(selectedUser);
      });
  }

  //user data service
  url = 'https://dummyjson.com/users';
  constructor(private http: HttpClient) {}

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
}
