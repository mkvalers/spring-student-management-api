import { useInfiniteQuery } from '@tanstack/react-query';
import adminService, { type StudentFilters } from '../services/adminService';

export function useStudents(filters: StudentFilters = {}) {
   return useInfiniteQuery({
      queryKey: ['admin', 'students', filters],
      queryFn: ({ pageParam = 0 }) => 
         adminService.getAllStudents({ ...filters, page: pageParam, size: 10 }),
      getNextPageParam: (lastPage, allPages) => {
         return lastPage.length === 10 ? allPages.length : undefined;
      },
      initialPageParam: 0,
   });
}
