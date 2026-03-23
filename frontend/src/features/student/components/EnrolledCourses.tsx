import { useEnrollments, useDropCourse } from '../hooks/useEnrollments';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HiAcademicCap } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import EnrolledCoursesSkeleton from './EnrolledCoursesSkeleton';

export default function EnrolledCourses() {
   const { data: enrollments, isLoading, error } = useEnrollments();
   const { mutate: dropCourse, isPending } = useDropCourse();

   if (isLoading) {
      return <EnrolledCoursesSkeleton />;
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
               <div className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-primary/10 p-4 mb-4 animate-pulse">
                     <HiAcademicCap className="h-12 w-12 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">No Enrollments Yet</h4>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                     You haven't enrolled in any courses yet.
                  </p>
                  <Link to="/courses">
                     <Button size="sm" className="rounded-lg">
                        Browse Courses
                     </Button>
                  </Link>
               </div>
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
