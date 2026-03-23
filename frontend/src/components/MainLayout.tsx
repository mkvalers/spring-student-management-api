import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/features/auth/store/authStore';
import { cn } from '@/lib/utils';

const studentLinks = [
   { to: '/student/dashboard', label: 'Dashboard' },
   { to: '/courses', label: 'Courses' },
];

const adminLinks = [
   { to: '/admin/dashboard', label: 'Dashboard' },
   { to: '/admin/courses', label: 'Courses' },
   { to: '/admin/students', label: 'Students' },
];

const MainLayout = () => {
   const { role, user, clearAuth } = useAuthStore();
   const navigate = useNavigate();

   const links = role === 'ADMIN' ? adminLinks : studentLinks;

   const handleLogout = () => {
      clearAuth();
      navigate('/login', { replace: true });
   };

   return (
      <div className="min-h-screen grid grid-rows-[auto_1fr] grid-cols-1 md:grid-cols-[220px_1fr]">
         <header className="md:col-span-2 flex items-center justify-between px-6 py-3 border-b border-foreground/10 bg-card">
            <span className="font-semibold text-sm">Student Management</span>
            <div className="flex items-center gap-3">
               {user && <span className="text-sm text-muted-foreground">{'name' in user ? user.name : user.email}</span>}
               <Badge variant="outline">{role}</Badge>
               <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
            </div>
         </header>

         <aside className="hidden md:flex flex-col gap-1 px-3 py-4 border-r border-foreground/10 bg-card">
            {links.map(({ to, label }) => (
               <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                     cn(
                        'rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted',
                        isActive ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground'
                     )
                  }
               >
                  {label}
               </NavLink>
            ))}
         </aside>

         <main className="p-6 overflow-auto">
            <Outlet />
         </main>
      </div>
   );
};

export default MainLayout;
