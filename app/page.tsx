'use client'

import { useRouter } from 'next/navigation'
import { Upload, Video, Edit3, Check, ArrowRight, Sparkles } from 'lucide-react'
import { useState } from 'react'

function Page() {
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  function handleClick(role: "creator" | "editor") {
    router.push(`/auth?role=${role}`)
  }

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

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 lg:py-24">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20 lg:mb-28 max-w-4xl mx-auto">
          

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-snug">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Collaborate. Create.
            </span>
            <span className="block text-white mt-1 sm:mt-2">Ship Faster.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The premier platform connecting video creators with professional editors. Streamline your entire production process.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-6 md:gap-10 lg:gap-12 max-w-7xl mx-auto">
          {/* Left Side - Info */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                  <Video className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Perfect Workflow</h2>
              </div>

              <ul className="space-y-3 sm:space-y-5">
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-0.5 sm:mb-1 text-sm sm:text-base">Secure File Transfer</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">End-to-end encrypted uploads and downloads</p>
                  </div>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-0.5 sm:mb-1 text-sm sm:text-base">Real-time Feedback</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">Timestamp-based comments and annotations</p>
                  </div>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-0.5 sm:mb-1 text-sm sm:text-base">Version Control</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">Track every edit and revision automatically</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Desktop Stats */}
            <div className="hidden lg:block bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-gray-800 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 text-sm sm:text-base">Projects Completed</span>
                <span className="text-xl sm:text-2xl font-bold text-white">12,847</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 sm:h-2.5">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 sm:h-2.5 rounded-full w-3/4"></div>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm mt-2">Join 3,200+ creators and editors</p>
            </div>
          </div>

          {/* Right Side - Role Cards */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {/* Creator Card */}
              <div
                className={`relative group transition-all duration-500 ${hoveredCard === 'creator' ? 'transform scale-[1.02]' : ''}`}
                onMouseEnter={() => setHoveredCard('creator')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500 ${
                    hoveredCard === 'creator' ? 'opacity-30' : ''
                  }`}
                ></div>

                <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-gray-800 overflow-hidden h-full flex flex-col">
                  <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
                    {/* Card Header */}
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Upload className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm text-gray-400">For</span>
                        <h3 className="text-lg sm:text-2xl font-bold text-white">Creators</h3>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="flex-grow mb-4 sm:mb-6">
                      <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                        Upload raw footage, manage projects, and collaborate with your editing team. Get professional results faster.
                      </p>

                      <div className="space-y-2 sm:space-y-3">
                        {['Project Management', 'Unlimited Storage', 'Priority Support'].map((item) => (
                          <div key={item} className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-800">
                            <span className="text-gray-400 text-xs sm:text-sm">{item}</span>
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleClick('creator')}
                      className="cursor-pointer group/btn w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      Start as Creator
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Editor Card */}
              <div
                className={`relative group transition-all duration-500 ${hoveredCard === 'editor' ? 'transform scale-[1.02]' : ''}`}
                onMouseEnter={() => setHoveredCard('editor')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-br from-green-500 via-emerald-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500 ${
                    hoveredCard === 'editor' ? 'opacity-30' : ''
                  }`}
                ></div>

                <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-gray-800 overflow-hidden h-full flex flex-col">
                  <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
                    {/* Card Header */}
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <Edit3 className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm text-gray-400">For</span>
                        <h3 className="text-lg sm:text-2xl font-bold text-white">Editors</h3>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="flex-grow mb-4 sm:mb-6">
                      <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                        Access premium projects, work with top creators, and grow your editing career with our platform.
                      </p>

                      <div className="space-y-2 sm:space-y-3">
                        {['Project Marketplace', 'Secure Payments', 'Portfolio Builder'].map((item) => (
                          <div key={item} className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-800">
                            <span className="text-gray-400 text-xs sm:text-sm">{item}</span>
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleClick('editor')}
                      className="cursor-pointer group/btn w-full py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
                    >
                      Join as Editor
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-6 md:mt-8 text-center">
              <p className="text-gray-400 text-xs sm:text-sm mb-3">Trusted by top companies</p>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-10 opacity-70 text-sm sm:text-base">
                {['YouTube', 'Netflix', 'Adobe', 'Disney', 'TikTok'].map((name) => (
                  <div key={name} className="font-bold text-white">{name}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="lg:hidden grid grid-cols-2 gap-4 mt-6 sm:mt-8">
          <div className="bg-gray-900/50 rounded-xl p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">12,847+</div>
            <div className="text-gray-400 text-xs sm:text-sm">Projects</div>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">3,200+</div>
            <div className="text-gray-400 text-xs sm:text-sm">Professionals</div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 md:mt-16 text-center text-xs sm:text-sm text-gray-500">
          © 2024 ClipLine. All rights reserved. Enterprise-grade security & 99.9% uptime.
        </div>
      </div>
    </div>
  )
}

export default Page
