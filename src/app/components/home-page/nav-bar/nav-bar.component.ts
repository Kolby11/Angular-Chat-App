import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  loginDate: string = new Date().toDateString();
  clickCount: number = 0;
  keyCount: number = 0;

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
