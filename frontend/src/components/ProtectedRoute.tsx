import { Navigate } from 'react-router-dom';
import useAuthStore from '@/features/auth/store/authStore';
import MainLayout from './MainLayout';
import type { Role } from '@/types';

interface ProtectedRouteProps {
   allowedRole: Role;
}

export default function ProtectedRoute({ allowedRole }: ProtectedRouteProps) {
   const { token, role } = useAuthStore();

   if (!token) return <Navigate to="/login" replace />;

   if (role !== allowedRole) {
      return <Navigate to={role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard'} replace />;
   }

   return <MainLayout />;
}
