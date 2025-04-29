import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { fetchUsers } from '../services/dynamoDBService';

const UserAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Load users from DynamoDB
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userData = await fetchUsers();
        setUsers(userData as User[]);
      } catch (error) {
        console.error('Failed to load users:', error);
      }
    };
    
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-white py-4 px-8">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold">TourNOW User Admin</h1>
      </header>

      {/* User Table - Exactly matching the mockup in Image 3 */}
      <main>
        {users.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-2 pr-8 text-left font-bold uppercase text-xs">USER ID</th>
                <th className="py-2 pr-8 text-left font-bold uppercase text-xs">NAME</th>
                <th className="py-2 pr-8 text-left font-bold uppercase text-xs">USERNAME</th>
                <th className="py-2 pr-8 text-left font-bold uppercase text-xs">EMAIL</th>
                <th className="py-2 pr-8 text-left font-bold uppercase text-xs">JOIN DATE</th>
                <th className="py-2 pr-8 text-left font-bold uppercase text-xs">ADDRESS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id.S} className="border-b border-gray-100 text-xs">
                  <td className="py-2 pr-8">{user.user_id.S}</td>
                  <td className="py-2 pr-8">{user.name.S}</td>
                  <td className="py-2 pr-8">{user.user_name.S}</td>
                  <td className="py-2 pr-8">{user.email.S}</td>
                  <td className="py-2 pr-8">{user.join_date.S}</td>
                  <td className="py-2 pr-8">{user.address.S}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">Loading users...</p>
        )}
      </main>
    </div>
  );
};

export default UserAdmin;
