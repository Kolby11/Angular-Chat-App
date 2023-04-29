import { IGenderData, IStateInfo, IUser } from 'src/app/interfaces';
import { UserService } from './../../../services/user.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-middle-panel',
  templateUrl: './middle-panel.component.html',
  styleUrls: ['./middle-panel.component.scss', '../panel.scss'],
})
export class MiddlePanelComponent {
  user: IUser | undefined = undefined;
  gender: string = 'Undefined';
  state: string = 'No country info';

  constructor(
    private userService: UserService,
    public chatService: ChatService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.userService.selectedUser.subscribe((user: IUser | undefined) => {
      this.user = user;
      this.setGender();
      this.setStateInfo();
    });
  }

  setStateInfo(): void {
    this.http
      .get<IStateInfo>(
        `https://api.zippopotam.us/us/${this.user?.address.postalCode}`
      )
      .subscribe((data: IStateInfo) => {
        this.state = data.places[0].state;
      });
  }
  setGender(): void {
    this.http
      .get<IGenderData>(`https://api.genderize.io?name=${this.user?.firstName}`)
      .subscribe((data: IGenderData) => {
        this.gender = data.gender;
      });
  }
  userDetailClose(): void {
    this.userService.changeSelectedUser(undefined);
  }
}
