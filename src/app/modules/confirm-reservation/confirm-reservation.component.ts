import { Component } from '@angular/core';
import { ReservationService } from '../core/services/reservation.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-confirm-reservation',
  templateUrl: './confirm-reservation.component.html',
  styleUrls: ['./confirm-reservation.component.scss'],
})
export class ConfirmReservationComponent {
  sub = new Subscription();
  error: string | null = null;

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      const token = params['token'];
      this.reservationService.confirm(token).subscribe({
        next: (response) => {
          this.notifierService.notify('success', response.message);
          this.router.navigate(['/']);
        },
        error: (response) => {
          this.error = response.error.message;
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
