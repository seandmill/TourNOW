import { Tour, User } from '@/types';

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:3001/api';

/**
 * Fetch all tours from the backend API.
 * Falls back to local JSON if the API call fails.
 */
export const fetchTours = async (): Promise<Tour[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tours`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching tours from API: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data: Tour[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tours from API, falling back to local JSON:', error);
    // Fallback logic remains useful for offline/dev scenarios
    const toursData = await import('../../database/tournow_tours_prod.json');
    // Transform the fallback data structure
    return toursData.default.map((item: any) => ({
      tour_id: item.tour_id.S,
      title: item.title.S,
      description: item.description.S,
      city: item.city.S,
      country: item.country.S,
      image_url: item.image_url.S,
      video_url: item.video_url.S,
    }));
  }
};

/**
 * Fetch all users from the backend API.
 * Falls back to local JSON if the API call fails.
 */
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching users from API: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data: User[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users from API, falling back to local JSON:', error);
    // Fallback logic remains useful for offline scenarios
    const usersData = await import('../../database/tournow_users_prod.json');
    // Transform the fallback data structure
    return usersData.default.map((item: any) => ({
      user_id: item.user_id.S,
      name: item.name.S,
      user_name: item.user_name.S,
      email: item.email.S,
      join_date: item.join_date.S,
      address: item.address.S,
    }));
  }
};
