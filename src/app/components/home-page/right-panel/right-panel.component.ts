import { IMessage } from './../../../interfaces';
import { IChat, IUser } from 'src/app/interfaces';
import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss', '../panel.scss'],
})
export class RightPanelComponent {
  private loggedUser: IUser | undefined = undefined;
  user: IUser | undefined = undefined;

  selectedChat: IChat | undefined = undefined;
  constructor(
    private loginService: LoginService,
    private chatService: ChatService,
    private userService: UserService
  ) {
    loginService.loggedUser.subscribe(
      (user: IUser | undefined) => (this.loggedUser = user)
    );
  }
  ngOnInit(): void {
    this.chatService.selectedChat.subscribe((chat: IChat | undefined) => {
      this.selectedChat = chat;
      this.userService
        .getUserById(this.selectedChat?.users[0].id)
        .subscribe((user: IUser | undefined) => (this.user = user));
    });
  }
  sendMessage(msg: string): void {
    let message: IMessage | undefined = undefined;
    if (this.loggedUser != undefined) {
      let message: IMessage = {
        from: this.loggedUser,
        message: msg,
        sendDate: new Date().toDateString(),
      };
    }
    if (this.selectedChat != undefined && message != undefined) {
      this.chatService.sendMessage(this.selectedChat.id, message);
    }
  }
}
