import { Component } from '@angular/core';
import { Dish } from 'src/app/modules/core/models/dish.model';
import { DishesService } from 'src/app/modules/core/services/dishes.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  dishes: Dish[] = [];
  pizzas: Dish[] = [];
  appetizers: Dish[] = [];

  constructor(private dishesService: DishesService) {}

  ngOnInit(): void {
    this.dishesService.getDishes().subscribe((dishes) => {
      this.pizzas = dishes.filter((dish) => dish.type === 'Pizza');
      this.appetizers = dishes.filter((dish) => dish.type === 'Appetizer');
    });
  }
}
