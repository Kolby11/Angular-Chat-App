import { LoginService } from 'src/app/services/login.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private tmpCharacters: number = 0;
  private usedCharacters: number = 0 + this.tmpCharacters;

  constructor(private loginService: LoginService) {}

  updateTmpCharacters(characterCount: number) {
    this.tmpCharacters = characterCount;
  }
  addUsedCharacters() {
    this.usedCharacters += this.tmpCharacters;
  }
  getUsedCharacter(): number {
    return this.usedCharacters;
  }

  getLoginDate(): Date | undefined {
    return this.loginService.getLoginTime();
  }

  getLogoutDate(): Date | undefined {
    return this.loginService.getLogoutTime();
  }

  getLoginTime(): string {
    const loginTime = this.loginService.getLoginDuration();
    if (loginTime) {
      const hours = Math.floor(loginTime / (1000 * 60 * 60));
      const minutes = Math.floor((loginTime / (1000 * 60)) % 60);
      const seconds = Math.floor((loginTime / 1000) % 60);

      return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    } else {
      return 'Not available';
    }
  }
}
