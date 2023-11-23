import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { selectAuthUser } from '../auth/store/auth.selectors';
import { User } from '../core/models/user.model';
import { ReservationsComponent } from './components/reservations/reservations.component';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss', './common-styles.scss'],
})
export class WorkerComponent implements OnInit, OnDestroy {
  private sub = new Subscription();
  @ViewChild(ReservationsComponent)
  reservationsComponent!: ReservationsComponent;
  user: User | null = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.sub = this.store.select(selectAuthUser).subscribe((user) => {
      this.user = user || null;
    });
  }

  fetchData(dataType: string): void {
    if (dataType === 'reservations') {
      this.reservationsComponent.getReservations();
    }
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
