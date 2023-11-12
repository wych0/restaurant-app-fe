import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { fadeIn } from '../shared/constants/animations';
import { Display } from './constants/display.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [fadeIn],
})
export class AuthComponent implements OnInit {
  allDisplays = Display;
  display: Display = Display.LOGIN;
  displayRecover: boolean = false;
  sub = new Subscription();

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.activatedRoute.children.length != 0) {
      this.displayRecover = true;
    }
  }

  changeDisplay(newDisplay: Display): void {
    this.display = newDisplay;
  }

  onDeactivate(): void {
    this.displayRecover = false;
  }
}
