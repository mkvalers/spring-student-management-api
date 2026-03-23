import StudentProfile from '../components/StudentProfile';
import EnrolledCourses from '../components/EnrolledCourses';
import { useStudentProfile } from '../hooks/useStudentProfile';
import { useEnrollments } from '../hooks/useEnrollments';
import { Card, CardContent } from '@/components/ui/card';
import { HiAcademicCap, HiBookOpen } from 'react-icons/hi2';
import useAuthStore from '@/features/auth/store/authStore';

const { user, role } = useAuthStore();
const { data: profile } = useStudentProfile();
const { data: enrollments } = useEnrollments();

const getGreeting = () => {
   const hour = new Date().getHours();
   if (hour < 12) return 'Good morning';
   if (hour < 18) return 'Good afternoon';
   return 'Good evening';
};

const getInitials = (email: string | undefined) => {
   if (!email) return 'S';
   return email.charAt(0).toUpperCase();
};

export default function DashboardPage() {
   return (
      <div className="space-y-4 md:space-y-6">
         {/* Welcome Banner */}
         <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary via-primary/90 to-accent p-4 md:p-8 text-white shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
            <div className="relative z-10 flex items-center gap-3 md:gap-4">
               <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-xl md:text-2xl font-bold">
                  {getInitials(user?.email)}
               </div>
               <div>
                  <h1 className="text-xl md:text-3xl font-bold tracking-tight">
                     {getGreeting()}!
                  </h1>
                  <p className="text-white/90 mt-0.5 md:mt-1 text-sm md:text-base">
                     Welcome back, {profile?.name || 'Student'}
                  </p>
               </div>
            </div>
         </div>

         {/* Stats Cards */}
         <div className="grid grid-cols-2 gap-3 md:gap-4">
            <Card className="flex-1 border-l-4 border-l-blue-500">
               <CardContent className="p-4 md:p-6">
                  <div className="flex items-center gap-2 md:flex-row md:items-center md:justify-between">
                     <div className="flex items-center gap-2 md:block">
                        <div className="h-8 w-8 md:hidden rounded-full bg-blue-500/10 flex items-center justify-center">
                           <HiBookOpen className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                           <p className="text-xs md:text-sm font-medium text-muted-foreground">
                              Enrolled
                           </p>
                           <p className="text-2xl md:text-3xl font-bold mt-0 md:mt-2">
                              {enrollments?.length || 0}
                           </p>
                        </div>
                     </div>
                     <div className="hidden md:flex h-12 w-12 rounded-full bg-blue-500/10 items-center justify-center">
                        <HiBookOpen className="h-6 w-6 text-blue-500" />
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card className="flex-1 border-l-4 border-l-purple-500">
               <CardContent className="p-4 md:p-6">
                  <div className="flex items-center gap-2 md:flex-row md:items-center md:justify-between">
                     <div className="flex items-center gap-2 md:block">
                        <div className="h-8 w-8 md:hidden rounded-full bg-purple-500/10 flex items-center justify-center">
                           <HiAcademicCap className="h-4 w-4 text-purple-500" />
                        </div>
                        <div>
                           <p className="text-xs md:text-sm font-medium text-muted-foreground">
                              Year
                           </p>
                           <p className="text-2xl md:text-3xl font-bold mt-0 md:mt-2">
                              {profile?.year_level || '-'}
                           </p>
                        </div>
                     </div>
                     <div className="hidden md:flex h-12 w-12 rounded-full bg-purple-500/10 items-center justify-center">
                        <HiAcademicCap className="h-6 w-6 text-purple-500" />
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Profile and Enrolled Courses */}
         <div className="flex flex-col md:gap-4 md:gap-6">
            <div className="flex-1">
               <StudentProfile />
            </div>
            <div className="flex-1">
               <EnrolledCourses />
            </div>
         </div>
      </div>
   );
}
