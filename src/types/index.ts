// Represents the DynamoDB structure for a string attribute
interface DynamoDbString {
    S: string;
}

// Interface for the Tour data based on tournow_tours_prod.json
export interface Tour {
    tour_id: DynamoDbString;
    title: DynamoDbString;
    description: DynamoDbString;
    city: DynamoDbString;
    country: DynamoDbString;
    image_url: DynamoDbString;
    video_url: DynamoDbString;
}

export type UserRole = 'USER';

export interface UserAuth {
  role: UserRole;
}

// Interface for the User data based on tournow_users_prod.json
export interface User {
    user_id: DynamoDbString;
    name: DynamoDbString;
    user_name: DynamoDbString;
    email: DynamoDbString;
    join_date: DynamoDbString;
    address: DynamoDbString;
}