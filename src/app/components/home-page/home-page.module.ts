import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageComponent } from './home-page/home-page.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { MiddlePanelComponent } from './middle-panel/middle-panel.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomePageComponent,
    NavBarComponent,
    LeftPanelComponent,
    MiddlePanelComponent,
    RightPanelComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule],
  exports: [HomePageComponent, NavBarComponent],
})
export class HomePageModule {}
