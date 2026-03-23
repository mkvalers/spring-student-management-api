import StudentProfile from '../components/StudentProfile';
import EnrolledCourses from '../components/EnrolledCourses';

export default function DashboardPage() {
   return (
      <div className="space-y-8 md:space-y-10">
         <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Student Dashboard</h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1">Welcome back! Here's your profile and enrolled courses.</p>
         </div>
         <div className="grid gap-6 md:grid-cols-2">
            <StudentProfile />
            <EnrolledCourses />
         </div>
      </div>
   );
}
