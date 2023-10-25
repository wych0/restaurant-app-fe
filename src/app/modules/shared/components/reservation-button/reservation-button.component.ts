import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('1s ease-in', style({ opacity: 1 })),
]);
const fadeIn = trigger('fadeIn', [enterTransition]);

@Component({
  selector: 'app-reservation-button',
  templateUrl: './reservation-button.component.html',
  styleUrls: ['./reservation-button.component.scss'],
  animations: [fadeIn],
})
export class ReservationButtonComponent {}
