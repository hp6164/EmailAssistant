"use client"

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';

// LoginPage component
interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  error: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back!</h1>
            <p className="text-center text-gray-600 mb-8">Sign in to your account</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 pl-10 text-black"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 pl-10 pr-10 text-black"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-900"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg shadow-md hover:from-emerald-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75 transition-all duration-300"
              >
                Sign In
              </motion.button>
            </form>
          </div>
          <div className="py-4 bg-gray-50 text-center">
            <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
              Forgot your password?
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Authentication HOC
export const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
          router.push('/login');
        } else {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

// Logout function
export const handleLogout = (router: ReturnType<typeof useRouter>) => {
  localStorage.removeItem('isLoggedIn');
  router.push('/login');
};

// LoginPageWrapper component
const LoginPageWrapper: React.FC = () => {
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleLogin = (email: string, password: string) => {
    if (!email || !password) {
      setError('Please fill in all fields');
    } else {
      setError('');
      // Simulate successful login
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/');
    }
  };

  return (
    <LoginPage onLogin={handleLogin} error={error} />
  );
};

export default LoginPageWrapper;