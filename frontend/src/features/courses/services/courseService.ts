import apiClient from '@/api/apiClient';
import type { CourseResponse } from '@/types';

export interface CreateCourseRequest {
   course_code: string;
   course_name: string;
   units: number;
}

export interface UpdateCourseRequest {
   course_code: string;
   course_name: string;
   units: number;
}

const BASE_URL = '/courses';

const courseService = {
   getAllCourses: () =>
      apiClient.get<CourseResponse[]>(BASE_URL).then((r) => r.data),

   getCourse: (courseCode: string) =>
      apiClient.get<CourseResponse>(`${BASE_URL}/${courseCode}`).then((r) => r.data),

   createCourse: (data: CreateCourseRequest) =>
      apiClient.post<CourseResponse>(BASE_URL, data).then((r) => r.data),

   updateCourse: (courseCode: string, data: UpdateCourseRequest) =>
      apiClient.put(`${BASE_URL}/${courseCode}`, data).then((r) => r.data),

   deleteCourse: (courseCode: string) =>
      apiClient.delete(`${BASE_URL}/${courseCode}`),
};

export default courseService;
