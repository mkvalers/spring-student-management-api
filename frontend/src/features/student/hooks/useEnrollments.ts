import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import studentService from '@/features/student/services/studentService';

export const useEnrollments = () =>
   useQuery({
      queryKey: ['student', 'enrollments'],
      queryFn: studentService.getMyEnrollments,
   });

export const useDropCourse = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (enrollmentId: number) => studentService.dropCourse(enrollmentId),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['student', 'enrollments'] }),
   });
};
