'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'



function Page() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     // 1. Authenticate user here (API / Supabase / NextAuth etc)
  // await loginOrSignup(formData)

  // 2. Redirect based on role
  if (role === 'editor') {
    router.push('/editor');
  } else if (role === 'creator') {
    router.push('/creator');
  } else {
    router.push('/'); // fallback safety
  }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isCreator = role === 'creator';
  const gradientFrom = isCreator ? 'from-blue-500' : 'from-green-500';
  const gradientTo = isCreator ? 'to-purple-600' : 'to-emerald-600';
  const gradientHoverFrom = isCreator ? 'from-blue-600' : 'from-green-600';
  const gradientHoverTo = isCreator ? 'to-purple-700' : 'to-emerald-700';
  const cardGlow = isCreator ? 'shadow-blue-500/20' : 'shadow-green-500/20';
  const textColor = isCreator ? 'text-blue-400' : 'text-green-400';

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 sm:mb-12 transition-colors group"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to selection</span>
        </button>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 xl:gap-24">
          {/* Left Side - Welcome Text */}
          <div className="lg:w-1/2 max-w-lg text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-gray-800 mb-4">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">EditLoop</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}>
                Welcome, {isCreator ? 'Creator' : 'Editor'}
              </span>
            </h1>
            
            <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed">
              {isCreator 
                ? "Access powerful tools to manage your projects, collaborate with editors, and streamline your video production workflow."
                : "Connect with top creators, access exciting projects, and grow your editing career with our professional platform."
              }
            </p>

            <div className="hidden lg:block bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 mt-8">
              <h3 className="text-white font-bold text-lg mb-4">Why join us?</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                  </div>
                  <span className="text-gray-300">Enterprise-grade security</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                  </div>
                  <span className="text-gray-300">24/7 customer support</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-pink-400" />
                  </div>
                  <span className="text-gray-300">99.9% uptime guarantee</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="lg:w-1/2 max-w-md w-full">
            <div className="relative group">
              {/* Card Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500`}></div>
              
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-gray-800 overflow-hidden">
                <div className="p-6 sm:p-8 md:p-10">
                  {/* Form Header */}
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 mb-4">
                      <User className={`w-8 h-8 ${textColor}`} />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base">
                      {isSignUp 
                        ? `Sign up to start your journey as a ${role}`
                        : 'Sign in to access your dashboard'
                      }
                    </p>
                  </div>

                  {/* Toggle Switch */}
                  <div className="flex items-center justify-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center bg-gray-900/50 rounded-full p-1 border border-gray-800">
                      <button
                        onClick={() => setIsSignUp(false)}
                        className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          !isSignUp 
                            ? `bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white shadow-lg ${cardGlow}`
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => setIsSignUp(true)}
                        className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          isSignUp 
                            ? `bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white shadow-lg ${cardGlow}`
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    {isSignUp && (
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                            required={isSignUp}
                          />
                        </div>
                      </div>
                    )}

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter your password"
                          className="w-full pl-12 pr-12 py-3 sm:py-4 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 focus:ring-2"
                        />
                        <span className="text-sm text-gray-400">Remember me</span>
                      </label>
                      <button
                        type="button"
                        className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className={`group/btn w-full py-3 sm:py-4 bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:${gradientHoverFrom} hover:${gradientHoverTo} text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg ${cardGlow}`}
                    >
                      {isSignUp ? 'Create Account' : 'Sign In'}
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    {/* Terms & Privacy */}
                    {isSignUp && (
                      <p className="text-xs text-gray-500 text-center mt-4">
                        By signing up, you agree to our{' '}
                        <button type="button" className="text-blue-400 hover:text-blue-300 transition-colors">
                          Terms of Service
                        </button>{' '}
                        and{' '}
                        <button type="button" className="text-blue-400 hover:text-blue-300 transition-colors">
                          Privacy Policy
                        </button>
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>

            {/* Mobile Stats */}
            <div className="lg:hidden grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
              <div className="bg-gray-900/50 rounded-xl p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">12,847+</div>
                <div className="text-gray-400 text-sm">Projects</div>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">3,200+</div>
                <div className="text-gray-400 text-sm">Professionals</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 sm:mt-12 md:mt-16 text-center text-xs sm:text-sm text-gray-500">
          © 2026 EditLoop. All rights reserved. Enterprise-grade security & 99.9% uptime.
        </div>
      </div>
    </div>
  )
}

export default Page