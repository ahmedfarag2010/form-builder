export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: any;
}

export interface User {
  email: string;
  name?: string;
}
