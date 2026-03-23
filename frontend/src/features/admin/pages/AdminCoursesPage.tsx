import { useState, useMemo } from 'react';
import { useCourses, useCreateCourse, useUpdateCourse, useDeleteCourse } from '@/features/courses/hooks/useCourses';
import CourseCard from '@/features/courses/components/CourseCard';
import CourseCardSkeleton from '@/features/courses/components/CourseCardSkeleton';
import CourseFilters from '@/features/courses/components/CourseFilters';
import CourseForm, { type CourseFormData } from '@/features/courses/components/CourseForm';
import { Button } from '@/components/ui/button';
import type { CourseResponse } from '@/types';
import { HiInboxStack } from 'react-icons/hi2';

export default function AdminCoursesPage() {
   const { data: courses, isLoading, error } = useCourses();
   const { mutate: createCourse, isPending: isCreating } = useCreateCourse();
   const { mutate: updateCourse, isPending: isUpdating } = useUpdateCourse();
   const { mutate: deleteCourse, isPending: isDeleting } = useDeleteCourse();

   const [showForm, setShowForm] = useState(false);
   const [editingCourse, setEditingCourse] = useState<CourseResponse | null>(null);
   const [searchTerm, setSearchTerm] = useState('');
   const [category, setCategory] = useState('');

   const filteredCourses = useMemo(() => {
      if (!courses) return [];
      
      return courses.filter((course) => {
         const matchesSearch = searchTerm === '' || 
            course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.course_code.toLowerCase().includes(searchTerm.toLowerCase());
         
         const matchesCategory = category === '' || 
            course.course_code.toUpperCase().startsWith(category);
         
         return matchesSearch && matchesCategory;
      });
   }, [courses, searchTerm, category]);

   const handleClearFilters = () => {
      setSearchTerm('');
      setCategory('');
   };

   const handleCreate = (data: CourseFormData) => {
      createCourse(data, {
         onSuccess: () => {
            setShowForm(false);
         },
      });
   };

   const handleUpdate = (data: CourseFormData) => {
      if (!editingCourse) return;
      updateCourse(
         { courseCode: editingCourse.course_code, data },
         {
            onSuccess: () => {
               setEditingCourse(null);
            },
         }
      );
   };

   const handleDelete = (courseCode: string) => {
      if (confirm('Are you sure you want to delete this course?')) {
         deleteCourse(courseCode);
      }
   };

   const handleCancel = () => {
      setShowForm(false);
      setEditingCourse(null);
   };

   if (isLoading) {
      return (
         <div className="space-y-8 md:space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
               <div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Manage Courses</h1>
                  <p className="text-sm md:text-base text-muted-foreground mt-1">Create, edit, and delete courses</p>
               </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
               {[...Array(6)].map((_, i) => (
                  <CourseCardSkeleton key={i} />
               ))}
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="space-y-8 md:space-y-10">
            <div>
               <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Manage Courses</h1>
               <p className="text-sm md:text-base text-muted-foreground mt-1">Create, edit, and delete courses</p>
            </div>
            <p className="text-destructive">Failed to load courses. Please try again.</p>
         </div>
      );
   }

   return (
      <div className="h-full flex flex-col space-y-8 md:space-y-10">
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
               <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Manage Courses</h1>
               <p className="text-sm md:text-base text-muted-foreground mt-1">Create, edit, and delete courses</p>
            </div>
            {!showForm && !editingCourse && (
               <Button onClick={() => setShowForm(true)}>New Course</Button>
            )}
         </div>

         {showForm && (
            <CourseForm
               onSubmit={handleCreate}
               onCancel={handleCancel}
               isPending={isCreating}
            />
         )}

         {editingCourse && (
            <CourseForm
               course={editingCourse}
               onSubmit={handleUpdate}
               onCancel={handleCancel}
               isPending={isUpdating}
            />
         )}

         {!showForm && !editingCourse && (
            <>
               <CourseFilters
                  searchTerm={searchTerm}
                  category={category}
                  onSearchChange={setSearchTerm}
                  onCategoryChange={setCategory}
                  onClear={handleClearFilters}
               />

               <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                  {filteredCourses.length === 0 ? (
                     <div className="flex flex-col items-center justify-center py-16 px-4">
                        <div className="rounded-full bg-primary/10 p-6 mb-6 animate-pulse">
                           <HiInboxStack className="h-16 w-16 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                           {courses && courses.length > 0 ? 'No Courses Found' : 'No Courses Yet'}
                        </h3>
                        <p className="text-muted-foreground text-center max-w-md mb-6">
                           {courses && courses.length > 0
                              ? 'No courses match your current filters. Try adjusting your search criteria.'
                              : 'Get started by creating your first course. Click the "New Course" button above.'}
                        </p>
                     </div>
                  ) : (
                     <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 p-2">
                        {filteredCourses.map((course) => (
                           <CourseCard
                              key={course.id}
                              course={course}
                              action={
                                 <div className="flex gap-2">
                                    <Button
                                       variant="outline"
                                       size="sm"
                                       onClick={() => setEditingCourse(course)}
                                       disabled={isDeleting}
                                    >
                                       Edit
                                    </Button>
                                    <Button
                                       variant="destructive"
                                       size="sm"
                                       onClick={() => handleDelete(course.course_code)}
                                       disabled={isDeleting}
                                    >
                                       Delete
                                    </Button>
                                 </div>
                              }
                           />
                        ))}
                     </div>
                  )}
               </div>
            </>
         )}
      </div>
   );
}
