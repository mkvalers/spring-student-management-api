import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import MainLayout from '@/components/MainLayout';
import useAuthStore from '@/features/auth/store/authStore';

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'));
const DashboardPage = lazy(
   () => import('@/features/student/pages/DashboardPage')
);
const CoursesPage = lazy(() => import('@/features/courses/pages/CoursesPage'));
const AdminDashboardPage = lazy(
   () => import('@/features/admin/pages/AdminDashboardPage')
);
const AdminCoursesPage = lazy(
   () => import('@/features/admin/pages/AdminCoursesPage')
);
const AdminStudentsPage = lazy(
   () => import('@/features/admin/pages/AdminStudentsPage')
);

function RootRedirect() {
   const role = useAuthStore((s) => s.role);
   if (role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
   if (role === 'STUDENT') return <Navigate to="/student/dashboard" replace />;
   return <Navigate to="/login" replace />;
}

const fallback = (
   <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
         <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
         <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
   </div>
);

const router = createBrowserRouter([
   {
      path: '/',
      element: <RootRedirect />,
   },
   {
      path: '/login',
      element: (
         <Suspense fallback={fallback}>
            <LoginPage />
         </Suspense>
      ),
   },
   {
      path: '/register',
      element: (
         <Suspense fallback={fallback}>
            <RegisterPage />
         </Suspense>
      ),
   },
   {
      element: <ProtectedRoute allowedRole="STUDENT" />,
      children: [
         {
            element: <MainLayout />,
            children: [
               {
                  path: '/student/dashboard',
                  element: <DashboardPage />,
               },
               {
                  path: '/courses',
                  element: <CoursesPage />,
               },
            ],
         },
      ],
   },
   {
      element: <ProtectedRoute allowedRole="ADMIN" />,
      children: [
         {
            element: <MainLayout />,
            children: [
               {
                  path: '/admin/dashboard',
                  element: <AdminDashboardPage />,
               },
               {
                  path: '/admin/courses',
                  element: <AdminCoursesPage />,
               },
               {
                  path: '/admin/students',
                  element: <AdminStudentsPage />,
               },
            ],
         },
      ],
   },
]);

export default router;
