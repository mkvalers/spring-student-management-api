import { Outlet, Link, useNavigate } from 'react-router-dom';
import useAuthStore from '@/features/auth/store/authStore';

export default function MainLayout() {
   const { role, user, clearAuth } = useAuthStore();
   const navigate = useNavigate();

   const handleLogout = () => {
      clearAuth();
      navigate('/login');
   };

   const studentLinks = [
      { to: '/student/dashboard', label: 'Dashboard' },
      { to: '/courses', label: 'Courses' },
   ];

   const adminLinks = [
      { to: '/admin/dashboard', label: 'Dashboard' },
      { to: '/admin/courses', label: 'Courses' },
      { to: '/admin/students', label: 'Students' },
   ];

   const links = role === 'ADMIN' ? adminLinks : studentLinks;

   return (
      <div className="flex h-screen bg-background">
         {/* Sidebar */}
         <aside className="w-64 border-r border-border bg-sidebar">
            <div className="flex h-16 items-center border-b border-sidebar-border px-6">
               <h1 className="text-lg font-semibold text-sidebar-foreground">
                  Student Management
               </h1>
            </div>
            <nav className="space-y-1 p-4">
               {links.map((link) => (
                  <Link
                     key={link.to}
                     to={link.to}
                     className="block rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                     {link.label}
                  </Link>
               ))}
            </nav>
         </aside>

         {/* Main Content */}
         <div className="flex flex-1 flex-col">
            {/* Header */}
            <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
               <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                     {user?.email || 'User'}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                     {role}
                  </span>
               </div>
               <button
                  onClick={handleLogout}
                  className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-destructive/90"
               >
                  Logout
               </button>
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-auto p-6">
               <Outlet />
            </main>
         </div>
      </div>
   );
}
