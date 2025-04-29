import React from 'react';
import { Tour } from '@/types';

// Use the '@' alias in the glob pattern
const imageModules = import.meta.glob('@/assets/images/tours/*.png', { eager: true });

// Helper function - now directly use the imagePath for lookup
const getImageUrl = (imagePath: string): string | null => {
  const module = imageModules[imagePath] as any;
  const resolvedUrl = module?.default ?? '';
  return resolvedUrl === '' ? null : resolvedUrl;
};

interface TourListProps {
  readonly tours: Tour[];
  readonly filters: {
    readonly status: string;
    readonly search: string;
  };
}

/* Tour Card
-- Need to load all of the assets from @/assets/images/ - the paths are defined in tournow_tour_prod.json (column image_url)
<div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src={tour.image_url.S} alt={tour.title.S}>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{tour.city.S}, {tour.country.S}</div>
    <p class="text-gray-700 text-base">
      {tour.description.S}
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tour.city.S}</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tour.country.S}</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#hike</span>
  </div>
</div>
*/

export function TourList({ tours, filters }: TourListProps) {

  if (tours.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        No tours found
      </div>
    );
  }

  const filteredTours = tours.filter(tour => {
    const matchesSearch = !filters.search || 
      tour.title.S.toLowerCase().includes(filters.search.toLowerCase()) ||
      tour.description.S.toLowerCase().includes(filters.search.toLowerCase()) ||
      tour.city.S.toLowerCase().includes(filters.search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {filteredTours.map(tour => {
        const imageUrl = getImageUrl(tour.image_url.S);
        return (
          <div key={tour.tour_id.S} className="max-w-sm rounded overflow-hidden shadow-lg bg-white transform transition duration-500 hover:scale-105">
            {imageUrl ? (
              <img className="w-full h-48 object-cover" src={imageUrl} alt={tour.title.S} />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{tour.title.S}</div>
              <div className="text-sm text-gray-600 mb-2">{tour.city.S}, {tour.country.S}</div>
              <p className="text-gray-700 text-base line-clamp-3">
                {tour.description.S}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tour.city.S}</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tour.country.S}</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#hike</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}