import { Component } from '@angular/core';
import { Display } from './constants/display.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  allDisplays = Display;
  display: Display = Display.LOGIN;

  changeDisplay(newDisplay: Display): void {
    this.display = newDisplay;
  }
}
