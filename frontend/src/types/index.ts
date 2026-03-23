export type Role = 'STUDENT' | 'ADMIN';

export interface StudentResponse {
   id: number;
   email: string;
   name: string;
   year_level: number;
   created_at: string;
}

export interface StudentDto {
   id: number;
   full_name: string;
   year_level: number;
}

export interface CourseResponse {
   id: number;
   course_code: string;
   course_name: string;
   units: number;
   students?: StudentResponse[];
}

export interface EnrollmentResponse {
   enrollment_id: number;
   course_id: number;
   course_name: string;
}

export interface EnrollmentDto {
   student_name: string;
   course_name: string;
}

export interface AdminResponse {
   id: string;
   email: string;
   created_at: string;
}

export interface RegistrationResponse {
   id: string;
   email: string;
   firstName: string;
   lastName: string;
}

export interface JwtResponse {
   token: string;
}
