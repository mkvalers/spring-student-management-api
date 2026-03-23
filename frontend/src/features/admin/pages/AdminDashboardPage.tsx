import { useState } from 'react';
import { useAdminProfile } from '../hooks/useAdminProfile';
import { useStudents } from '../hooks/useStudents';
import { useCourses } from '@/features/courses/hooks/useCourses';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
   HiEnvelope,
   HiShieldCheck,
   HiCalendar,
   HiUsers,
   HiBookOpen,
   HiChevronDown,
   HiChevronUp,
} from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import useAuthStore from '@/features/auth/store/authStore';

export default function AdminDashboardPage() {
   const { user } = useAuthStore();
   const { data: profile, isLoading, error } = useAdminProfile();
   const { data: studentsData } = useStudents();
   const { data: courses } = useCourses();
   const [isExpanded, setIsExpanded] = useState(false);

   const studentCount = studentsData?.pages.flatMap((page) => page).length || 0;

   const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good morning';
      if (hour < 18) return 'Good afternoon';
      return 'Good evening';
   };

   const getInitials = (email: string | undefined) => {
      if (!email) return 'A';
      return email.charAt(0).toUpperCase();
   };

   if (isLoading) {
      return (
         <div className="space-y-6">
            {/* Welcome Banner Skeleton */}
            <div className="rounded-2xl bg-linear-to-br from-primary via-primary/90 to-accent p-8">
               <div className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="space-y-2">
                     <Skeleton className="h-8 w-48" />
                     <Skeleton className="h-5 w-64" />
                  </div>
               </div>
            </div>
            {/* Stats Skeleton */}
            <div className="grid gap-4 md:grid-cols-3">
               {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                     <CardContent className="p-6">
                        <Skeleton className="h-20 w-full" />
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="space-y-6">
            <div>
               <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Admin Dashboard
               </h1>
               <p className="text-sm md:text-base text-muted-foreground mt-1">
                  Welcome back, Administrator
               </p>
            </div>
            <Card>
               <CardContent className="p-6">
                  <p className="text-destructive">Failed to load profile</p>
               </CardContent>
            </Card>
         </div>
      );
   }

   if (!profile) return null;

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
                     Welcome back, Administrator
                  </p>
               </div>
            </div>
         </div>

         {/* Stats Cards */}
         <div className="grid grid-cols-2 gap-3 md:gap-4">
            <Link to="/admin/students" className="block">
               <Card className="h-full border-l-4 border-l-blue-500 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1 duration-300">
                  <CardContent className="p-4 md:p-6">
                     <div className="flex items-center gap-2 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-2 md:block">
                           <div className="h-8 w-8 md:hidden rounded-full bg-blue-500/10 flex items-center justify-center">
                              <HiUsers className="h-4 w-4 text-blue-500" />
                           </div>
                           <div>
                              <p className="text-xs md:text-sm font-medium text-muted-foreground">
                                 Students
                              </p>
                              <p className="text-2xl md:text-3xl font-bold mt-0 md:mt-2">
                                 {studentCount}
                              </p>
                           </div>
                        </div>
                        <div className="hidden md:flex h-12 w-12 rounded-full bg-blue-500/10 items-center justify-center">
                           <HiUsers className="h-6 w-6 text-blue-500" />
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </Link>

            <Link to="/admin/courses" className="block">
               <Card className="h-full border-l-4 border-l-purple-500 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1 duration-300">
                  <CardContent className="p-4 md:p-6">
                     <div className="flex items-center gap-2 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-2 md:block">
                           <div className="h-8 w-8 md:hidden rounded-full bg-purple-500/10 flex items-center justify-center">
                              <HiBookOpen className="h-4 w-4 text-purple-500" />
                           </div>
                           <div>
                              <p className="text-xs md:text-sm font-medium text-muted-foreground">
                                 Courses
                              </p>
                              <p className="text-2xl md:text-3xl font-bold mt-0 md:mt-2">
                                 {courses?.length || 0}
                              </p>
                           </div>
                        </div>
                        <div className="hidden md:flex h-12 w-12 rounded-full bg-purple-500/10 items-center justify-center">
                           <HiBookOpen className="h-6 w-6 text-purple-500" />
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </Link>
         </div>

         {/* Admin Profile */}
         <Card className="max-w-2xl">
            <CardHeader
               className="cursor-pointer md:cursor-default"
               onClick={() => setIsExpanded(!isExpanded)}
            >
               <div className="flex items-center justify-between">
                  <CardTitle>Admin Profile</CardTitle>
                  <button className="md:hidden text-muted-foreground hover:text-foreground transition-colors">
                     {isExpanded ? (
                        <HiChevronUp className="h-5 w-5" />
                     ) : (
                        <HiChevronDown className="h-5 w-5" />
                     )}
                  </button>
               </div>
            </CardHeader>
            <CardContent
               className={`space-y-4 ${isExpanded ? 'block' : 'hidden'} md:block`}
            >
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                     <HiEnvelope className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium text-muted-foreground">
                        Email
                     </p>
                     <p className="text-base truncate">{profile.email}</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                     <HiShieldCheck className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium text-muted-foreground">
                        Role
                     </p>
                     <span className="inline-flex items-center rounded-full bg-linear-to-r from-primary/10 to-accent/10 px-3 py-1 text-xs font-medium text-primary">
                        ADMIN
                     </span>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                     <HiCalendar className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium text-muted-foreground">
                        Account Created
                     </p>
                     <p className="text-base">
                        {new Date(profile.created_at).toLocaleDateString()}
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
