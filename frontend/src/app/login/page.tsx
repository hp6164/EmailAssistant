"use client"

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';

interface InputFieldProps {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  placeholder: string;
}

interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <div className="bg-slate-100 min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-emerald-800 mb-6 text-center">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            id="email"
            type="email"
            label="Email Address"
            value={email}
            onChange={setEmail}
            icon={<FiMail />}
            placeholder="you@example.com"
          />
          <PasswordField
            value={password}
            onChange={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <SubmitButton />
        </form>
        <SignUpPrompt />
      </motion.div>
    </div>
  );
};

const InputField: React.FC<InputFieldProps> = ({ id, type, label, value, onChange, icon, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 pl-10"
        placeholder={placeholder}
      />
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </span>
    </div>
  </div>
);

const PasswordField: React.FC<PasswordFieldProps> = ({ value, onChange, showPassword, setShowPassword }) => (
  <div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
      Password
    </label>
    <div className="relative">
      <input
        id="password"
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 pl-10 pr-10"
        placeholder="••••••••"
      />
      <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      >
        {showPassword ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  </div>
);

const SubmitButton: React.FC = () => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    type="submit"
    className="w-full bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-emerald-600 transition-colors"
  >
    Sign In
  </motion.button>
);

const SignUpPrompt: React.FC = () => (
  <p className="mt-4 text-center text-sm text-gray-600">
    Dont have an account?{' '}
    <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
      Sign up
    </a>
  </p>
);

export default LoginPage;