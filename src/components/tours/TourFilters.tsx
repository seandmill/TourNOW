import { Plus, Search } from 'lucide-react';

interface TourFiltersProps {
  filters: {
    role: string;
    status: string;
    search: string;
  };
  onFilterChange: (filters: any) => void;
}

export function TourFilters({ filters, onFilterChange }: TourFiltersProps) {

  return (
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for your next adventure..."
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          />
        </div>
        
        <select
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.role}
          onChange={(e) => onFilterChange({ ...filters, role: e.target.value })}
        >
          <option value="">All Roles</option>
          <option value="TOUR">Tour</option>
        </select>

        <button
          onClick={() => {}}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Tour
        </button>
      </div>
  );
}