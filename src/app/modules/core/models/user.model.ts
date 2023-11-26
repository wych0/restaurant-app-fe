export interface User {
  email: string;
  role: string;
  id: string;
}

export type Worker = Omit<User, 'role'>;

export interface WorkerData {
  email: string;
  password: string;
}

export interface GetWorkersResponse {
  workers: Worker[];
  totalCount: number;
}

export interface GetWorkersParams {
  sort: string;
  dir: string;
  page: number;
  size: number;
  term?: string;
}

export interface ChangePasswordData {
  password: string;
  newPassword: string;
}
