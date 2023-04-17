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
    this.users = this.userService.getUsers();
  }

  userDetail(id: number): void {
    console.log(this.userService.getUserDetails(id));
  }
}
