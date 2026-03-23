import { useQuery } from '@tanstack/react-query';
import adminService from '../services/adminService';

export function useAdminProfile() {
   return useQuery({
      queryKey: ['admin', 'profile'],
      queryFn: adminService.getAdminProfile,
   });
}
