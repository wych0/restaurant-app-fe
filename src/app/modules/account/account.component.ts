import { Component, ViewChild } from '@angular/core';
import { Display } from './constants/display.enum';
import { ReservationsComponent } from './components/reservations/reservations.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  @ViewChild(ReservationsComponent)
  reservationsComponent!: ReservationsComponent;
  allDisplays = Display;
  display: Display = Display.RESERVATIONS;

  changeDisplay(): void {
    this.reservationsComponent.getUserReservations();
  }
}
