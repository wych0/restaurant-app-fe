export interface AuthData {
  email: string;
  password: string;
}

export interface ResendActivationEmailData {
  email: string;
}

export type SendRecoverPasswordEmailData = ResendActivationEmailData;

export interface RecoverPasswordData {
  password: string;
}

export interface MessageResponse {
  message: string;
}

export type LoginData = AuthData;
export type RegisterData = AuthData;
