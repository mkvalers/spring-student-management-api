import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CourseCardSkeleton() {
   return (
      <Card className="rounded-xl border-l-4 border-l-gray-300">
         <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
               <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
               </div>
               <Skeleton className="h-6 w-6 rounded-full" />
            </div>
         </CardHeader>
         <CardContent className="pb-4">
            <Skeleton className="h-6 w-20 rounded-full" />
         </CardContent>
         <CardFooter>
            <Skeleton className="h-10 w-full rounded-xl" />
         </CardFooter>
      </Card>
   );
}
