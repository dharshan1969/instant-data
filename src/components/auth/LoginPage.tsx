import React, { useState } from 'react';
import { Shield, Eye, EyeOff, ArrowLeft, User, Lock, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { AnimatedBackground } from '../AnimatedBackground';
import { ImageCarousel } from '../ImageCarousel';

interface LoginPageProps {
  onNavigate: (view: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { addNotification } = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(username, password);
      
      if (success) {
        addNotification({
          type: 'success',
          message: 'Welcome back! Login successful.',
        });
        onNavigate('dashboard');
      } else {
        addNotification({
          type: 'error',
          message: 'Invalid credentials. Please check your username and password.',
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Login failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            {/* Back Button */}
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </button>

            {/* Login Form */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-white/80">Sign in to your SecureBackup account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-white/90 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Signing In...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-white/80">
                  Don't have an account?{' '}
                  <button
                    onClick={() => onNavigate('signup')}
                    className="text-blue-300 hover:text-blue-200 font-medium transition-colors"
                  >
                    Sign up
                  </button>
                </p>
              </div>

              {/* Demo Credentials */}
              <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                <p className="text-sm text-white/90 text-center mb-3">Demo Credentials:</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-white/70">Username</p>
                    <p className="text-white font-mono">admin</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/70">Password</p>
                    <p className="text-white font-mono">admin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - About & Carousel */}
        <div className="hidden lg:flex w-1/2 items-center justify-center p-8">
          <div className="max-w-lg w-full space-y-8">
            {/* About Section */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6">Secure Your Digital Life</h2>
              <div className="space-y-4 text-white/90">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p>End-to-end encryption protects your files from unauthorized access</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p>Automated backups ensure your data is always safe and up-to-date</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p>Instant restore capabilities get you back up and running quickly</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p>Cross-platform access from any device, anywhere in the world</p>
                </div>
              </div>
            </div>

            {/* Image Carousel */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
              <ImageCarousel />
            </div>

            {/* Tagline */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Your data, always safe</h3>
              <p className="text-white/80">with SecureBackup</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}