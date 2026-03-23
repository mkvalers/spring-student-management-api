import { useMutation, useQueryClient } from '@tanstack/react-query';
import studentService from '@/features/student/services/studentService';
import { useEnrollments } from '@/features/student/hooks/useEnrollments';
import { Button } from '@/components/ui/button';

interface EnrollButtonProps {
   courseId: number;
}

export default function EnrollButton({ courseId }: EnrollButtonProps) {
   const queryClient = useQueryClient();
   const { data: enrollments } = useEnrollments();

   const { mutate: enroll, isPending } = useMutation({
      mutationFn: (course_id: number) => studentService.enrollCourse(course_id),
      onMutate: async (course_id) => {
         await queryClient.cancelQueries({ queryKey: ['student', 'enrollments'] });
         const previousEnrollments = queryClient.getQueryData(['student', 'enrollments']);
         
         queryClient.setQueryData(['student', 'enrollments'], (old: any) => {
            if (!old) return old;
            return [...old, { course_id, enrollment_id: Date.now() }];
         });
         
         return { previousEnrollments };
      },
      onError: (err, course_id, context) => {
         if (context?.previousEnrollments) {
            queryClient.setQueryData(['student', 'enrollments'], context.previousEnrollments);
         }
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['student', 'enrollments'] });
      },
   });

   const isEnrolled = enrollments?.some((e) => e.course_id === courseId);

   return (
      <Button
         onClick={() => enroll(courseId)}
         disabled={isPending || isEnrolled}
         variant={isEnrolled ? 'secondary' : 'default'}
         className="w-full"
      >
         {isPending ? 'Enrolling...' : isEnrolled ? 'Enrolled' : 'Enroll'}
      </Button>
   );
}
