import { NgModule } from '@angular/core';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MenuComponent, DishesComponent],
  imports: [SharedModule, MenuRoutingModule],
})
export class MenuModule {}
