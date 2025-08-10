import {
    Clear as ClearIcon,
    FilterList as FilterIcon,
    Sort as SortIcon
} from '@mui/icons-material';
import React from 'react';
import { PaginationParams, ReminderStatusType } from '../types';

interface ReminderFiltersProps {
  filters: PaginationParams;
  onFiltersChange: (filters: PaginationParams) => void;
  loading?: boolean;
}

export const ReminderFilters: React.FC<ReminderFiltersProps> = ({
  filters,
  onFiltersChange,
  loading = false
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value as ReminderStatusType | '';
    onFiltersChange({
      ...filters,
      status: status || undefined,
      page: 1 // Reset to first page when filtering
    });
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = event.target.value as 'reminderDate' | 'createdAt' | 'title' | '';
    onFiltersChange({
      ...filters,
      sortBy: sortBy || undefined,
      page: 1 // Reset to first page when sorting
    });
  };

  const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOrder = event.target.value as 'asc' | 'desc' | '';
    onFiltersChange({
      ...filters,
      sortOrder: sortOrder || undefined,
      page: 1 // Reset to first page when sorting
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      page: 1,
      limit: filters.limit || 10
    });
  };

  const hasActiveFilters = filters.status || filters.sortBy || filters.sortOrder;

  return (
    <div className="bg-gradient-to-br from-background-paper/80 to-background-paper/60 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Filters section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <FilterIcon className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-text-primary">Filters:</span>
          </div>
          
          {/* Status filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Status:</label>
            <select
              value={filters.status || ''}
              onChange={handleStatusChange}
              disabled={loading}
              className="bg-background-paper border border-gray-600 rounded-lg px-3 py-1 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors disabled:opacity-50 min-w-[120px]"
            >
              <option value="">All Statuses</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Sort section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <SortIcon className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-text-primary">Sort:</span>
          </div>
          
          {/* Sort by field */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">By:</label>
            <select
              value={filters.sortBy || ''}
              onChange={handleSortByChange}
              disabled={loading}
              className="bg-background-paper border border-gray-600 rounded-lg px-3 py-1 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors disabled:opacity-50 min-w-[120px]"
            >
              <option value="">Default</option>
              <option value="reminderDate">Reminder Date</option>
              <option value="createdAt">Created Date</option>
              <option value="title">Title</option>
            </select>
          </div>

          {/* Sort order */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Order:</label>
            <select
              value={filters.sortOrder || ''}
              onChange={handleSortOrderChange}
              disabled={loading}
              className="bg-background-paper border border-gray-600 rounded-lg px-3 py-1 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors disabled:opacity-50 min-w-[100px]"
            >
              <option value="">Default</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {/* Clear filters button */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3 py-1 text-sm text-gray-400 hover:text-error hover:bg-error/10 rounded-lg transition-all duration-200 border border-gray-600/40 hover:border-error/40 disabled:opacity-50"
              title="Clear all filters"
            >
              <ClearIcon className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
