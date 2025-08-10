import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    FirstPage as FirstPageIcon,
    LastPage as LastPageIcon
} from '@mui/icons-material';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  loading?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
  onLimitChange,
  loading = false
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handleFirstPage = () => {
    if (hasPreviousPage && !loading) {
      onPageChange(1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage && !loading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage && !loading) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    if (hasNextPage && !loading) {
      onPageChange(totalPages);
    }
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(event.target.value);
    onLimitChange(newLimit);
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show limited pages with ellipsis
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(1, currentPage - halfVisible);
      let endPage = Math.min(totalPages, currentPage + halfVisible);
      
      // Adjust if we're near the beginning or end
      if (currentPage <= halfVisible) {
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - halfVisible) {
        startPage = totalPages - maxVisiblePages + 1;
      }
      
      // Add first page and ellipsis if needed
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }
      
      // Add visible page numbers
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis and last page if needed
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-background-paper/80 to-background-paper/60 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Items info and per-page selector */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="text-sm text-gray-400">
            Showing {startItem}-{endItem} of {totalItems} items
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={handleLimitChange}
              disabled={loading}
              className="bg-background-paper border border-gray-600 rounded-lg px-3 py-1 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-2">
          {/* First page */}
          <button
            onClick={handleFirstPage}
            disabled={!hasPreviousPage || loading}
            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 border border-gray-600/40 hover:border-primary/40 disabled:opacity-50 disabled:hover:text-gray-400 disabled:hover:bg-transparent disabled:hover:border-gray-600/40"
            title="First page"
          >
            <FirstPageIcon className="w-4 h-4" />
          </button>

          {/* Previous page */}
          <button
            onClick={handlePreviousPage}
            disabled={!hasPreviousPage || loading}
            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 border border-gray-600/40 hover:border-primary/40 disabled:opacity-50 disabled:hover:text-gray-400 disabled:hover:bg-transparent disabled:hover:border-gray-600/40"
            title="Previous page"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-1 text-gray-400">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(page as number)}
                    disabled={loading}
                    className={`px-3 py-1 text-sm rounded-lg transition-all duration-200 border ${
                      page === currentPage
                        ? 'bg-primary text-white border-primary'
                        : 'text-gray-400 hover:text-primary hover:bg-primary/10 border-gray-600/40 hover:border-primary/40'
                    } disabled:opacity-50`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next page */}
          <button
            onClick={handleNextPage}
            disabled={!hasNextPage || loading}
            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 border border-gray-600/40 hover:border-primary/40 disabled:opacity-50 disabled:hover:text-gray-400 disabled:hover:bg-transparent disabled:hover:border-gray-600/40"
            title="Next page"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>

          {/* Last page */}
          <button
            onClick={handleLastPage}
            disabled={!hasNextPage || loading}
            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 border border-gray-600/40 hover:border-primary/40 disabled:opacity-50 disabled:hover:text-gray-400 disabled:hover:bg-transparent disabled:hover:border-gray-600/40"
            title="Last page"
          >
            <LastPageIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
