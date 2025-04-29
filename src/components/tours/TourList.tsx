import { Tour } from '@/types';

const imageModules = import.meta.glob('@/assets/images/tours/*.png', { eager: true });

const resolveImageUrl = (imageUrlFromData: string): string | null => {
  if (imageUrlFromData.startsWith('http://') || imageUrlFromData.startsWith('https://')) {
    return imageUrlFromData;
  }
  const module = imageModules[imageUrlFromData] as any;
  return module?.default ?? null;
};

interface TourListProps {
  readonly tours: Tour[];
  readonly filters: {
    readonly status: string;
    readonly search: string;
    readonly category: string;
  };
}

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
      tour.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      tour.city.toLowerCase().includes(filters.search.toLowerCase()) ||
      tour.country.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = !filters.category || tour.title.includes(filters.category); 
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {filteredTours.map(tour => {
        const imageUrl = resolveImageUrl(tour.image_url);
        return (
          <div key={tour.tour_id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white transform transition duration-500 hover:scale-105">
            {imageUrl ? (
              <img className="w-full h-48 object-cover" src={imageUrl} alt={tour.title} />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{tour.title}</div>
              <div className="text-sm text-gray-600 mb-2">{tour.city}, {tour.country}</div>
              <p className="text-gray-700 text-base line-clamp-3">
                {tour.description}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tour.city}</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tour.country}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}