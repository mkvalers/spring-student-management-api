import apiClient from '@/api/apiClient';
import type { StudentResponse, EnrollmentResponse, EnrollmentDto } from '@/types';

export interface UpdateProfileRequest {
   email: string;
   password: string;
}

const USERS_URL = '/users';
const ENROLLMENTS_URL = '/enrollments';

const studentService = {
   getMyProfile: () =>
      apiClient.get<StudentResponse>(`${USERS_URL}/me`).then((r) => r.data),

   getMyEnrollments: () =>
      apiClient.get<EnrollmentResponse[]>(`${ENROLLMENTS_URL}/me`).then((r) => r.data),

   enrollCourse: (course_id: number) =>
      apiClient.post<EnrollmentDto>(ENROLLMENTS_URL, { course_id }).then((r) => r.data),

   dropCourse: (enrollmentId: number) =>
      apiClient.delete(`${ENROLLMENTS_URL}/${enrollmentId}`),

   updateProfile: (data: UpdateProfileRequest) =>
      apiClient.put(`${USERS_URL}/me`, data),
};

export default studentService;
