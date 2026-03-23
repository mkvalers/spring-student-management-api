import { useEnrollments, useDropCourse } from '../hooks/useEnrollments';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function EnrolledCourses() {
   const { data: enrollments, isLoading, error } = useEnrollments();
   const { mutate: dropCourse, isPending } = useDropCourse();

   if (isLoading) {
      return (
         <Card>
            <CardContent className="p-6">
               <p className="text-muted-foreground">Loading enrollments...</p>
            </CardContent>
         </Card>
      );
   }

   if (error) {
      return (
         <Card>
            <CardContent className="p-6">
               <p className="text-destructive">Failed to load enrollments</p>
            </CardContent>
         </Card>
      );
   }

   if (!enrollments || enrollments.length === 0) {
      return (
         <Card>
            <CardHeader>
               <CardTitle>My Enrolled Courses</CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-muted-foreground">You are not enrolled in any courses yet.</p>
            </CardContent>
         </Card>
      );
   }

   return (
      <Card>
         <CardHeader>
            <CardTitle>My Enrolled Courses</CardTitle>
         </CardHeader>
         <CardContent className="space-y-3">
            {enrollments.map((enrollment) => (
               <div
                  key={enrollment.enrollment_id}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
               >
                  <div>
                     <p className="font-medium">{enrollment.course_name}</p>
                     <p className="text-sm text-muted-foreground">Course ID: {enrollment.course_id}</p>
                  </div>
                  <Button
                     variant="destructive"
                     size="sm"
                     onClick={() => dropCourse(enrollment.enrollment_id)}
                     disabled={isPending}
                  >
                     {isPending ? 'Dropping...' : 'Drop'}
                  </Button>
               </div>
            ))}
         </CardContent>
         <CardFooter>
            <p className="text-sm text-muted-foreground">
               Total: {enrollments.length} course{enrollments.length !== 1 ? 's' : ''}
            </p>
         </CardFooter>
      </Card>
   );
}
