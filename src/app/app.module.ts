import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageModule } from './components/home-page/home-page.module';
import { LoginPageModule } from './components/login-page/login-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HomePageModule, LoginPageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
