import {
  AccessTime as AccessTimeIcon,
  Add as AddIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Settings as SettingsIcon,
  Timer as TimerIcon
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FullScreenLoading } from '../components/Loading';
import { Pagination } from '../components/Pagination';
import { ReminderFilters } from '../components/ReminderFilters';
import { ReminderModal } from '../components/ReminderModal';
import { SettingsModal } from '../components/SettingsModal';
import { useReminderService } from '../contexts/ServicesContext';
import { PaginatedResponse, PaginationParams, Reminder, ReminderStatus } from '../types';

export const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);
  const reminderService = useReminderService();
  const [paginatedData, setPaginatedData] = useState<PaginatedResponse<Reminder> | null>(null);
  const [allReminders, setAllReminders] = useState<Reminder[]>([]); // For metrics
  const [filters, setFilters] = useState<PaginationParams>({
    page: 1,
    limit: 10,
    sortBy: 'reminderDate',
    sortOrder: 'desc'
  });

  // Fetch paginated reminders
  const fetchPaginatedReminders = async (params: PaginationParams) => {
    try {
      setLoading(true);
      const paginatedReminders = await reminderService.getRemindersPaginated(params);
      setPaginatedData(paginatedReminders);
    } catch (error) {
      toast.error('Failed to fetch reminders');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllReminders = async () => {
    try {
      const _reminders = await reminderService.getReminders();
      setAllReminders(_reminders);
    } catch (error) {
      toast.error('Failed to fetch reminders');
    }
  };

  // Initial load
  useEffect(() => {
    const loadInitialData = async () => {
      await Promise.all([
        fetchPaginatedReminders(filters),
        fetchAllReminders()
      ]);
    };
    loadInitialData();
  }, []);

  // Reload when filters change
  useEffect(() => {
    if (!loading) { // Only refetch if not initial load
      fetchPaginatedReminders(filters);
    }
  }, [filters]);

  const handleCreateReminder = () => {
    setSelectedReminder(null);
    setIsModalOpen(true);
  };

  const handleEditReminder = (reminder: Reminder) => {
    setSelectedReminder(reminder);
    setIsModalOpen(true);
  };

  const handleCancelReminder = async (reminderId: string) => {
    if (!window.confirm('Are you sure you want to cancel this reminder?')) {
      return;
    }

    try {
      await reminderService.cancelReminder(reminderId);
      
      // Update both paginated data and all reminders
      setPaginatedData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          data: prev.data.filter(r => r.id !== reminderId),
          pagination: {
            ...prev.pagination,
            totalItems: prev.pagination.totalItems - 1
          }
        };
      });
      
      setAllReminders(prev => prev.filter(r => r.id !== reminderId));
      toast.success('Reminder cancelled successfully');
      
      await Promise.all([
        fetchPaginatedReminders(filters),
        fetchAllReminders()
      ]);
    } catch (error) {
      toast.error('Failed to cancel reminder');
    }
  };

  const handleSaveReminder = async (reminderData: Partial<Reminder>) => {
    setModalLoading(true);
    try {
      if (selectedReminder) {
        await reminderService.updateReminder(selectedReminder.id, reminderData);
      } else {
        await reminderService.createReminder(reminderData);
      }
      
      // Refresh both paginated and all reminders data
      await Promise.all([
        fetchPaginatedReminders(filters),
        fetchAllReminders()
      ]);
    
    } catch (error) {
      throw error;
    } finally {
      setSelectedReminder(null);
      setModalLoading(false);
    }
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: number) => {
    setFilters(prev => ({ ...prev, limit, page: 1 }));
  };

  const handleFiltersChange = (newFilters: PaginationParams) => {
    setFilters(newFilters);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReminder(null);
  };

  const handleOpenSettings = () => {
    setIsSettingsModalOpen(true);
  };

  const handleCloseSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  if (loading) {
    return <FullScreenLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-paper/30 to-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-background-paper/80 to-background-paper/60 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-gray-700/30 shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <TimerIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-3xl lg:text-3xl font-bold text-text-primary mb-4">
              Ready to be reminded?
            </h1>
            <p className="text-gray-400 text-md sm:text-lg max-w-3xl mx-auto">
              Deliver reminders to your customers, colleagues, and friends with precision
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Quick Metrics</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Total Reminders */}
            <div className="bg-gradient-to-br from-background-paper/80 to-background-paper/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30 hover:border-info/50 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-info/20 to-info/10 rounded-xl flex items-center justify-center">
                  <AccessTimeIcon className="w-6 h-6 text-info" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-primary">{allReminders.length}</div>
                  <div className="text-sm text-gray-400">Total Reminders</div>
                </div>
              </div>
            </div>

            {/* Active/Scheduled */}
            <div className="bg-gradient-to-br from-background-paper/80 to-background-paper/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                  <AccessTimeIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-primary">{allReminders.filter(reminder => reminder.status === ReminderStatus.SCHEDULED).length}</div>
                  <div className="text-sm text-gray-400">Active Reminders</div>
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-gradient-to-br from-background-paper/80 to-background-paper/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30 hover:border-success/50 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-success/20 to-success/10 rounded-xl flex items-center justify-center">
                  <AccessTimeIcon className="w-6 h-6 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-primary">{allReminders.filter(reminder => reminder.status === ReminderStatus.DELIVERED).length}</div>
                  <div className="text-sm text-gray-400">Completed</div>
                </div>
              </div>
            </div>

            {/* Today's */}
            <div className="bg-gradient-to-br from-background-paper/80 to-background-paper/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30 hover:border-warning/50 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-warning/20 to-warning/10 rounded-xl flex items-center justify-center">
                  <AccessTimeIcon className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-primary">{allReminders.filter(reminder => reminder.status === ReminderStatus.SCHEDULED && new Date(reminder.reminderDate).toDateString() === new Date().toDateString()).length}</div>
                  <div className="text-sm text-gray-400">Due Today</div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">Quick Actions</h2>
          
          <div className="bg-gradient-to-br from-background-paper/80 to-background-paper/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-700/30 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Create Reminder - Primary Action */}
              <button
                onClick={handleCreateReminder}
                className="group bg-gradient-to-br from-primary to-primary-dark hover:from-primary-dark hover:to-primary-600 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <AddIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">Create New Reminder</h4>
                    <p className="text-white/80 text-sm">Start a new reminder session</p>
                  </div>
                </div>
              </button>

              {/* Settings */}
              <button 
                onClick={handleOpenSettings}
                className="group bg-gradient-to-br from-background-paper/60 to-background-paper/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 hover:scale-[1.02] text-left">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <SettingsIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary mb-1">Account Settings</h4>
                    <p className="text-gray-400 text-sm">Manage your profile</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* All Reminders */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Reminder List</h2>
          </div>
          
          {/* Filters */}
          <ReminderFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            loading={loading}
          />
          
          <div className="bg-gradient-to-br from-background-paper/80 to-background-paper/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-700/30 shadow-2xl">
            <div className="space-y-4">
          
              {!paginatedData || paginatedData.data.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mb-6">
                    <AccessTimeIcon className="w-10 h-10 text-primary" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">No reminders yet</h4>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm sm:text-base">Create your first reminder to start staying organized and never miss important events</p>
                  <button
                    onClick={handleCreateReminder}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl hover:from-primary-dark hover:to-primary-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-glow transform hover:scale-105"
                  >
                    <AddIcon className="w-5 h-5 mr-2" />
                    Create Your First Reminder
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedData.data.map((reminder) => (
                    <div
                      key={reminder.id}
                      className="group bg-gradient-to-r from-background-paper/60 to-background-paper/40 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-6 hover:border-gray-500/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors truncate">{reminder.title}</h4>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2 group-hover:text-text-primary transition-colors">{reminder.description}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
                            <div className="flex items-center text-gray-400 group-hover:text-text-primary transition-colors">
                              <AccessTimeIcon className="w-4 h-4 mr-2 text-primary" />
                              <span className="font-medium">{new Date(reminder.reminderDate).toLocaleString()}</span>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold w-fit border ${
                              reminder.status === ReminderStatus.DELIVERED
                                ? 'bg-success/20 text-success border-success/30'
                                : reminder.status === ReminderStatus.CANCELLED
                                ? 'bg-error/20 text-error border-error/30'
                                : 'bg-warning/20 text-warning border-warning/30'
                            }`}>
                              {reminder.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          {reminder.status === ReminderStatus.SCHEDULED && (
                            <>
                            <button
                            onClick={() => handleEditReminder(reminder)}
                            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 border border-gray-600/40 hover:border-primary/40"
                            title="Edit reminder"
                          >
                            <EditIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleCancelReminder(reminder.id)}
                            className="p-2 text-gray-400 hover:text-error hover:bg-error/10 rounded-lg transition-all duration-200 border border-gray-600/40 hover:border-error/40"
                            title="Delete reminder"
                          >
                            <CancelIcon className="w-4 h-4" />
                          </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Pagination */}
          {paginatedData && paginatedData.data.length > 0 && (
            <Pagination
              currentPage={paginatedData.pagination.currentPage}
              totalPages={paginatedData.pagination.totalPages}
              totalItems={paginatedData.pagination.totalItems}
              itemsPerPage={paginatedData.pagination.itemsPerPage}
              hasNextPage={paginatedData.pagination.hasNextPage}
              hasPreviousPage={paginatedData.pagination.hasPreviousPage}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
              loading={loading}
            />
          )}
        </div>

        {/* Reminder Modal */}
        <ReminderModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveReminder}
          reminder={selectedReminder}
          isLoading={modalLoading}
        />

        {/* Settings Modal */}
        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={handleCloseSettingsModal}
        />
      </div>
    </div>
  );
};
