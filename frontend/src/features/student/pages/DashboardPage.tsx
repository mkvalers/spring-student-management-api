import StudentProfile from '../components/StudentProfile';
import EnrolledCourses from '../components/EnrolledCourses';

export default function DashboardPage() {
   return (
      <div className="space-y-6 md:space-y-8">
         <div>
            <h1 className="text-2xl md:text-3xl font-bold">Student Dashboard</h1>
            <p className="text-sm md:text-base text-muted-foreground">Welcome back! Here's your profile and enrolled courses.</p>
         </div>
         <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            <StudentProfile />
            <EnrolledCourses />
         </div>
      </div>
   );
}
