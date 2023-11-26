import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/modules/core/models/dish.model';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnInit {
  @Input() type!: string;
  @Input() allDishes!: Dish[];
  dishes: Dish[] = [];

  imageLink!: string;
  spicySelected: boolean = false;
  veganSelected: boolean = false;

  ngOnInit(): void {
    this.imageLink = `url(assets/jpg/dishes/${this.type.toLowerCase()}.jpg)`;
    this.dishes = this.allDishes.filter((dish) => dish.type === this.type);
  }

  filterDishes(filter: string): void {
    if (filter === 'spicy') {
      this.spicySelected = !this.spicySelected;
    } else if (filter === 'vegan') {
      this.veganSelected = !this.veganSelected;
    }
    this.dishes = this.allDishes.filter((dish) => dish.type === this.type);

    if (this.veganSelected && this.spicySelected) {
      this.dishes = this.dishes.filter((dish) => dish.isVegan && dish.isSpicy);
    } else if (this.veganSelected) {
      this.dishes = this.dishes.filter((dish) => dish.isVegan);
    } else if (this.spicySelected) {
      this.dishes = this.dishes.filter((dish) => dish.isSpicy);
    }
  }
}
