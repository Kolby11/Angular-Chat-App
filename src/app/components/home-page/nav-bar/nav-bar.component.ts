import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NavbarService } from 'src/app/services/navbar.service';

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
  navbarService: NavbarService;

  constructor(
    private loginService: LoginService,
    navbarService: NavbarService
  ) {
    this.navbarService = navbarService;
    loginService.loggedUser.subscribe((user) => {
      this.firstName = user?.firstName;
      this.lastName = user?.lastName;
    });
  }
  ngOnInit(): void {
    document.addEventListener('click', () => this.addClickCount());
  }

  addClickCount(): void {
    this.clickCount += 1;
  }

  logout(): void {
    this.loginService.logout();
  }
}
