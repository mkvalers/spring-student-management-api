import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import courseService, { type CreateCourseRequest, type UpdateCourseRequest } from '../services/courseService';

export function useCourses() {
   return useQuery({
      queryKey: ['courses'],
      queryFn: courseService.getAllCourses,
   });
}

export function useCreateCourse() {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (data: CreateCourseRequest) => courseService.createCourse(data),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['courses'] });
      },
   });
}

export function useUpdateCourse() {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({ courseCode, data }: { courseCode: string; data: UpdateCourseRequest }) =>
         courseService.updateCourse(courseCode, data),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['courses'] });
      },
   });
}

export function useDeleteCourse() {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (courseCode: string) => courseService.deleteCourse(courseCode),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['courses'] });
      },
   });
}
