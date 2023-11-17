import { Component } from '@angular/core';
import * as AuthActions from '../../../auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { User } from '../../models/user.model';
import { selectAuthUser } from 'src/app/modules/auth/store/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user$: Observable<User | null> = this.store.select(selectAuthUser);
  constructor(private store: Store<AppState>) {}

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
