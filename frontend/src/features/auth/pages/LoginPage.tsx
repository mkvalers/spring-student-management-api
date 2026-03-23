import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const loginSchema = z.object({
   email: z.string().email('Invalid email address'),
   password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
   const { mutate: login, isPending, error } = useLogin();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
   });

   const onSubmit = (data: LoginFormData) => {
      login(data);
   };

   return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
         <Card className="w-full max-w-md">
            <CardHeader>
               <CardTitle className="text-2xl">Login</CardTitle>
               <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
               <CardContent className="space-y-4">
                  {error && (
                     <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                        {error.message || 'Login failed. Please check your credentials.'}
                     </div>
                  )}
                  <div className="space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        {...register('email')}
                     />
                     {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                     )}
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="password">Password</Label>
                     <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register('password')}
                     />
                     {errors.password && (
                        <p className="text-sm text-destructive">{errors.password.message}</p>
                     )}
                  </div>
               </CardContent>
               <CardFooter className="flex flex-col gap-4">
                  <Button type="submit" className="w-full" disabled={isPending}>
                     {isPending ? 'Logging in...' : 'Login'}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                     Don't have an account?{' '}
                     <Link to="/register" className="text-primary hover:underline">
                        Register
                     </Link>
                  </p>
               </CardFooter>
            </form>
         </Card>
      </div>
   );
}
