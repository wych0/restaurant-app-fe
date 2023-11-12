import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../core/models/auth.model';
import { Error } from '../../core/models/error.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const _authReducer = createReducer(
  initialState,
  on(AuthActions.login, AuthActions.register, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user,
    error: null,
  })),
  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(
    AuthActions.loginFailure,
    AuthActions.registerFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),
  on(
    AuthActions.autoLogin,
    AuthActions.autoLoginFailure,
    AuthActions.logout,
    AuthActions.logoutFailure,
    (state) => ({
      ...state,
    })
  ),
  on(AuthActions.autoLoginSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
    error: null,
  })),
  on(AuthActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
