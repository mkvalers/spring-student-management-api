import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import useStudentProfile from '@/features/student/hooks/useStudentProfile';

const StudentProfile = () => {
   const { data, isPending } = useStudentProfile();

   if (isPending) return <p className="text-sm text-muted-foreground">Loading profile...</p>;
   if (!data) return null;

   return (
      <Card>
         <CardHeader>
            <CardTitle>My Profile</CardTitle>
         </CardHeader>
         <CardContent className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
               <span className="text-muted-foreground">Name</span>
               <span>{data.name}</span>
            </div>
            <div className="flex justify-between">
               <span className="text-muted-foreground">Email</span>
               <span>{data.email}</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-muted-foreground">Year Level</span>
               <Badge variant="secondary">Year {data.year_level}</Badge>
            </div>
            <div className="flex justify-between">
               <span className="text-muted-foreground">Joined</span>
               <span>{new Date(data.created_at).toLocaleDateString()}</span>
            </div>
         </CardContent>
      </Card>
   );
};

export { StudentProfile };
