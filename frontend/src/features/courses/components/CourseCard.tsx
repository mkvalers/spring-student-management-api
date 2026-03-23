import type { CourseResponse } from '@/types';
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import {
   HiCodeBracket,
   HiCalculator,
   HiBeaker,
   HiBookOpen,
   HiAcademicCap,
} from 'react-icons/hi2';

interface CourseCardProps {
   course: CourseResponse;
   action?: React.ReactNode;
}

const getCourseIcon = (courseCode: string) => {
   const code = courseCode.toUpperCase();
   if (code.startsWith('CS')) return HiCodeBracket;
   if (code.startsWith('MATH')) return HiCalculator;
   if (
      code.startsWith('CHEM') ||
      code.startsWith('BIO') ||
      code.startsWith('PHYS')
   )
      return HiBeaker;
   if (code.startsWith('ENG')) return HiBookOpen;
   if (code.startsWith('HIST')) return HiAcademicCap;
   return HiBookOpen;
};

const getCategoryColor = (courseCode: string) => {
   const code = courseCode.toUpperCase();
   if (code.startsWith('CS')) return 'border-l-blue-500';
   if (code.startsWith('MATH')) return 'border-l-purple-500';
   if (
      code.startsWith('CHEM') ||
      code.startsWith('BIO') ||
      code.startsWith('PHYS')
   )
      return 'border-l-green-500';
   if (code.startsWith('ENG')) return 'border-l-orange-500';
   if (code.startsWith('HIST')) return 'border-l-amber-500';
   return 'border-l-gray-500';
};

export default function CourseCard({ course, action }: CourseCardProps) {
   const Icon = getCourseIcon(course.course_code);
   const categoryColor = getCategoryColor(course.course_code);

   return (
      <Card
         className={`transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-l-4 ${categoryColor} rounded-xl`}
      >
         <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
               <div className="flex-1">
                  <CardTitle className="text-xl font-bold tracking-tight">
                     {course.course_name}
                  </CardTitle>
                  <CardDescription className="font-mono text-xs mt-1.5">
                     {course.course_code}
                  </CardDescription>
               </div>
               <div className="text-primary/70">
                  <Icon className="h-6 w-6" />
               </div>
            </div>
         </CardHeader>
         <CardContent className="pb-4">
            <div className="flex items-center gap-2">
               <span className="inline-flex items-center rounded-full bg-linear-to-r from-primary/10 to-accent/10 px-3 py-1 text-xs font-medium text-primary">
                  {course.units} {course.units === 1 ? 'Unit' : 'Units'}
               </span>
            </div>
         </CardContent>
         {action && <CardFooter>{action}</CardFooter>}
      </Card>
   );
}
