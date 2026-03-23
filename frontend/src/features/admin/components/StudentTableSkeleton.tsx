import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function StudentTableSkeleton() {
   return (
      <div className="space-y-4">
         {/* Desktop Table Skeleton */}
         <Card className="hidden md:block">
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                  <table className="w-full">
                     <thead className="border-b border-border bg-muted/50">
                        <tr>
                           <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                           <th className="px-4 py-3 text-left text-sm font-medium">Full Name</th>
                           <th className="px-4 py-3 text-left text-sm font-medium">Year Level</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-border">
                        {[...Array(5)].map((_, i) => (
                           <tr key={i}>
                              <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-12" />
                              </td>
                              <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-40" />
                              </td>
                              <td className="px-4 py-3">
                                 <Skeleton className="h-6 w-16 rounded-md" />
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </CardContent>
         </Card>

         {/* Mobile Card Skeleton */}
         <div className="md:hidden space-y-3">
            {[...Array(5)].map((_, i) => (
               <Card key={i}>
                  <CardContent className="p-4">
                     <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                           <Skeleton className="h-4 w-32" />
                           <Skeleton className="h-3 w-20" />
                        </div>
                        <Skeleton className="h-6 w-16 rounded-md" />
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
   );
}
