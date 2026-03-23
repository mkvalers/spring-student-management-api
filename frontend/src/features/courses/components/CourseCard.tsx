import type { CourseResponse } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface CourseCardProps {
   course: CourseResponse;
   action?: React.ReactNode;
}

export default function CourseCard({ course, action }: CourseCardProps) {
   return (
      <Card>
         <CardHeader>
            <CardTitle>{course.course_name}</CardTitle>
            <CardDescription>Course Code: {course.course_code}</CardDescription>
         </CardHeader>
         <CardContent>
            <div className="flex items-center gap-2">
               <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {course.units} {course.units === 1 ? 'Unit' : 'Units'}
               </span>
            </div>
         </CardContent>
         {action && <CardFooter>{action}</CardFooter>}
      </Card>
   );
}
