import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { StudentDto } from '@/types';
import { HiUsers } from 'react-icons/hi2';

interface StudentTableProps {
   students: StudentDto[];
   onLoadMore: () => void;
   hasMore?: boolean;
   isLoadingMore?: boolean;
}

export default function StudentTable({
   students,
   onLoadMore,
   hasMore,
   isLoadingMore,
}: StudentTableProps) {
   const observerTarget = useRef<HTMLDivElement>(null);
   const hasStudents = students && students.length > 0;

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
               onLoadMore();
            }
         },
         { threshold: 0.1 }
      );

      const currentTarget = observerTarget.current;
      if (currentTarget) {
         observer.observe(currentTarget);
      }

      return () => {
         if (currentTarget) {
            observer.unobserve(currentTarget);
         }
      };
   }, [hasMore, isLoadingMore, onLoadMore]);

   if (!hasStudents) {
      return (
         <Card>
            <CardContent className="p-12">
               <div className="flex flex-col items-center justify-center">
                  <div className="rounded-full bg-primary/10 p-6 mb-4 animate-pulse">
                     <HiUsers className="h-16 w-16 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                     No Students Found
                  </h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md">
                     No students match your current filters. Try adjusting your
                     search criteria.
                  </p>
               </div>
            </CardContent>
         </Card>
      );
   }

   return (
      <div className="flex-1 overflow-y-auto pr-2 min-h-0">
         <div className="space-y-4">
            {/* Desktop Table View */}
            <Card className="hidden md:block border-l-4 border-l-primary">
               <CardContent className="p-0">
                  <div className="overflow-x-auto">
                     <table className="w-full">
                        <thead className="border-b border-border bg-linear-to-r from-muted/50 to-muted/30">
                           <tr>
                              <th className="px-6 py-4 text-left text-sm font-semibold">
                                 ID
                              </th>
                              <th className="px-6 py-4 text-left text-sm font-semibold">
                                 Full Name
                              </th>
                              <th className="px-6 py-4 text-left text-sm font-semibold">
                                 Year Level
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                           {students.map((student) => (
                              <tr
                                 key={student.id}
                                 className="hover:bg-linear-to-r hover:from-primary/5 hover:to-accent/5 transition-colors"
                              >
                                 <td className="px-6 py-4 text-sm font-medium text-muted-foreground">
                                    {student.id}
                                 </td>
                                 <td className="px-6 py-4 text-sm font-semibold">
                                    {student.full_name}
                                 </td>
                                 <td className="px-6 py-4 text-sm">
                                    <span className="inline-flex items-center rounded-full bg-linear-to-r from-primary/10 to-accent/10 px-3 py-1 text-xs font-medium text-primary">
                                       Year {student.year_level}
                                    </span>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </CardContent>
            </Card>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
               {students.map((student) => (
                  <Card
                     key={student.id}
                     className="border-l-4 border-l-primary hover:shadow-lg transition-all"
                  >
                     <CardContent className="p-4">
                        <div className="space-y-2">
                           <div className="flex items-start justify-between">
                              <div>
                                 <p className="font-semibold text-base">
                                    {student.full_name}
                                 </p>
                                 <p className="text-xs text-muted-foreground mt-1">
                                    ID: {student.id}
                                 </p>
                              </div>
                              <span className="inline-flex items-center rounded-full bg-linear-to-r from-primary/10 to-accent/10 px-3 py-1 text-xs font-medium text-primary">
                                 Year {student.year_level}
                              </span>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>

            {/* Infinite Scroll Trigger */}
            <div ref={observerTarget} className="py-4 text-center">
               {isLoadingMore && (
                  <p className="text-sm text-muted-foreground">
                     Loading more students...
                  </p>
               )}
               {!hasMore && students.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                     No more students to load
                  </p>
               )}
            </div>
         </div>
      </div>
   );
}
