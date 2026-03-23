import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import authService, { type LoginRequest, type RegisterRequest } from '../services/authService';
import useAuthStore from '../store/authStore';
import type { Role } from '@/types';

function decodeJwtRole(token: string): Role {
   try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || 'STUDENT';
   } catch {
      return 'STUDENT';
   }
}

export function useLogin() {
   const navigate = useNavigate();
   const setAuth = useAuthStore((s) => s.setAuth);

   return useMutation({
      mutationFn: (data: LoginRequest) => authService.login(data),
      onSuccess: (response) => {
         const role = decodeJwtRole(response.token);
         setAuth(response.token, role);
         navigate(role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard');
      },
   });
}

export function useRegister() {
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (data: RegisterRequest) => authService.register(data),
      onSuccess: () => {
         navigate('/login');
      },
   });
}
