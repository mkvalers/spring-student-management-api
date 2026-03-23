import { useQuery } from '@tanstack/react-query';
import studentService from '@/features/student/services/studentService';

const useStudentProfile = () =>
   useQuery({
      queryKey: ['student', 'profile'],
      queryFn: studentService.getMyProfile,
   });

export default useStudentProfile;
