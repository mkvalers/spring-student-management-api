import { useStudentProfile } from '../hooks/useStudentProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StudentProfile() {
   const { data: profile, isLoading, error } = useStudentProfile();

   if (isLoading) {
      return (
         <Card>
            <CardContent className="p-6">
               <p className="text-muted-foreground">Loading profile...</p>
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
         <CardHeader>
            <CardTitle>My Profile</CardTitle>
         </CardHeader>
         <CardContent className="space-y-3">
            <div>
               <p className="text-sm font-medium text-muted-foreground">Name</p>
               <p className="text-base">{profile.name}</p>
            </div>
            <div>
               <p className="text-sm font-medium text-muted-foreground">Email</p>
               <p className="text-base">{profile.email}</p>
            </div>
            <div>
               <p className="text-sm font-medium text-muted-foreground">Year Level</p>
               <p className="text-base">Year {profile.year_level}</p>
            </div>
            <div>
               <p className="text-sm font-medium text-muted-foreground">Joined</p>
               <p className="text-base">{new Date(profile.created_at).toLocaleDateString()}</p>
            </div>
         </CardContent>
      </Card>
   );
}
