import React from 'react';
import { LayoutProps } from '../../types';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  isPublicPage = false,
}) => {
  // For public pages (login, signup), render without layout constraints
  if (isPublicPage) {
    return <>{children}</>;
  }

  // For protected pages, use full layout with header and footer
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-paper to-background flex flex-col">
      {/* Header */}
      {showHeader && (
        <Header />
      )}

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      {showFooter && (
        <Footer />
      )}
    </div>
  );
};
