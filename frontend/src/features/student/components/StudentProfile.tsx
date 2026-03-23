import { useState } from 'react';
import { useStudentProfile } from '../hooks/useStudentProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
   HiUser,
   HiEnvelope,
   HiAcademicCap,
   HiCalendar,
   HiChevronDown,
   HiChevronUp,
} from 'react-icons/hi2';

export default function StudentProfile() {
   const { data: profile, isLoading, error } = useStudentProfile();
   const [isExpanded, setIsExpanded] = useState(false);

   if (isLoading) {
      return (
         <Card>
            <CardHeader>
               <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
               {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                     <Skeleton className="h-4 w-24" />
                     <Skeleton className="h-5 w-40" />
                  </div>
               ))}
            </CardContent>
         </Card>
      );
   }

   if (error) {
      return (
         <Card>
            <CardContent className="p-6">
               <p className="text-destructive">Failed to load profile</p>
            </CardContent>
         </Card>
      );
   }

   if (!profile) return null;

   return (
      <Card>
         <CardHeader
            className="cursor-pointer md:cursor-default"
            onClick={() => setIsExpanded(!isExpanded)}
         >
            <div className="flex items-center justify-between">
               <CardTitle>My Profile</CardTitle>
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
               <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                  <HiUser className="h-5 w-5 text-blue-500" />
               </div>
               <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">
                     Name
                  </p>
                  <p className="text-base font-medium truncate">
                     {profile.name}
                  </p>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center hrink-0">
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
               <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                  <HiAcademicCap className="h-5 w-5 text-green-500" />
               </div>
               <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">
                     Year Level
                  </p>
                  <p className="text-base font-medium">
                     Year {profile.year_level}
                  </p>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                  <HiCalendar className="h-5 w-5 text-orange-500" />
               </div>
               <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">
                     Joined
                  </p>
                  <p className="text-base">
                     {new Date(profile.created_at).toLocaleDateString()}
                  </p>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
