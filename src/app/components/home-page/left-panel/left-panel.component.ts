import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { UserService } from '../../../services/user.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss', '../panel.scss'],
})
export class LeftPanelComponent {
  selectedUser: IUser | undefined = undefined;
  users: IUser[] = [];

  constructor(
    private userService: UserService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.userService.users.subscribe((user: IUser) => this.users.push(user));
  }

  selectUser(user: IUser): void {
    this.selectedUser = user;
  }

  selectUserInfo(user: IUser): void {
    this.userService.changeSelectedUser(user);
  }

  selectChat(userId: number): void {
    this.chatService.changeSelectedChat(userId);
  }
}
