import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import MainLayout from '@/components/MainLayout';
import useAuthStore from '@/features/auth/store/authStore';

const LoginPage          = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage       = lazy(() => import('@/features/auth/pages/RegisterPage'));
const DashboardPage      = lazy(() => import('@/features/student/pages/DashboardPage'));
const CoursesPage        = lazy(() => import('@/features/courses/pages/CoursesPage'));
const AdminDashboardPage = lazy(() => import('@/features/admin/pages/AdminDashboardPage'));
const AdminCoursesPage   = lazy(() => import('@/features/admin/pages/AdminCoursesPage'));
const AdminStudentsPage  = lazy(() => import('@/features/admin/pages/AdminStudentsPage'));

function RootRedirect() {
   const role = useAuthStore((s) => s.role);
   if (role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
   if (role === 'STUDENT') return <Navigate to="/student/dashboard" replace />;
   return <Navigate to="/login" replace />;
}

const fallback = <div className="flex h-screen items-center justify-center">Loading...</div>;

const router = createBrowserRouter([
   {
      path: '/',
      element: <RootRedirect />,
   },
   {
      path: '/login',
      element: <Suspense fallback={fallback}><LoginPage /></Suspense>,
   },
   {
      path: '/register',
      element: <Suspense fallback={fallback}><RegisterPage /></Suspense>,
   },
   {
      element: <ProtectedRoute allowedRole="STUDENT" />,
      children: [
         {
            element: <MainLayout />,
            children: [
               {
                  path: '/student/dashboard',
                  element: <Suspense fallback={fallback}><DashboardPage /></Suspense>,
               },
               {
                  path: '/courses',
                  element: <Suspense fallback={fallback}><CoursesPage /></Suspense>,
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
                  element: <Suspense fallback={fallback}><AdminDashboardPage /></Suspense>,
               },
               {
                  path: '/admin/courses',
                  element: <Suspense fallback={fallback}><AdminCoursesPage /></Suspense>,
               },
               {
                  path: '/admin/students',
                  element: <Suspense fallback={fallback}><AdminStudentsPage /></Suspense>,
               },
            ],
         },
      ],
   },
]);

export default router;
