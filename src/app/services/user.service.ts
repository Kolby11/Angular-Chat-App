import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserData } from '../interfaces';
import { Observable, filter, from, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'https://dummyjson.com/users';
  constructor(private http: HttpClient) {}
  getData() {
    return this.http.get<IUserData>(this.url);
  }
  getUsers(): IUser[] {
    let users: IUser[] = [];
    this.getData().subscribe((data: IUserData) => {
      data.users.map((user: IUser) => {
        users.push(user);
      });
    });
    return users;
  }
  getUserDetails(id: number): Observable<IUser[]> {
    const users = from(this.getUsers());
    return users.pipe(
      filter((user) => user.id === id),
      toArray()
    );
  }
}
