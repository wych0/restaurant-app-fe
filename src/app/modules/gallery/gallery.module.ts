import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GalleryRoutingModule } from './gallery-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GalleryComponent } from './gallery.component';
import { SwiperComponent } from './swiper/swiper.component';

@NgModule({
  declarations: [GalleryComponent, SwiperComponent],
  imports: [SharedModule, GalleryRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GalleryModule {}
