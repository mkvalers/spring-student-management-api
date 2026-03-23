import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function EnrolledCoursesSkeleton() {
   return (
      <Card>
         <CardHeader>
            <Skeleton className="h-6 w-48" />
         </CardHeader>
         <CardContent className="space-y-3">
            {[...Array(3)].map((_, i) => (
               <div key={i} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex-1 space-y-2">
                     <Skeleton className="h-5 w-3/4" />
                     <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-8 w-16 rounded-md" />
               </div>
            ))}
         </CardContent>
      </Card>
   );
}
