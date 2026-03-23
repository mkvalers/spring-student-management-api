import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRegister } from '@/features/auth/hooks/useAuth';

const schema = z.object({
   email: z.string().email('Invalid email format.'),
   password: z.string().min(8, 'Password must be at least 8 characters.').max(21, 'Password must not exceed 21 characters.'),
   first_name: z.string().min(1, 'First name is required.').max(50, 'First name must not exceed 50 characters.'),
   last_name: z.string().min(1, 'Last name is required.').max(50, 'Last name must not exceed 50 characters.'),
   year_level: z.number().min(1, 'Year level must be at least 1.').max(4, 'Year level must be at most 4.'),
});

type RegisterFormValues = z.infer<typeof schema>;

const RegisterPage = () => {
   const { mutate: register_, isPending, error } = useRegister();

   const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
      resolver: zodResolver(schema),
   });

   const onSubmit = (data: RegisterFormValues) => register_(data);

   return (
      <div className="flex min-h-screen items-center justify-center">
         <Card className="w-full max-w-sm">
            <CardHeader>
               <CardTitle>Create an account</CardTitle>
            </CardHeader>
            <CardContent>
               <form id="register-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                     <div className="flex flex-col gap-1.5">
                        <Label htmlFor="first_name">First name</Label>
                        <Input id="first_name" placeholder="John" {...register('first_name')} />
                        {errors.first_name && <p className="text-xs text-destructive">{errors.first_name.message}</p>}
                     </div>
                     <div className="flex flex-col gap-1.5">
                        <Label htmlFor="last_name">Last name</Label>
                        <Input id="last_name" placeholder="Doe" {...register('last_name')} />
                        {errors.last_name && <p className="text-xs text-destructive">{errors.last_name.message}</p>}
                     </div>
                  </div>
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
                  <div className="flex flex-col gap-1.5">
                     <Label htmlFor="year_level">Year level</Label>
                     <Input id="year_level" type="number" min={1} max={4} placeholder="1 – 4" {...register('year_level', { valueAsNumber: true })} />
                     {errors.year_level && <p className="text-xs text-destructive">{errors.year_level.message}</p>}
                  </div>
                  {error && <p className="text-xs text-destructive">Registration failed. Please try again.</p>}
               </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
               <Button type="submit" form="register-form" className="w-full" disabled={isPending}>
                  {isPending ? 'Creating account...' : 'Create account'}
               </Button>
               <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary underline-offset-4 hover:underline">
                     Sign in
                  </Link>
               </p>
            </CardFooter>
         </Card>
      </div>
   );
};

export default RegisterPage;
