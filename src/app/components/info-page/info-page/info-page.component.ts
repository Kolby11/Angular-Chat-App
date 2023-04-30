import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss'],
})
export class InfoPageComponent {
  charCount: number = 0;
  constructor(private router: Router, private navbarService: NavbarService) {}
  getUsedCharacters(): number {
    return this.navbarService.getUsedCharacter();
  }
  getLoginTime(): string {
    return this.navbarService.getLoginTime();
  }
}
