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
    const toursData = await import('../../database/tournow_tours_prod.json');
    return toursData.default as Tour[];
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
    const usersData = await import('../../database/tournow_users_prod.json');
    return usersData.default as User[];
  }
};
