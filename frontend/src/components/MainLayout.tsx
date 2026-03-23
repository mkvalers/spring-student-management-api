import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { HiChartBar, HiBookOpen, HiUsers } from 'react-icons/hi2';
import useAuthStore from '@/features/auth/store/authStore';

export default function MainLayout() {
   const { role, user, clearAuth } = useAuthStore();
   const navigate = useNavigate();
   const location = useLocation();
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   const handleLogout = () => {
      clearAuth();
      navigate('/login');
   };

   // Generate user initials from email
   const getInitials = (email: string | undefined) => {
      if (!email) return 'U';
      return email.charAt(0).toUpperCase();
   };

   // Generate avatar color from email
   const getAvatarColor = (email: string | undefined) => {
      if (!email) return 'bg-primary';
      const colors = [
         'bg-blue-500',
         'bg-purple-500',
         'bg-pink-500',
         'bg-green-500',
         'bg-yellow-500',
         'bg-indigo-500',
         'bg-red-500',
         'bg-teal-500',
      ];
      const hash = email
         .split('')
         .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return colors[hash % colors.length];
   };

   const studentLinks = [
      { to: '/student/dashboard', label: 'Dashboard', icon: HiChartBar },
      { to: '/courses', label: 'Courses', icon: HiBookOpen },
   ];

   const adminLinks = [
      { to: '/admin/dashboard', label: 'Dashboard', icon: HiChartBar },
      { to: '/admin/courses', label: 'Courses', icon: HiBookOpen },
      { to: '/admin/students', label: 'Students', icon: HiUsers },
   ];

   const links = role === 'ADMIN' ? adminLinks : studentLinks;

   return (
      <div className="flex h-screen bg-background">
         {/* Mobile Backdrop */}
         {isSidebarOpen && (
            <div
               className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
               onClick={() => setIsSidebarOpen(false)}
            />
         )}

         {/* Sidebar */}
         <aside
            className={`fixed md:static inset-y-0 left-0 z-50 w-64 border-r border-border bg-sidebar transition-transform duration-300 md:translate-x-0 ${
               isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
         >
            <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
               <h1 className="text-lg font-semibold text-sidebar-foreground">
                  Student Management
               </h1>
               <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="md:hidden text-sidebar-foreground hover:text-sidebar-accent-foreground"
                  aria-label="Close menu"
               >
                  <HiX className="h-6 w-6" />
               </button>
            </div>
            <nav className="space-y-1 p-4">
               {links.map((link) => {
                  const isActive = location.pathname === link.to;
                  const Icon = link.icon;
                  return (
                     <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                           isActive
                              ? 'bg-linear-to-r from-primary/10 to-accent/10 text-primary shadow-sm'
                              : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        }`}
                     >
                        {isActive && (
                           <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-primary" />
                        )}
                        <Icon
                           className={`h-5 w-5 transition-transform duration-200 ${
                              isActive ? 'scale-110' : 'group-hover:scale-110'
                           }`}
                        />
                        <span>{link.label}</span>
                     </Link>
                  );
               })}
            </nav>
         </aside>

         {/* Main Content */}
         <div className="flex flex-1 flex-col relative">
            {/* Decorative Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
               <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
               <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/5 to-primary/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>
            {/* Header */}
            <header className="flex h-16 items-center justify-between border-b-2 border-gradient-to-r from-primary/20 to-accent/20 bg-card px-4 md:px-6">
               <div className="flex items-center gap-2 md:gap-3">
                  <button
                     onClick={() => setIsSidebarOpen(true)}
                     className="md:hidden text-foreground hover:text-primary"
                     aria-label="Open menu"
                  >
                     <HiMenu className="h-6 w-6" />
                  </button>
                  {/* Avatar */}
                  <div
                     className={`flex h-8 w-8 items-center justify-center rounded-full text-white text-sm font-semibold ${getAvatarColor(user?.email)}`}
                  >
                     {getInitials(user?.email)}
                  </div>
                  <span className="text-xs md:text-sm text-muted-foreground truncate max-w-30 sm:max-w-none">
                     {user?.email || 'User'}
                  </span>
                  {/* Gradient Role Badge */}
                  <span className="inline-flex items-center rounded-full bg-linear-to-r from-primary/10 to-accent/10 px-3 py-1 text-xs font-medium text-primary">
                     {role}
                  </span>
               </div>
               {/* Ghost Logout Button */}
               <button
                  onClick={handleLogout}
                  className="rounded-md px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-muted-foreground transition-colors hover:text-destructive hover:bg-destructive/10"
               >
                  Logout
               </button>
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-auto p-4 md:p-6 relative z-10">
               <Outlet />
            </main>
         </div>
      </div>
   );
}
