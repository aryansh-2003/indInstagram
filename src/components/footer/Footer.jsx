import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-black border-t border-gray-200 mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-gray-100">
              <li>
                <Link to="/" className="text-xs  hover:text-gray-900 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/" className="text-xs hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/" className="text-xs  hover:text-gray-900 transition-colors">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/" className="text-xs hover:text-gray-900 transition-colors">
                  Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Community
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  API
                </Link>
              </li>
              <li>
                <Link to="/" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Safety
                </Link>
              </li>
              <li>
                <Link to="/" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <select className="text-xs text-gray-600 bg-transparent border-none outline-none cursor-pointer">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
              <span className="text-xs text-gray-500">
                © 2024 Instagram from Meta
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              <Link to="/" className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              <Link to="/" className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.316-1.296-.585-.544-.923-1.296-.923-2.109 0-.812.338-1.564.923-2.109.585-.544 1.361-.87 2.205-.87 1.297 0 2.448.49 3.316 1.296.585.544.923 1.296.923 2.109 0 .812-.338 1.564-.923 2.109-.585.544-1.361.87-2.205.87zm11.265-6.002c-.195-.195-.195-.512 0-.707.195-.195.512-.195.707 0 .195.195.195.512 0 .707-.195.195-.512.195-.707 0z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer