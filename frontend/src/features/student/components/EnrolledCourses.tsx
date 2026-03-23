import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEnrollments, useDropCourse } from '@/features/student/hooks/useEnrollments';

const EnrolledCourses = () => {
   const { data: enrollments, isPending } = useEnrollments();
   const { mutate: drop, isPending: isDropping } = useDropCourse();

   if (isPending) return <p className="text-sm text-muted-foreground">Loading enrollments...</p>;

   return (
      <Card>
         <CardHeader>
            <CardTitle>Enrolled Courses</CardTitle>
         </CardHeader>
         <CardContent className="flex flex-col gap-2">
            {!enrollments?.length && (
               <p className="text-sm text-muted-foreground">No enrolled courses yet.</p>
            )}
            {enrollments?.map((enrollment) => (
               <div key={enrollment.enrollment_id} className="flex items-center justify-between rounded-lg border border-foreground/10 px-4 py-3 text-sm">
                  <span>{enrollment.course_name}</span>
                  <Button
                     variant="destructive"
                     size="sm"
                     disabled={isDropping}
                     onClick={() => drop(enrollment.enrollment_id)}
                  >
                     Drop
                  </Button>
               </div>
            ))}
         </CardContent>
      </Card>
   );
};

export { EnrolledCourses };
