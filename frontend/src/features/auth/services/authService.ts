import apiClient from '@/api/apiClient';
import type { JwtResponse, RegistrationResponse } from '@/types';

export interface LoginRequest {
   email: string;
   password: string;
}

export interface RegisterRequest {
   email: string;
   password: string;
   first_name: string;
   last_name: string;
   year_level: number;
}

const BASE_URL = '/auth';

const authService = {
   login: (data: LoginRequest) =>
      apiClient.post<JwtResponse>(`${BASE_URL}/login`, data).then((r) => r.data),

   register: (data: RegisterRequest) =>
      apiClient.post<RegistrationResponse>(`${BASE_URL}/register`, data).then((r) => r.data),
};

export default authService;
