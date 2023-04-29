import { HttpClient } from '@angular/common/http';
import { IChat, IMessage, IUser } from './../interfaces';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chats: IChat[] = [];
  private loggedUser: IUser | undefined = undefined;

  selectedChat = new BehaviorSubject<IChat | undefined>(undefined);

  constructor(private http: HttpClient, private loginService: LoginService) {
    loginService.loggedUser.subscribe(
      (user: IUser | undefined) => (this.loggedUser = user)
    );
  }

  changeSelectedChat(user: IUser): void {
    let chat: IChat | undefined = this.chats.find((chat: IChat) => {
      this.loggedUser &&
        this.loggedUser?.id in chat.users &&
        chat.users.filter((user_tmp) => {
          user_tmp.id == user.id;
        }, take(1));
    });
    if (chat == undefined && this.loggedUser != undefined) {
      this.createChat([this.loggedUser, user]);
      chat = this.chats.find((chat: IChat) => {
        this.loggedUser &&
          this.loggedUser?.id in chat.users &&
          user.id in chat.users;
      });
    }
    console.warn(chat);
    this.selectedChat.next(chat);
  }

  createChat(users: IUser[]): void {
    let id =
      this.chats.length > 0 ? this.chats[this.chats.length - 1].id + 1 : 0;
    const chat: IChat = { id: id, users: users, messages: [] };
    this.chats.push(chat);
  }

  sendMessage(chatId: number, message: IMessage): void {
    const body = { text: message.message };
    this.http.post('https://httpbin.org/post', body);

    for (let i = 0; i < this.chats.length; i++) {
      if (this.chats[i].id == chatId) {
        this.chats[i].messages.push(message);
        break;
      }
    }
  }
}
