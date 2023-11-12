import { Component, Input, OnInit } from '@angular/core';
import { fadeIn } from '../../constants/animations';

@Component({
  selector: 'app-reservation-button',
  templateUrl: './reservation-button.component.html',
  styleUrls: ['./reservation-button.component.scss'],
  animations: [fadeIn],
})
export class ReservationButtonComponent implements OnInit {
  @Input() displayedOn!: string;
  buttonClass!: string;
  constructor() {}

  ngOnInit(): void {
    switch (this.displayedOn) {
      case 'account':
        this.buttonClass = 'btn-reservation-account';
        break;
      default:
        this.buttonClass = 'btn-reservation-home';
        break;
    }
  }
}
