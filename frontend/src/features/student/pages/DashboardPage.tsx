import { StudentProfile } from '@/features/student/components/StudentProfile';
import { EnrolledCourses } from '@/features/student/components/EnrolledCourses';

const DashboardPage = () => {
   return (
      <div className="grid gap-6 md:grid-cols-2">
         <StudentProfile />
         <EnrolledCourses />
      </div>
   );
};

export default DashboardPage;
