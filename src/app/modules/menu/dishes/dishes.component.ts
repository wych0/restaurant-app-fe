import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/modules/core/models/dish.model';
import { DishesService } from 'src/app/modules/core/services/dishes.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnInit {
  @Input() type: string = '';
  dishes: Dish[] = [];

  constructor(private dishesService: DishesService) {}

  ngOnInit(): void {
    this.dishesService.getDishes().subscribe((dishes) => {
      this.dishes = dishes.filter((dish) => dish.type === this.type);
    });
  }
}
