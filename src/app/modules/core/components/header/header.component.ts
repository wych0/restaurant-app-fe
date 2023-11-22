import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, filter } from 'rxjs';
import * as AuthActions from '../../../auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { User } from '../../models/user.model';
import { selectAuthUser } from 'src/app/modules/auth/store/auth.selectors';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user$: Observable<User | null> = this.store.select(selectAuthUser);
  display: boolean = false;
  sub = new Subscription();

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        if (event.url.startsWith('/worker')) {
          this.display = false;
        } else {
          this.display = true;
        }
      });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
