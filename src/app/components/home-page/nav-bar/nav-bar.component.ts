import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  firstName: string | undefined = undefined;
  lastName: string | undefined = undefined;
  loginDate: string = new Date().toDateString();
  clickCount: number = 0;
  keyCount: number = 0;

  constructor(private loginService: LoginService) {
    loginService.loggedUser.subscribe((user) => {
      this.firstName = user?.firstName;
      this.lastName = user?.lastName;
    });
  }
  ngOnInit(): void {
    document.addEventListener('click', () => this.addClickCount());
    document.addEventListener('keydown', () => this.addkeyCount());
  }

  addClickCount(): void {
    this.clickCount += 1;
  }
  addkeyCount(): void {
    this.keyCount += 1;
  }
}
