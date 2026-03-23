import { useQuery } from '@tanstack/react-query';
import studentService from '../services/studentService';

export function useStudentProfile() {
   return useQuery({
      queryKey: ['student', 'profile'],
      queryFn: studentService.getMyProfile,
   });
}
