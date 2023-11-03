import { Component } from '@angular/core';
import { DishTypes } from './constants/dish-types.enum';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  dishTypes = DishTypes;

  constructor() {}
}
