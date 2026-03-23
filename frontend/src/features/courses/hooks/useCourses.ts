import { useQuery } from '@tanstack/react-query';
import courseService from '../services/courseService';

export function useCourses() {
   return useQuery({
      queryKey: ['courses'],
      queryFn: courseService.getAllCourses,
   });
}
