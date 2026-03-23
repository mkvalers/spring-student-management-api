import { useCourses } from '../hooks/useCourses';
import CourseCard from '../components/CourseCard';
import EnrollButton from '../components/EnrollButton';

export default function CoursesPage() {
   const { data: courses, isLoading, error } = useCourses();

   if (isLoading) {
      return (
         <div className="space-y-6 md:space-y-8">
            <div>
               <h1 className="text-2xl md:text-3xl font-bold">Available Courses</h1>
               <p className="text-sm md:text-base text-muted-foreground">Browse and enroll in courses</p>
            </div>
            <p className="text-muted-foreground">Loading courses...</p>
         </div>
      );
   }

   if (error) {
      return (
         <div className="space-y-6 md:space-y-8">
            <div>
               <h1 className="text-2xl md:text-3xl font-bold">Available Courses</h1>
               <p className="text-sm md:text-base text-muted-foreground">Browse and enroll in courses</p>
            </div>
            <p className="text-destructive">Failed to load courses. Please try again.</p>
         </div>
      );
   }

   if (!courses || courses.length === 0) {
      return (
         <div className="space-y-6 md:space-y-8">
            <div>
               <h1 className="text-2xl md:text-3xl font-bold">Available Courses</h1>
               <p className="text-sm md:text-base text-muted-foreground">Browse and enroll in courses</p>
            </div>
            <p className="text-muted-foreground">No courses available at the moment.</p>
         </div>
      );
   }

   return (
      <div className="space-y-6 md:space-y-8">
         <div>
            <h1 className="text-2xl md:text-3xl font-bold">Available Courses</h1>
            <p className="text-sm md:text-base text-muted-foreground">Browse and enroll in courses</p>
         </div>
         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
               <CourseCard
                  key={course.id}
                  course={course}
                  action={<EnrollButton courseId={course.id} />}
               />
            ))}
         </div>
      </div>
   );
}
