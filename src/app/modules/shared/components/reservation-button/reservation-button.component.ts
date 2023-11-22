import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { fadeIn } from '../../constants/animations';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { selectAuthUser } from 'src/app/modules/auth/store/auth.selectors';
import { User } from 'src/app/modules/core/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reservation-button',
  templateUrl: './reservation-button.component.html',
  styleUrls: ['./reservation-button.component.scss'],
  animations: [fadeIn],
})
export class ReservationButtonComponent implements OnInit, OnDestroy {
  @Input() displayedOn!: string;
  buttonClass!: string;
  user: User | null = null;
  sub = new Subscription();
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    switch (this.displayedOn) {
      case 'account':
        this.buttonClass = 'btn-reservation-account';
        break;
      case 'contact':
        this.buttonClass = 'btn-reservation-contact';
        break;
      default:
        this.buttonClass = 'btn-reservation-home';
        break;
    }
  }

  initReservationModal(): void {
    this.sub = this.store.select(selectAuthUser).subscribe((user) => {
      this.user = user || null;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
