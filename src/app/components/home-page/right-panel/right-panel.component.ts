import { IChat, IUser } from 'src/app/interfaces';
import { UserService } from './../../../services/user.service';
import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss', '../panel.scss'],
})
export class RightPanelComponent {
  users: IUser[] = [];
  selectedChat: IChat | undefined = undefined;
  constructor(
    private userService: UserService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.chatService.selectedChat.subscribe((chat: IChat | undefined) => {
      this.selectedChat = chat;
    });
  }
}
