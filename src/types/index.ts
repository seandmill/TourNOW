export interface Tour {
    tour_id: string;
    title: string;
    description: string;
    city: string;
    country: string;
    image_url: string;
    video_url: string;
}

export type UserRole = 'USER';

export interface UserAuth {
  role: UserRole;
}

export interface User {
    user_id: string;
    name: string;
    user_name: string;
    email: string;
    join_date: string;
    address: string;
}