import React, { useState, useEffect } from 'react';
import { Tour } from '../types';
import TourCard from '../components/TourCard';
import { fetchTours } from '../services/dynamoDBService';
import { Search, X } from 'lucide-react';

const TourSearch: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTourVideoUrl, setSelectedTourVideoUrl] = useState<string | null>(null);

  // Load tours from DynamoDB using the service
  useEffect(() => {
    const loadTours = async () => {
      try {
        const toursData = await fetchTours();
        setTours(toursData as Tour[]);
        setFilteredTours(toursData as Tour[]);
      } catch (error) {
        console.error('Failed to load tours:', error);
      }
    };
    
    loadTours();
  }, []);

  // Filter tours based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTours(tours);
      return;
    }
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    const results = tours.filter(tour => 
      tour.title.S.toLowerCase().includes(lowerSearchTerm) ||
      tour.description.S.toLowerCase().includes(lowerSearchTerm) ||
      tour.city.S.toLowerCase().includes(lowerSearchTerm) ||
      tour.country.S.toLowerCase().includes(lowerSearchTerm)
    );
    setFilteredTours(results);
  }, [searchTerm, tours]);

  // Handle video display when a tour card is clicked
  const handleCardClick = (videoUrl: string) => {
    // The video URL should be directly usable without transformation as mentioned by user
    setSelectedTourVideoUrl(videoUrl);
  };

  const closeModal = () => {
    setSelectedTourVideoUrl(null);
  };

  const handleReset = () => {
    setSearchTerm('');
    setFilteredTours(tours);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-4 px-2">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">TourNOW Search</h1>
          <button 
            onClick={handleReset}
            className="bg-gray-100 text-xs px-2 py-1 uppercase"
          >
            RESET
          </button>
        </header>
        
        {/* Search Bar */}
        <div className="relative mb-4 w-full">
          <input 
            type="text"
            placeholder="Search for your next adventure..."
            className="w-full border border-gray-300 p-1 pl-6"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
        
        <div className="flex">
          {/* Filters Sidebar */}
          <aside className="w-32 pr-4">
            <h2 className="text-sm font-bold mb-2">Filters</h2>
            
            <div className="mb-3">
              <label htmlFor="difficulty-filter" className="block text-xs font-bold mb-1">Difficulty</label>
              <select id="difficulty-filter" className="w-full border border-gray-300 text-xs p-0.5">
                <option>All Difficulties</option>
              </select>
            </div>
            
            <div className="mb-3">
              <label htmlFor="price-filter" className="block text-xs font-bold mb-1">Price Range</label>
              <select id="price-filter" className="w-full border border-gray-300 text-xs p-0.5">
                <option>All Price Ranges</option>
              </select>
            </div>
            
            <div className="mb-3">
              <label htmlFor="type-filter" className="block text-xs font-bold mb-1">Type</label>
              <select id="type-filter" className="w-full border border-gray-300 text-xs p-0.5">
                <option>All Types</option>
              </select>
            </div>
            
            <div className="mb-3">
              <label htmlFor="region-text-filter" className="block text-xs font-bold mb-1">Region (Location)</label>
              <input 
                id="region-text-filter" 
                type="text" 
                placeholder="Enter city or country" 
                className="w-full border border-gray-300 text-xs p-0.5 mb-1"
              />
              
              <input 
                id="region-range-filter" 
                type="range" 
                min="1" 
                max="1000" 
                defaultValue="100" 
                className="w-full h-1 accent-red-500 my-2"
              />
              <div className="flex justify-between text-[10px]">
                <span>1 mi</span>
                <span>1000 mi</span>
              </div>
            </div>
          </aside>

          {/* Tour List - in a clean vertical layout exactly matching the mockup */}
          <main className="flex-grow">
            {filteredTours.length > 0 ? (
              <div className="border border-gray-200 divide-y divide-gray-200">
                {filteredTours.map(tour => (
                  <TourCard 
                    key={tour.tour_id.S} 
                    tour={tour} 
                    onClick={() => handleCardClick(tour.video_url.S)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-10">No tours found matching your criteria.</p>
            )}
          </main>
        </div>
      </div>

      {/* Video Modal */}
      {selectedTourVideoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white overflow-hidden max-w-3xl w-full">
            <button 
              onClick={closeModal} 
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-1 z-10 hover:bg-opacity-75"
              aria-label="Close video"
            >
              <X size={20} />
            </button>
            <video 
              src={selectedTourVideoUrl} 
              controls 
              autoPlay 
              className="w-full aspect-video"
              onError={() => {
                console.error("Error loading video:", selectedTourVideoUrl);
                alert("Sorry, the video could not be loaded.");
                closeModal(); 
              }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourSearch;
