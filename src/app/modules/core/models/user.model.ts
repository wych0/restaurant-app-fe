export interface User {
  email: string;
  role: string;
  id: string;
}

export interface ChangePasswordData {
  password: string;
  newPassword: string;
}
