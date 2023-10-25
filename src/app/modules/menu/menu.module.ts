import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { DishesComponent } from './dishes/dishes.component';

@NgModule({
  declarations: [MenuComponent, DishesComponent],
  imports: [CommonModule, MenuRoutingModule],
})
export class MenuModule {}
