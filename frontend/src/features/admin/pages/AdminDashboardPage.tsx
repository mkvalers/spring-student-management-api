import { useAdminProfile } from '../hooks/useAdminProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboardPage() {
   const { data: profile, isLoading, error } = useAdminProfile();

   if (isLoading) {
      return (
         <div className="space-y-6 md:space-y-8">
            <div>
               <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
               <p className="text-sm md:text-base text-muted-foreground">Welcome back, Administrator</p>
            </div>
            <Card>
               <CardContent className="p-6">
                  <p className="text-muted-foreground">Loading profile...</p>
               </CardContent>
            </Card>
         </div>
      );
   }

   if (error) {
      return (
         <div className="space-y-6 md:space-y-8">
            <div>
               <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
               <p className="text-sm md:text-base text-muted-foreground">Welcome back, Administrator</p>
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
      <div className="space-y-6 md:space-y-8">
         <div>
            <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-sm md:text-base text-muted-foreground">Welcome back, Administrator</p>
         </div>
         <Card className="max-w-2xl">
            <CardHeader>
               <CardTitle>Admin Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
               <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-base">{profile.email}</p>
               </div>
               <div>
                  <p className="text-sm font-medium text-muted-foreground">Role</p>
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                     ADMIN
                  </span>
               </div>
               <div>
                  <p className="text-sm font-medium text-muted-foreground">Account Created</p>
                  <p className="text-base">{new Date(profile.created_at).toLocaleDateString()}</p>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
