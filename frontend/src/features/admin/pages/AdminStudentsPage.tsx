import { useState } from 'react';
import { useStudents } from '../hooks/useStudents';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import StudentTableSkeleton from '../components/StudentTableSkeleton';

const PAGE_SIZE = 10;

export default function AdminStudentsPage() {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [yearLevel, setYearLevel] = useState('');
   const [page, setPage] = useState(0);

   const filters = {
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      yearLevel: yearLevel ? parseInt(yearLevel) : undefined,
      page,
      size: PAGE_SIZE,
   };

   const { data: students, isLoading, error } = useStudents(filters);

   const handleClearFilters = () => {
      setFirstName('');
      setLastName('');
      setYearLevel('');
      setPage(0);
   };

   const handlePageChange = (newPage: number) => {
      setPage(newPage);
   };

   return (
      <div className="space-y-6 md:space-y-8">
         <div>
            <h1 className="text-2xl md:text-3xl font-bold">Students</h1>
            <p className="text-sm md:text-base text-muted-foreground">Browse and filter student records</p>
         </div>

         <StudentFilters
            firstName={firstName}
            lastName={lastName}
            yearLevel={yearLevel}
            onFirstNameChange={(value) => {
               setFirstName(value);
               setPage(0);
            }}
            onLastNameChange={(value) => {
               setLastName(value);
               setPage(0);
            }}
            onYearLevelChange={(value) => {
               setYearLevel(value);
               setPage(0);
            }}
            onClear={handleClearFilters}
         />

         {isLoading && <StudentTableSkeleton />}

         {error && <p className="text-destructive">Failed to load students. Please try again.</p>}

         {students && (
            <StudentTable
               students={students}
               page={page}
               pageSize={PAGE_SIZE}
               onPageChange={handlePageChange}
            />
         )}
      </div>
   );
}
