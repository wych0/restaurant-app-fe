import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, Subscription } from 'rxjs';

import { FormService } from 'src/app/modules/core/services/form-service';
import { RegisterForm } from 'src/app/modules/core/models/forms.model';
import { fadeIn } from 'src/app/modules/shared/constants/animations';
import { AppState } from 'src/app/store/app.reducer';
import { RegisterData } from 'src/app/modules/core/models/auth.model';
import { Size } from 'src/app/modules/core/models/spinner.model';

import { Display } from '../../constants/display.enum';
import * as AuthActions from '../../store/auth.actions';
import { selectAuthError, selectAuthLoading } from '../../store/auth.selectors';
import { Error } from 'src/app/modules/core/models/error.model';

const REGISTER_SUCCESS_TYPE = '[Auth] Register Success';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../common-styles.scss'],
  animations: [fadeIn],
})
export class RegisterComponent implements OnDestroy, OnInit {
  @Output() changeComponent = new EventEmitter<Display>();
  submitted: boolean = false;
  registerForm: FormGroup<RegisterForm> = this.formService.initRegisterForm();
  error$: Observable<Error | null> = this.store.select(selectAuthError);
  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  spinnerSize: Size = Size.SMALL;
  sub = new Subscription();

  constructor(
    private formService: FormService,
    private store: Store<AppState>,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.sub = this.actions$
      .pipe(ofType(REGISTER_SUCCESS_TYPE))
      .subscribe(() => {
        this.changeDisplay();
      });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      const formData = this.registerForm.getRawValue();
      const registerData: RegisterData = {
        email: formData.email,
        password: formData.password,
      };
      this.store.dispatch(AuthActions.register({ registerData }));
    }
  }

  changeDisplay(): void {
    this.changeComponent.emit(Display.LOGIN);
  }

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

  checkControlInvalid(control: FormControl) {
    return this.formService.controlInvalid(control, this.submitted);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.store.dispatch(AuthActions.clearError());
  }
}
