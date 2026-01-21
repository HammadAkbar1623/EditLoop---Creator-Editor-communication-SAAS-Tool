'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, DollarSign, Globe, Tag, Check, Plus, X, Link as LinkIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

type RateType = 'per_project' | 'per_hour' | 'per_video';

function Page() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Added state for loading and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    skills: [] as string[],
    rateType: 'per_project' as RateType,
    rate: 0,
    portfolioLinks: [] as string[],
    available: true
  });
  const [skillInput, setSkillInput] = useState('');
  const [portfolioLinkInput, setPortfolioLinkInput] = useState('');

  const router = useRouter();
  
  // FIXED: Proper async function syntax and complete submission logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error on new submission

    // Step 1: For editor sign-up, go to profile completion
    if (isSignUp && role === 'editor' && currentStep === 1) {
      setCurrentStep(2);
      return;
    }

    // Step 2: Final submission for all users
    setIsLoading(true);
    
    try {
      // Prepare the payload according to your backend schema
      const payload: any = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role,
      };

      // Include editorProfile ONLY if the role is 'editor' and we are signing up
      if (isSignUp && role === 'editor') {
        payload.editorProfile = {
          skills: formData.skills,
          rateType: formData.rateType,
          rate: formData.rate,
          portfolioLinks: formData.portfolioLinks,
          available: formData.available,
          // Backend will set default values for rating and reviewsCount
        };
      }

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle specific error messages from backend
        throw new Error(data.message || `Signup failed with status: ${res.status}`);
      }

      // Success! Redirect based on role
      if (role === 'editor') {
        router.push('/editor');
      } else if (role === 'creator') {
        router.push('/creator');
      } else {
        router.push('/');
      }
    } catch (error: any) {
      // Set a user-friendly error message
      console.error('Signup error:', error);
      setError(error.message || 'Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked
      });
    } else if (name === 'rate') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const addPortfolioLink = () => {
    if (portfolioLinkInput.trim() && !formData.portfolioLinks.includes(portfolioLinkInput.trim())) {
      setFormData({
        ...formData,
        portfolioLinks: [...formData.portfolioLinks, portfolioLinkInput.trim()]
      });
      setPortfolioLinkInput('');
    }
  };

  const removePortfolioLink = (linkToRemove: string) => {
    setFormData({
      ...formData,
      portfolioLinks: formData.portfolioLinks.filter(link => link !== linkToRemove)
    });
  };

  const isCreator = role === 'creator';
  const gradientFrom = isCreator ? 'from-blue-500' : 'from-green-500';
  const gradientTo = isCreator ? 'to-purple-600' : 'to-emerald-600';
  const gradientHoverFrom = isCreator ? 'from-blue-600' : 'from-green-600';
  const gradientHoverTo = isCreator ? 'to-purple-700' : 'to-emerald-700';
  const cardGlow = isCreator ? 'shadow-blue-500/20' : 'shadow-green-500/20';
  const textColor = isCreator ? 'text-blue-400' : 'text-green-400';

  // Added: Error display component
  const renderError = () => {
    if (!error) return null;
    
    return (
      <div className="mb-4 p-4 bg-red-900/30 border border-red-800 rounded-xl">
        <div className="flex items-center gap-2 text-red-300">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Error</span>
        </div>
        <p className="mt-1 text-sm text-red-200">{error}</p>
      </div>
    );
  };

  const renderEditorStep2 = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">Step 2 of 2</span>
          <span className="text-sm text-gray-400">Editor Profile</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full w-full"></div>
        </div>
      </div>

      {/* Error Display */}
      {renderError()}

      {/* Skills Section */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          <div className="flex items-center gap-2 mb-1">
            <Tag className="w-4 h-4" />
            <span>Skills & Expertise</span>
          </div>
          <span className="text-gray-400 text-xs">Add your video editing skills</span>
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            placeholder="e.g., Adobe Premiere, Color Grading, Motion Graphics"
            className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            disabled={!skillInput.trim()}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        {/* Skills List */}
        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-gray-800 rounded-lg"
            >
              <span className="text-sm text-gray-300">{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="text-gray-500 hover:text-red-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Rate Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4" />
              <span>Rate Type</span>
            </div>
          </label>
          <select
            name="rateType"
            value={formData.rateType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent appearance-none"
          >
            <option value="per_project">Per Project</option>
            <option value="per_hour">Per Hour</option>
            <option value="per_video">Per Video</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4" />
              <span>Rate (USD)</span>
            </div>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              name="rate"
              value={formData.rate || ''}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Portfolio Links */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          <div className="flex items-center gap-2 mb-1">
            <LinkIcon className="w-4 h-4" />
            <span>Portfolio Links</span>
          </div>
          <span className="text-gray-400 text-xs">Add links to your work (YouTube, Vimeo, etc.)</span>
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="url"
            value={portfolioLinkInput}
            onChange={(e) => setPortfolioLinkInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPortfolioLink())}
            placeholder="https://youtube.com/your-channel"
            className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addPortfolioLink}
            className="px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            disabled={!portfolioLinkInput.trim()}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        {/* Links List */}
        <div className="space-y-2">
          {formData.portfolioLinks.map((link, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-300 truncate">{link}</span>
              </div>
              <button
                type="button"
                onClick={() => removePortfolioLink(link)}
                className="text-gray-500 hover:text-red-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="flex items-center justify-between p-4 bg-gray-900/30 border border-gray-800 rounded-xl">
        <div>
          <h4 className="font-medium text-white mb-1">Available for Work</h4>
          <p className="text-sm text-gray-400">Accept new projects immediately</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleInputChange}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-green-500 to-emerald-600"></div>
        </label>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="flex-1 px-6 py-3 border border-gray-800 text-gray-300 rounded-xl font-medium hover:bg-gray-900/50 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Complete Profile'
          )}
        </button>
      </div>
    </div>
  );

  const renderBasicForm = () => (
    <>
      {renderError()}
      
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
              disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

     

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 focus:ring-2"
            disabled={isLoading}
          />
          <span className="text-sm text-gray-400">Remember me</span>
        </label>
        <button
          type="button"
          className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className={`group/btn w-full py-3 sm:py-4 bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:${gradientHoverFrom} hover:${gradientHoverTo} text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg ${cardGlow} disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {isSignUp && role === 'editor' ? 'Continuing...' : isSignUp ? 'Creating Account...' : 'Signing In...'}
          </>
        ) : (
          <>
            {isSignUp && role === 'editor' ? 'Continue to Profile' : isSignUp ? 'Create Account' : 'Sign In'}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </>
  );

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
          onClick={() => currentStep === 2 ? setCurrentStep(1) : window.history.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 sm:mb-12 transition-colors group disabled:opacity-50"
          disabled={isLoading}
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">
            {currentStep === 2 ? 'Back to basic info' : 'Back to selection'}
          </span>
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
                {currentStep === 2 ? 'Complete Your Profile' : `Welcome, ${isCreator ? 'Creator' : 'Editor'}`}
              </span>
            </h1>
            
            <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed">
              {currentStep === 2 
                ? "Set up your editor profile to start getting matched with perfect projects and showcase your skills to creators."
                : (isCreator 
                  ? "Access powerful tools to manage your projects, collaborate with editors, and streamline your video production workflow."
                  : "Connect with top creators, access exciting projects, and grow your editing career with our professional platform."
                )
              }
            </p>

            {currentStep === 2 ? (
              <div className="hidden lg:block bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 mt-8">
                <h3 className="text-white font-bold text-lg mb-4">Why complete your profile?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                    <span className="text-gray-300">Get 3x more project matches</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-full flex items-center justify-center">
                      <DollarSign className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-gray-300">Set competitive rates</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-full flex items-center justify-center">
                      <Globe className="w-3 h-3 text-teal-400" />
                    </div>
                    <span className="text-gray-300">Showcase your portfolio</span>
                  </li>
                </ul>
              </div>
            ) : (
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
            )}
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
                      {currentStep === 2 ? (
                        <User className={`w-8 h-8 ${textColor}`} />
                      ) : (
                        <User className={`w-8 h-8 ${textColor}`} />
                      )}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {currentStep === 2 
                        ? 'Editor Profile'
                        : (isSignUp ? 'Create Account' : 'Welcome Back')
                      }
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base">
                      {currentStep === 2
                        ? 'Tell us about your editing expertise'
                        : (isSignUp 
                          ? `Sign up to start your journey as a ${role}`
                          : 'Sign in to access your dashboard'
                        )
                      }
                    </p>
                  </div>

                  {/* Toggle Switch - Only show when not in step 2 */}
                  {currentStep === 1 && (
                    <div className="flex items-center justify-center mb-6 sm:mb-8">
                      <div className="inline-flex items-center bg-gray-900/50 rounded-full p-1 border border-gray-800">
                        <button
                          onClick={() => setIsSignUp(false)}
                          className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            !isSignUp 
                              ? `bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white shadow-lg ${cardGlow}`
                              : 'text-gray-400 hover:text-white'
                          } disabled:opacity-50`}
                          disabled={isLoading}
                        >
                          Sign In
                        </button>
                        <button
                          onClick={() => setIsSignUp(true)}
                          className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            isSignUp 
                              ? `bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white shadow-lg ${cardGlow}`
                              : 'text-gray-400 hover:text-white'
                          } disabled:opacity-50`}
                          disabled={isLoading}
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    {isSignUp && role === 'editor' && currentStep === 2
                      ? renderEditorStep2()
                      : renderBasicForm()
                    }

                    {/* Terms & Privacy */}
                    {isSignUp && currentStep === 1 && (
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