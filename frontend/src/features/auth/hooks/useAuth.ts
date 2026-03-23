import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import authService, { type LoginRequest, type RegisterRequest } from '@/features/auth/services/authService';
import useAuthStore from '@/features/auth/store/authStore';
import type { Role } from '@/types';

interface JwtPayload {
   role: Role;
}

export const useLogin = () => {
   const navigate = useNavigate();
   const setAuth = useAuthStore((s) => s.setAuth);

   return useMutation({
      mutationFn: (data: LoginRequest) => authService.login(data),
      onSuccess: ({ token }) => {
         const { role } = jwtDecode<JwtPayload>(token);
         setAuth(token, role);
         navigate(role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard', { replace: true });
      },
   });
};

export const useRegister = () => {
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (data: RegisterRequest) => authService.register(data),
      onSuccess: () => navigate('/login', { replace: true }),
   });
};
