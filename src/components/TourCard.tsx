import React from 'react';
import { Tour } from '../types';
import { MapPin } from 'lucide-react';

interface TourCardProps {
  tour: Tour;
  onClick: () => void;
}

/**
 * TourCard component displays a tour card exactly as shown in the mockup
 */
const TourCard: React.FC<TourCardProps> = ({ tour, onClick }) => {
  // Activity type is typically part of the title (e.g., "- Walk")
  const titleParts = tour.title.S.split(' - ');
  const mainTitle = titleParts[0];
  const activityType = titleParts.length > 1 ? titleParts[1] : 'Walk'; // Default to Walk
  
  // Determine if tour is "NEW" - for demo we'll mark certain tours as new
  const isNew = tour.tour_id.S === 'T001' || tour.tour_id.S === 'T002';
  
  // Get price based on tour ID - without nested ternaries
  const getPriceByTourId = (tourId: string): string => {
    const priceMap: Record<string, string> = {
      'T001': '$196.00',
      'T002': '$157.00',
      'T005': '$104.00',
      'T004': '$117.00'
    };
    return priceMap[tourId] || '$149.99';
  };
  
  const price = getPriceByTourId(tour.tour_id.S);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button 
      type="button"
      className="border border-gray-200 rounded-none overflow-hidden cursor-pointer bg-white w-full text-left"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      style={{ maxWidth: '100%' }}
    >
      {/* Tour Card Line */}
      <div className="flex flex-col">
        {/* Location and NEW Badge */}
        <div className="relative">
          {isNew && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-1 py-0.5 z-10">
              NEW
            </div>
          )}
          <div className="p-2 pb-1 pl-2 text-xs flex items-center">
            <MapPin size={12} className="mr-1" />
            <span>{tour.city.S}, {tour.country.S}</span>
          </div>
          
          {/* Title with Activity Type */}
          <div className="px-2 pb-1 flex justify-between items-start">
            <div className="font-bold">{mainTitle}</div>
            <div className="text-sm">- {activityType}</div>
          </div>
          
          {/* Description */}
          <div className="px-2 pb-2 text-sm">
            {tour.description.S}
          </div>
          
          {/* Price - right aligned */}
          <div className="text-right pr-2 pb-2">
            <span className="text-sm">{price}</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default TourCard;
