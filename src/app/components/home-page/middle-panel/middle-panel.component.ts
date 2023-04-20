import { IUser } from 'src/app/interfaces';
import { UserService } from './../../../services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-middle-panel',
  templateUrl: './middle-panel.component.html',
  styleUrls: ['./middle-panel.component.scss', '../panel.scss'],
})
export class MiddlePanelComponent {
  user: IUser | undefined = undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.selectedUser.subscribe((user: IUser | undefined) => {
      this.user = user;
      console.log(user);
    });
  }

  userDetailClose(): void {
    this.userService.changeSelectedUser(0);
  }
  
  getGender(name:string):string{
     this.http
      .get('https://api.genderize.io', { params: name })
      .pipe((genderData: genderData)=>{
       map(gender:string)=>gender)
  }
  }
}
