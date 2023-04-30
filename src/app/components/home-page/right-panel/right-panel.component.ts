import { IMessage, IPostResponse } from './../../../interfaces';
import { IChat, IUser } from 'src/app/interfaces';
import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss', '../panel.scss'],
})
export class RightPanelComponent {
  msg: string = '';
  loggedUser: IUser | undefined = undefined;
  user: IUser | undefined = undefined;

  selectedChat: IChat | undefined = undefined;
  constructor(
    private loginService: LoginService,
    private chatService: ChatService,
    private navBarService: NavbarService,
    private http: HttpClient
  ) {
    loginService.loggedUser.subscribe(
      (user: IUser | undefined) => (this.loggedUser = user)
    );
    this.chatService.selectedChat.subscribe((chat: IChat | undefined) => {
      this.selectedChat = chat;
      this.user = chat?.users[0];
    });
  }
  ngOnInit(): void {}
  closeChat(): void {
    this.chatService.closeChat();
  }
  sendMessage(): void {
    if (this.loggedUser === undefined || this.selectedChat === undefined) {
      return;
    }
    let chatId: number = this.selectedChat?.id;
    let user: IUser = this.selectedChat?.users[0];

    const message: IMessage = {
      from: this.loggedUser,
      message: this.msg,
      sendDate: new Date().toString(),
    };
    this.chatService.sendMessage(chatId, message);
    const body = { text: message.message };

    this.http.post<IPostResponse>('https://httpbin.org/post', body).subscribe(
      (response) => {
        const lastNumber = String(response.origin.split('.').pop());
        const newMessage = 'A'.repeat(
          response.json.text.length +
            Number(lastNumber.charAt(lastNumber.length - 1))
        );

        console.log(newMessage);
        const updatedMessage: IMessage = {
          from: user,
          message: newMessage,
          sendDate: message.sendDate,
        };
        console.log('Sent message:', updatedMessage);
        this.chatService.sendMessage(chatId, updatedMessage);
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
    this.navBarService.addUsedCharacters();
    this.msg = '';
  }
  onMsgChange(newValue: string) {
    this.msg = newValue;
    this.navBarService.updateTmpCharacters(newValue.length);
  }
}
