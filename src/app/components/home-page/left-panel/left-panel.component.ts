import { Component } from '@angular/core';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
})
export class LeftPanelComponent {
  users = [
    {
      id: 2,
      firstName: 'Emma',
      lastName: 'Johnson',
      email: 'emma.johnson@gmail.com',
    },
    {
      id: 3,
      firstName: 'David',
      lastName: 'Lee',
      email: 'david.lee@gmail.com',
    },
    {
      id: 4,
      firstName: 'Sarah',
      lastName: 'Garcia',
      email: 'sarah.garcia@gmail.com',
    },
    {
      id: 5,
      firstName: 'Michael',
      lastName: 'Nguyen',
      email: 'michael.nguyen@gmail.com',
    },
  ];
  userClick(id: number): void {
    console.log(id);
  }
}
