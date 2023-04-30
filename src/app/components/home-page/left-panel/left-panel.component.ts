import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { UserService } from '../../../services/user.service';
import { ChatService } from 'src/app/services/chat.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss', '../panel.scss'],
})
export class LeftPanelComponent {
  selectedUser: IUser | undefined = undefined;
  loggedUser: IUser | undefined = undefined;
  users: IUser[] = [];

  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.loggedUser.subscribe(
      (user: IUser | undefined) => (this.loggedUser = user)
    );
    this.userService.users.subscribe((user: IUser) => {
      if (user.id == this.loggedUser?.id) {
      } else {
        this.users.push(user);
      }
    });
  }

  selectUser(user: IUser): void {
    this.selectedUser = user;
  }

  selectUserInfo(user: IUser): void {
    this.userService.changeSelectedUser(user);
  }

  selectChat(user: IUser): void {
    this.chatService.changeSelectedChat(user);
  }
}
