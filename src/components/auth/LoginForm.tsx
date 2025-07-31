import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FcGoogle } from 'react-icons/fc';

export const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { login, loginWithGoogle } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setError('');
      setLoading(true);
      await login(data.email, data.password);
      onSuccess();
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // The main container for the form
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6 border border-black">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-black">Welcome back</h2>
        <p className="text-black/80">Enter your credentials to access your account</p>
      </div>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <div className="space-y-4">
        {/* Google Login Button */}
        <Button 
          type="button" 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 border-black text-black hover:bg-black hover:text-white"
          onClick={async () => {
            try {
              setLoading(true);
              await loginWithGoogle();
              onSuccess();
            } catch (error) {
              setError('Failed to sign in with Google. Please try again.');
              console.error(error);
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
        >
          <FcGoogle className="h-5 w-5" />
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-black" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-black">
              Or continue with
            </span>
          </div>
        </div>

        {/* Email and Password Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-black">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="border-black text-black"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-black">Password</Label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="border-black text-black"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message as string}</p>}
          </div>
          <Button type="submit" className="w-full bg-black text-white hover:bg-black/80" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In with Email'}
          </Button>
        </form>
      </div>
    </div>
  );
};