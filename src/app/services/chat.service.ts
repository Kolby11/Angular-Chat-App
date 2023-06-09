import { HttpClient } from '@angular/common/http';
import { IChat, IMessage, IUser } from './../interfaces';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  changeSelectedChat(user: IUser) {
    const loggedUser = this.loggedUser;

    if (loggedUser && user.id !== loggedUser.id) {
      const chat =
        this.getChatByUserId(user.id) || this.createChat([user, loggedUser]);
      this.selectedChat.next(chat);
    }
  }

  closeChat(): void {
    this.selectedChat.next(undefined);
  }
  sendMessage(chatId: number, message: IMessage): void {
    let updatedChat: IChat | undefined = undefined;

    // Find the chat object with the matching chatId and update its messages array
    for (let i = 0; i < this.chats.length; i++) {
      if (this.chats[i].id === chatId) {
        // Clone the chat object so that we don't modify the original
        updatedChat = Object.assign({}, this.chats[i]);

        // Add the new message to the messages array of the cloned chat object
        updatedChat.messages.push(message);

        // Update the chats array with the cloned and updated chat object
        this.chats[i] = updatedChat;

        // Exit the loop since we found and updated the chat object
        break;
      }
    }

    if (updatedChat === undefined) {
      console.error('Could not find chat with id:', chatId);
    }
  }
}
