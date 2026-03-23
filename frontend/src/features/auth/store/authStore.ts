import { create } from 'zustand';
import type { Role, StudentResponse, AdminResponse } from '@/types';

interface AuthState {
   token: string | null;
   role: Role | null;
   user: StudentResponse | AdminResponse | null;
   setAuth: (token: string, role: Role) => void;
   setUser: (user: StudentResponse | AdminResponse) => void;
   clearAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
   token: sessionStorage.getItem('token'),
   role: sessionStorage.getItem('role') as Role | null,
   user: null,

   setAuth: (token, role) => {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('role', role);
      set({ token, role });
   },

   setUser: (user) => set({ user }),

   clearAuth: () => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      set({ token: null, role: null, user: null });
   },
}));

export default useAuthStore;
