import { Component } from '@angular/core';
import { fadeIn } from '../../constants/animations';

@Component({
  selector: 'app-reservation-button',
  templateUrl: './reservation-button.component.html',
  styleUrls: ['./reservation-button.component.scss'],
  animations: [fadeIn],
})
export class ReservationButtonComponent {
  constructor() {}
}
