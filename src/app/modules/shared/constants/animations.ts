import { trigger, transition, style, animate } from '@angular/animations';

const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('0.3s ease-in', style({ opacity: 1 })),
]);

const exitTransition = transition(':leave', [
  animate('0.3s ease-out', style({ opacity: 0 })),
]);

export const fadeIn = trigger('fadeIn', [enterTransition]);
export const fadeOut = trigger('fadeOut', [exitTransition]);
