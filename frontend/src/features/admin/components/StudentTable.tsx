import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { StudentDto } from '@/types';
import { HiUsers } from 'react-icons/hi2';

interface StudentTableProps {
   students: StudentDto[];
   page: number;
   pageSize: number;
   onPageChange: (page: number) => void;
}

export default function StudentTable({ students, page, pageSize, onPageChange }: StudentTableProps) {
   const hasStudents = students && students.length > 0;
   const hasPrevious = page > 0;
   const hasNext = students.length === pageSize;

   if (!hasStudents) {
      return (
         <Card>
            <CardContent className="p-12">
               <div className="flex flex-col items-center justify-center">
                  <div className="rounded-full bg-primary/10 p-6 mb-4 animate-pulse">
                     <HiUsers className="h-16 w-16 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Students Found</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md">
                     No students match your current filters. Try adjusting your search criteria.
                  </p>
               </div>
            </CardContent>
         </Card>
      );
   }

   return (
      <div className="space-y-4">
         {/* Desktop Table View */}
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
                        {students.map((student) => (
                           <tr key={student.id} className="hover:bg-muted/50">
                              <td className="px-4 py-3 text-sm">{student.id}</td>
                              <td className="px-4 py-3 text-sm font-medium">{student.full_name}</td>
                              <td className="px-4 py-3 text-sm">
                                 <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
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
               <Card key={student.id}>
                  <CardContent className="p-4">
                     <div className="space-y-2">
                        <div className="flex items-start justify-between">
                           <div>
                              <p className="font-medium text-sm">{student.full_name}</p>
                              <p className="text-xs text-muted-foreground">ID: {student.id}</p>
                           </div>
                           <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                              Year {student.year_level}
                           </span>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>

         <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
               Page {page + 1} • Showing {students.length} student{students.length !== 1 ? 's' : ''}
            </p>
            <div className="flex gap-2">
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(page - 1)}
                  disabled={!hasPrevious}
               >
                  Previous
               </Button>
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(page + 1)}
                  disabled={!hasNext}
               >
                  Next
               </Button>
            </div>
         </div>
      </div>
   );
}
