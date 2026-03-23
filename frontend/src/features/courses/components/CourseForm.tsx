import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import type { CourseResponse } from '@/types';

const courseSchema = z.object({
   course_code: z
      .string()
      .min(1, 'Course code is required')
      .max(20, 'Course code too long'),
   course_name: z
      .string()
      .min(1, 'Course name is required')
      .max(100, 'Course name too long'),
   units: z.number().min(1, 'Units must be 1-6').max(6, 'Units must be 1-6'),
});

export type CourseFormData = z.infer<typeof courseSchema>;

interface CourseFormProps {
   course?: CourseResponse;
   onSubmit: (data: CourseFormData) => void;
   onCancel: () => void;
   isPending?: boolean;
   title?: string;
}

export default function CourseForm({
   course,
   onSubmit,
   onCancel,
   isPending,
   title,
}: CourseFormProps) {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<CourseFormData>({
      resolver: zodResolver(courseSchema),
      defaultValues: course
         ? {
              course_code: course.course_code,
              course_name: course.course_name,
              units: course.units,
           }
         : undefined,
   });

   return (
      <Card>
         <CardHeader>
            <CardTitle>
               {title || (course ? 'Edit Course' : 'Create New Course')}
            </CardTitle>
         </CardHeader>
         <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="course_code">Course Code</Label>
                  <Input
                     id="course_code"
                     placeholder="CS101"
                     disabled={!!course}
                     {...register('course_code')}
                  />
                  {errors.course_code && (
                     <p className="text-sm text-destructive">
                        {errors.course_code.message}
                     </p>
                  )}
               </div>
               <div className="space-y-2">
                  <Label htmlFor="course_name">Course Name</Label>
                  <Input
                     id="course_name"
                     placeholder="Introduction to Computer Science"
                     {...register('course_name')}
                  />
                  {errors.course_name && (
                     <p className="text-sm text-destructive">
                        {errors.course_name.message}
                     </p>
                  )}
               </div>
               <div className="space-y-2">
                  <Label htmlFor="units">Units (1-6)</Label>
                  <Input
                     id="units"
                     type="number"
                     min="1"
                     max="6"
                     placeholder="3"
                     {...register('units')}
                  />
                  {errors.units && (
                     <p className="text-sm text-destructive">
                        {errors.units.message}
                     </p>
                  )}
               </div>
            </CardContent>
            <CardFooter className="flex gap-2">
               <Button type="submit" disabled={isPending}>
                  {isPending
                     ? 'Saving...'
                     : course
                       ? 'Update Course'
                       : 'Create Course'}
               </Button>
               <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isPending}
               >
                  Cancel
               </Button>
            </CardFooter>
         </form>
      </Card>
   );
}
