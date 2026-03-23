import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';

const registerSchema = z.object({
   email: z.string().email('Invalid email address'),
   password: z.string().min(6, 'Password must be at least 6 characters'),
   first_name: z.string().min(1, 'First name is required'),
   last_name: z.string().min(1, 'Last name is required'),
   year_level: z
      .number()
      .min(1, 'Year level must be 1-4')
      .max(4, 'Year level must be 1-4'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
   const { mutate: register, isPending, error, isSuccess } = useRegister();
   const {
      register: registerField,
      handleSubmit,
      formState: { errors },
   } = useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema),
   });

   const onSubmit = (data: RegisterFormData) => {
      register(data);
   };

   return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
         <Card className="w-full max-w-md">
            <CardHeader>
               <CardTitle className="text-2xl">Register</CardTitle>
               <CardDescription>Create a new student account</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
               <CardContent className="space-y-4">
                  {error && (
                     <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                        {error.message ||
                           'Registration failed. Please try again.'}
                     </div>
                  )}
                  {isSuccess && (
                     <div className="rounded-md bg-green-500/10 p-3 text-sm text-green-600">
                        Registration successful! Redirecting to login...
                     </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                           id="first_name"
                           placeholder="John"
                           {...registerField('first_name')}
                        />
                        {errors.first_name && (
                           <p className="text-sm text-destructive">
                              {errors.first_name.message}
                           </p>
                        )}
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                           id="last_name"
                           placeholder="Doe"
                           {...registerField('last_name')}
                        />
                        {errors.last_name && (
                           <p className="text-sm text-destructive">
                              {errors.last_name.message}
                           </p>
                        )}
                     </div>
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        {...registerField('email')}
                     />
                     {errors.email && (
                        <p className="text-sm text-destructive">
                           {errors.email.message}
                        </p>
                     )}
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="password">Password</Label>
                     <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...registerField('password')}
                     />
                     {errors.password && (
                        <p className="text-sm text-destructive">
                           {errors.password.message}
                        </p>
                     )}
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="year_level">Year Level (1-4)</Label>
                     <Input
                        id="year_level"
                        type="number"
                        min="1"
                        max="4"
                        placeholder="1"
                        {...registerField('year_level')}
                     />
                     {errors.year_level && (
                        <p className="text-sm text-destructive">
                           {errors.year_level.message}
                        </p>
                     )}
                  </div>
               </CardContent>
               <CardFooter className="flex flex-col gap-4">
                  <Button type="submit" className="w-full" disabled={isPending}>
                     {isPending ? 'Registering...' : 'Register'}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                     Already have an account?{' '}
                     <Link to="/login" className="text-primary hover:underline">
                        Login
                     </Link>
                  </p>
               </CardFooter>
            </form>
         </Card>
      </div>
   );
}
