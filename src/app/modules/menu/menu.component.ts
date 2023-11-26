import { Component, OnInit } from '@angular/core';
import { DishTypes } from './constants/dish-types.enum';
import { DishService } from '../core/services/dish.service';
import { Dish } from '../core/models/dish.model';
import { Size } from '../core/models/spinner.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  dishTypes = DishTypes;
  dishes!: Dish[];
  isLoaded: boolean = false;
  spinnerSize: Size = Size.BIG;

  constructor(private dishService: DishService) {}
  ngOnInit(): void {
    this.dishService.getAllToDisplay().subscribe({
      next: (dishes) => {
        this.dishes = dishes;
        this.isLoaded = true;
      },
    });
  }
}
