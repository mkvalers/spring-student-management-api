import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLogin } from '@/features/auth/hooks/useAuth';

const schema = z.object({
   email: z.string().email('Invalid email format.'),
   password: z.string().min(8, 'Password must be at least 8 characters.').max(21, 'Password must not exceed 21 characters.'),
});

type LoginFormValues = z.infer<typeof schema>;

const LoginPage = () => {
   const { mutate: login, isPending, error } = useLogin();

   const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
      resolver: zodResolver(schema),
   });

   const onSubmit = (data: LoginFormValues) => login(data);

   return (
      <div className="flex min-h-screen items-center justify-center">
         <Card className="w-full max-w-sm">
            <CardHeader>
               <CardTitle>Sign in</CardTitle>
            </CardHeader>
            <CardContent>
               <form id="login-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                     <Label htmlFor="email">Email</Label>
                     <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
                     {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                     <Label htmlFor="password">Password</Label>
                     <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
                     {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                  </div>
                  {error && <p className="text-xs text-destructive">Invalid email or password.</p>}
               </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
               <Button type="submit" form="login-form" className="w-full" disabled={isPending}>
                  {isPending ? 'Signing in...' : 'Sign in'}
               </Button>
               <p className="text-sm text-muted-foreground">
                  No account?{' '}
                  <Link to="/register" className="text-primary underline-offset-4 hover:underline">
                     Register
                  </Link>
               </p>
            </CardFooter>
         </Card>
      </div>
   );
};

export default LoginPage;
