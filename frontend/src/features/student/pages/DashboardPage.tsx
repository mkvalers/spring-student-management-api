import StudentProfile from '../components/StudentProfile';
import EnrolledCourses from '../components/EnrolledCourses';

export default function DashboardPage() {
   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your profile and enrolled courses.</p>
         </div>
         <div className="grid gap-6 md:grid-cols-2">
            <StudentProfile />
            <EnrolledCourses />
         </div>
      </div>
   );
}
