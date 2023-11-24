import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { selectAuthUser } from '../auth/store/auth.selectors';
import { User } from '../core/models/user.model';
import { ReservationsComponent } from './components/reservations/reservations.component';
import * as AuthActions from '../auth/store/auth.actions';
import { DishesComponent } from './components/dishes/dishes.component';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss', './common-styles.scss'],
})
export class WorkerComponent implements OnInit, OnDestroy {
  private sub = new Subscription();
  @ViewChild(ReservationsComponent)
  reservationsComponent!: ReservationsComponent;
  @ViewChild(DishesComponent)
  dishesComponent!: DishesComponent;
  user: User | null = null;
  tableType: string = 'reservations';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.sub = this.store.select(selectAuthUser).subscribe((user) => {
      this.user = user || null;
    });
  }

  changeTable(type: string): void {
    this.tableType = type;
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
