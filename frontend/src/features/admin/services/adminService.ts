import apiClient from '@/api/apiClient';
import type { AdminResponse, StudentResponse, StudentDto } from '@/types';

export interface StudentFilters {
   firstName?: string;
   lastName?: string;
   yearLevel?: number;
   page?: number;
   size?: number;
}

const USERS_URL = '/users';
const STUDENTS_URL = '/students';

const adminService = {
   getAdminProfile: () =>
      apiClient.get<AdminResponse>(`${USERS_URL}/admin/me`).then((r) => r.data),

   updateAdminPassword: (password: string) =>
      apiClient.put(`${USERS_URL}/admin/me`, { password }),

   getAllStudents: (filters: StudentFilters = {}) =>
      apiClient.get<StudentDto[]>(STUDENTS_URL, { params: filters }).then((r) => r.data),

   getStudentById: (id: number) =>
      apiClient.get<StudentResponse>(`${STUDENTS_URL}/${id}`).then((r) => r.data),
};

export default adminService;
