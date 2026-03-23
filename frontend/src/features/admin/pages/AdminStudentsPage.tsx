import { useState } from 'react';
import { useStudents } from '../hooks/useStudents';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import StudentTableSkeleton from '../components/StudentTableSkeleton';

export default function AdminStudentsPage() {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [yearLevel, setYearLevel] = useState('');

   const filters = {
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      yearLevel: yearLevel ? parseInt(yearLevel) : undefined,
   };

   const { 
      data, 
      isLoading, 
      error, 
      fetchNextPage, 
      hasNextPage, 
      isFetchingNextPage 
   } = useStudents(filters);

   const handleClearFilters = () => {
      setFirstName('');
      setLastName('');
      setYearLevel('');
   };

   const students = data?.pages.flatMap(page => page) ?? [];

   return (
      <div className="h-full flex flex-col space-y-6 md:space-y-8">
         <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Students</h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1">Browse and filter student records</p>
         </div>

         <StudentFilters
            firstName={firstName}
            lastName={lastName}
            yearLevel={yearLevel}
            onFirstNameChange={(value) => {
               setFirstName(value);
            }}
            onLastNameChange={(value) => {
               setLastName(value);
            }}
            onYearLevelChange={(value) => {
               setYearLevel(value);
            }}
            onClear={handleClearFilters}
         />

         {isLoading && <StudentTableSkeleton />}

         {error && <p className="text-destructive">Failed to load students. Please try again.</p>}

         {students && (
            <StudentTable
               students={students}
               onLoadMore={fetchNextPage}
               hasMore={hasNextPage}
               isLoadingMore={isFetchingNextPage}
            />
         )}
      </div>
   );
}
