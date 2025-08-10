import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background-paper/95 backdrop-blur-lg border-t border-gray-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-3 space-y-2 sm:space-y-0">
          {/* Left side - Copyright */}
          <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
            © {new Date().getFullYear()} Copyright reserved to{' '}
            <a 
              href="mailto:contact@tejasrana.in" 
              className="text-primary-light hover:text-primary-main transition-colors font-medium"
            >
              Tejas (contact@tejasrana.in)
            </a>
          </div>
          
          {/* Right side - Code with love and social icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="text-xs sm:text-sm text-gray-400 hover:cursor-pointer">
              Code with{' '}
              <span className="text-primary-main inline-block align-middle">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29 2.64-1.8 5.9-.96 7.66 1.1 1.76-2.06 5.02-2.91 7.66-1.1 1.41.96 2.28 2.59 2.34 4.29.14 3.88-3.3 6.99-8.55 11.76z"></path>
                </svg>
              </span>
              {' '}By{' '}
              <a href="https://tejasrana.in" className="text-primary-light font-medium cursor-pointer" target="_blank" rel="noopener noreferrer">Tejas Rana</a>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/tejasrana3898/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-light transition-colors duration-200 cursor-pointer"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              {/* GitHub */}
              <a
                href="https://github.com/Tony3898"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-light transition-colors duration-200 cursor-pointer"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              {/* Buy me a coffee */}
              <a
                href="https://www.buymeacoffee.com/tony_3898"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-warning text-warning rounded-md px-2 py-1 flex items-center hover:bg-warning/10 transition-colors duration-200 cursor-pointer"
                aria-label="Buy me a coffee"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.5 3H6c-1.1 0-2 .9-2 2v5.71c0 3.83 2.95 7.18 6.78 7.29 3.96.12 7.22-3.06 7.22-7v-1h.5c1.93 0 3.5-1.57 3.5-3.5S20.43 3 18.5 3M16 5v3H6V5zm2.5 3H18V5h.5c.83 0 1.5.67 1.5 1.5S19.33 8 18.5 8M4 19h16v2H4z"></path>
                </svg>
                <span className="text-xs sm:text-sm font-medium">Buy me a coffee</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 