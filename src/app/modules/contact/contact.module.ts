import { NgModule } from '@angular/core';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { SharedModule } from '../shared/shared.module';
import { GoogleMapComponent } from './components/google-map/google-map.component';

@NgModule({
  declarations: [ContactComponent, GoogleMapComponent],
  imports: [SharedModule, ContactRoutingModule],
})
export class ContactModule {}
