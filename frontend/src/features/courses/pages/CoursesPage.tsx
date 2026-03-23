import { useCourses } from '../hooks/useCourses';
import CourseCard from '../components/CourseCard';
import CourseCardSkeleton from '../components/CourseCardSkeleton';
import EnrollButton from '../components/EnrollButton';
import { HiInboxStack } from 'react-icons/hi2';

export default function CoursesPage() {
   const { data: courses, isLoading, error } = useCourses();

   // Show skeleton on initial load or when loading
   if (isLoading || !courses) {
      return (
         <div className="space-y-8 md:space-y-10">
            <div>
               <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Available Courses</h1>
               <p className="text-sm md:text-base text-muted-foreground mt-1">Browse and enroll in courses</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
               {[...Array(6)].map((_, i) => (
                  <CourseCardSkeleton key={i} />
               ))}
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="space-y-8 md:space-y-10">
            <div>
               <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Available Courses</h1>
               <p className="text-sm md:text-base text-muted-foreground mt-1">Browse and enroll in courses</p>
            </div>
            <p className="text-destructive">Failed to load courses. Please try again.</p>
         </div>
      );
   }

   if (!courses || courses.length === 0) {
      return (
         <div className="space-y-8 md:space-y-10">
            <div>
               <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Available Courses</h1>
               <p className="text-sm md:text-base text-muted-foreground mt-1">Browse and enroll in courses</p>
            </div>
            <div className="flex flex-col items-center justify-center py-16 px-4">
               <div className="rounded-full bg-primary/10 p-6 mb-6 animate-pulse">
                  <HiInboxStack className="h-16 w-16 text-primary" />
               </div>
               <h3 className="text-xl font-semibold mb-2">No Courses Available</h3>
               <p className="text-muted-foreground text-center max-w-md mb-6">
                  There are currently no courses available. Check back later for new courses to enroll in.
               </p>
            </div>
         </div>
      );
   }

   return (
      <div className="space-y-8 md:space-y-10">
         <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Available Courses</h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1">Browse and enroll in courses</p>
         </div>
         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
