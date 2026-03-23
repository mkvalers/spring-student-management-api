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
import { HiCodeBracket, HiAcademicCap } from 'react-icons/hi2';

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
      <Card className="bg-gradient-to-br from-card to-muted/20 border-2">
         <CardHeader className="space-y-1">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  {course ? <HiCodeBracket className="h-5 w-5 text-primary" /> : <HiAcademicCap className="h-5 w-5 text-primary" />}
               </div>
               <CardTitle className="text-xl tracking-tight">
                  {title || (course ? 'Edit Course' : 'Create New Course')}
               </CardTitle>
            </div>
         </CardHeader>
         <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-5">
               <div className="space-y-2">
                  <Label htmlFor="course_code" className="text-sm font-medium">Course Code</Label>
                  <Input
                     id="course_code"
                     placeholder="CS101"
                     disabled={!!course}
                     className="h-11 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-primary/20"
                     {...register('course_code')}
                  />
                  {errors.course_code && (
                     <p className="text-sm text-destructive">
                        {errors.course_code.message}
                     </p>
                  )}
               </div>
               <div className="space-y-2">
                  <Label htmlFor="course_name" className="text-sm font-medium">Course Name</Label>
                  <Input
                     id="course_name"
                     placeholder="Introduction to Computer Science"
                     className="h-11 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-primary/20"
                     {...register('course_name')}
                  />
                  {errors.course_name && (
                     <p className="text-sm text-destructive">
                        {errors.course_name.message}
                     </p>
                  )}
               </div>
               <div className="space-y-2">
                  <Label htmlFor="units" className="text-sm font-medium">Units (1-6)</Label>
                  <Input
                     id="units"
                     type="number"
                     min="1"
                     max="6"
                     placeholder="3"
                     className="h-11 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-primary/20"
                     {...register('units', { valueAsNumber: true })}
                  />
                  {errors.units && (
                     <p className="text-sm text-destructive">
                        {errors.units.message}
                     </p>
                  )}
               </div>
            </CardContent>
            <CardFooter className="flex gap-3 pt-2">
               <Button type="submit" disabled={isPending} className="h-11">
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
                  className="h-11"
               >
                  Cancel
               </Button>
            </CardFooter>
         </form>
      </Card>
   );
}
