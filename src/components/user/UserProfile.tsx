// frontend/src/components/user/UserProfile.tsx
import { Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function UserProfile() {
  const navigate = useNavigate();

  const handleSettings = () => {
    navigate(`/settings/profile`);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-sm font-medium text-blue-600">
            {'TU'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{'TourNOW User'}</span>
          <span className="text-xs text-gray-500">{'TourNOW User'}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleSettings}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4 text-gray-500" />
        </button>
        <button
          onClick={() => {}}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
}