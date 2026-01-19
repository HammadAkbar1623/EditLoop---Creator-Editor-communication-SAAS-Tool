'use client'

import { Clock, DollarSign, CheckCircle, AlertCircle, Download, Upload } from 'lucide-react'
import { useState } from 'react'

function EditorPage() {
  const [activeProjects] = useState([
    { id: 1, title: 'YouTube Vlog Series', client: 'Travel Creator', status: 'editing', dueDate: 'Dec 15, 2024' },
    { id: 2, title: 'Product Launch Video', client: 'Tech Startup', status: 'feedback', dueDate: 'Dec 20, 2024' },
    { id: 3, title: 'Corporate Training', client: 'Enterprise Corp', status: 'uploading', dueDate: 'Dec 18, 2024' },
  ])

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Welcome back, <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">Usman</span>
        </h2>
        <p className="text-gray-600">Here's what's happening with your projects today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Active Projects</p>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900">3</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">Capacity: <span className="font-medium text-green-600">3/5 slots</span></p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Monthly Earnings</p>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900">$1,450</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">Rate: <span className="font-medium text-blue-600">$50/video</span></p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Availability</p>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900">Available</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">Status: <span className="font-medium text-emerald-600">Open for work</span></p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Completion Rate</p>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900">98%</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">Projects: <span className="font-medium text-purple-600">49/50 done</span></p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Skills & Profile */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          {/* Active Projects */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Active Projects</h3>
              <button className="text-sm font-medium text-green-600 hover:text-green-700">
                View All →
              </button>
            </div>
            
            <div className="space-y-3">
              {activeProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{project.title}</h4>
                      <p className="text-sm text-gray-600">{project.client}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'editing' ? 'bg-yellow-50 text-yellow-700' :
                      project.status === 'feedback' ? 'bg-blue-50 text-blue-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Due: {project.dueDate}
                      </span>
                    </div>
                    <button className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium">
                      {project.status === 'feedback' ? (
                        <>
                          <Upload className="w-4 h-4" />
                          Upload Edit
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download Files
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 lg:space-y-8">
          {/* Skills */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {['YouTube Videos', 'Instagram Reels', 'TikTok Shorts', 'Corporate Videos', 'Product Demos', 'Color Grading', 'Motion Graphics', 'Audio Mixing'].map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                <span className="font-medium text-gray-900">Update Availability</span>
                <Clock className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                <span className="font-medium text-gray-900">View Messages</span>
                <AlertCircle className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                <span className="font-medium text-gray-900">Withdraw Earnings</span>
                <DollarSign className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Rate Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 sm:p-6">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Current Rate</h3>
            <p className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">$50<span className="text-lg text-gray-600">/video</span></p>
            <p className="text-sm text-gray-600 mb-4">Standard editing package includes color grading and basic effects</p>
            <button className="w-full py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
              Update Rates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorPage;

// Import missing icon
import { FolderOpen } from 'lucide-react'