import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { StudentDto } from '@/types';

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
            <CardContent className="p-6">
               <p className="text-center text-muted-foreground">No students found</p>
            </CardContent>
         </Card>
      );
   }

   return (
      <div className="space-y-4">
         <Card>
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
