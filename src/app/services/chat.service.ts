import { HttpClient } from '@angular/common/http';
import { IChat, IMessage, IUser } from './../interfaces';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, from, take } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chats: IChat[] = [];
  private loggedUser: IUser | undefined = undefined;

  selectedChat = new BehaviorSubject<IChat | undefined>(undefined);

  constructor(private http: HttpClient, private loginService: LoginService) {
    loginService.loggedUser.subscribe(
      (user: IUser | undefined) => (this.loggedUser = user)
    );
  }

  getChatByUserId(userId: number): IChat | undefined {
    return this.chats.find((chat) => {
      const hasLoggedUser = chat.users.some(
        (user) => user.id === this.loggedUser?.id
      );
      const hasUser = chat.users.some((user) => user.id === userId);
      return hasLoggedUser && hasUser;
    });
  }

  changeSelectedChat(user: IUser) {
    const loggedUser = this.loggedUser;
    const chat =
      this.getChatByUserId(user.id) ||
      this.createChat(
        [user, loggedUser].filter((u): u is IUser => u !== undefined)
      );

    this.selectedChat.next(chat);
  }

  createChat(users: IUser[]): IChat {
    // check if a chat object with the same users already exists
    const existingChat = this.chats.find((chat) =>
      chat.users.every((user) => users.some((u) => u.id === user.id))
    );
    if (existingChat) {
      return existingChat;
    }

    // create a new chat object
    const newChat: IChat = {
      id: this.chats.length + 1,
      users,
      messages: [],
    };

    // append the new chat object to the chats array
    this.chats.push(newChat);

    return newChat;
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
