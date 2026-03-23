import { useQuery } from '@tanstack/react-query';
import adminService, { type StudentFilters } from '../services/adminService';

export function useStudents(filters: StudentFilters = {}) {
   return useQuery({
      queryKey: ['admin', 'students', filters],
      queryFn: () => adminService.getAllStudents(filters),
   });
}
