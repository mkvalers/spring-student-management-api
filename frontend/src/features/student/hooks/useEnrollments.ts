import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import studentService from '../services/studentService';

export function useEnrollments() {
   return useQuery({
      queryKey: ['student', 'enrollments'],
      queryFn: studentService.getMyEnrollments,
   });
}

export function useDropCourse() {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (enrollmentId: number) => studentService.dropCourse(enrollmentId),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['student', 'enrollments'] });
      },
   });
}
