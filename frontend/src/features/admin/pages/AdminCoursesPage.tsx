import { useState } from 'react';
import { useCourses, useCreateCourse, useUpdateCourse, useDeleteCourse } from '@/features/courses/hooks/useCourses';
import CourseCard from '@/features/courses/components/CourseCard';
import CourseForm, { type CourseFormData } from '@/features/courses/components/CourseForm';
import { Button } from '@/components/ui/button';
import type { CourseResponse } from '@/types';

export default function AdminCoursesPage() {
   const { data: courses, isLoading, error } = useCourses();
   const { mutate: createCourse, isPending: isCreating } = useCreateCourse();
   const { mutate: updateCourse, isPending: isUpdating } = useUpdateCourse();
   const { mutate: deleteCourse, isPending: isDeleting } = useDeleteCourse();

   const [showForm, setShowForm] = useState(false);
   const [editingCourse, setEditingCourse] = useState<CourseResponse | null>(null);

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
         <div className="space-y-6">
            <div>
               <h1 className="text-3xl font-bold">Manage Courses</h1>
               <p className="text-muted-foreground">Create, edit, and delete courses</p>
            </div>
            <p className="text-muted-foreground">Loading courses...</p>
         </div>
      );
   }

   if (error) {
      return (
         <div className="space-y-6">
            <div>
               <h1 className="text-3xl font-bold">Manage Courses</h1>
               <p className="text-muted-foreground">Create, edit, and delete courses</p>
            </div>
            <p className="text-destructive">Failed to load courses. Please try again.</p>
         </div>
      );
   }

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold">Manage Courses</h1>
               <p className="text-muted-foreground">Create, edit, and delete courses</p>
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
               {courses?.map((course) => (
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
   );
}
