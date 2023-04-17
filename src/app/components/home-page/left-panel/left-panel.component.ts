import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss', '../panel.scss'],
})
export class LeftPanelComponent {
  users: IUser[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.users.subscribe((user: IUser) => this.users.push(user));
  }

  selectUser(id: number): void {
    console.log(id);
    this.userService.changeSelectedUser(id);
  }
}
