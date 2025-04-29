import React, { useEffect, useState } from 'react';
import { TourList } from '@/components/tours/TourList';
import { TourFilters } from '@/components/tours/TourFilters';
import { fetchTours } from '@/services/dynamoDBService';
import { Tour } from '@/types';

export function TourManagement() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [filters, setFilters] = React.useState({
    role: '',
    status: '',
    search: '',
    category: '',
  });

  // Load Tours from DynamoDB
  useEffect(() => {
    const loadTours = async () => {
      try {
        const TourData = await fetchTours();
        setTours(TourData);
      } catch (error) {
        console.error('Failed to load Tours:', error);
      }
    };
    
    loadTours();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Tour Management</h1>
      </div>

      <TourFilters filters={filters} onFilterChange={setFilters} />
      <TourList tours={tours} filters={filters} />
    </div>
  );
}