import { LogIn, GraduationCap } from 'lucide-react';
import { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6d3] via-white to-[#e8d4bf] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="mb-4">
              <GraduationCap className="w-16 h-16 text-[#ae8c5e]" />
            </div>
            <h1 
              className="text-4xl font-bold bg-gradient-to-r from-[#ae8c5e] to-[#8b6f4a] bg-clip-text text-transparent"
            >
              ORZU
            </h1>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Continue your learning journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email / Username
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ae8c5e] focus:border-transparent outline-none transition"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ae8c5e] focus:border-transparent outline-none transition"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="button"
              className="text-sm text-[#ae8c5e] hover:text-[#8b6f4a] transition"
            >
              Forgot password?
            </button>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ae8c5e] to-[#8b6f4a] text-white py-3 rounded-lg hover:from-[#8b6f4a] hover:to-[#6d5438] transition shadow-md"
            >
              Login
            </button>

            <button
              type="button"
              onClick={onLogin}
              className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition"
            >
              Continue as Demo User
            </button>
          </form>

          {/* Quote */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 italic">
              "Small progress is still progress."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}