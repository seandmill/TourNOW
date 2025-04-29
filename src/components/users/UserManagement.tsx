import React, { useEffect, useState } from 'react';
import { UserList } from '@/components/users/UserList';
import { UserFilters } from '@/components/users/UserFilters';
import { fetchUsers } from '@/services/dynamoDBService';
import { User } from '@/types';

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = React.useState({
    role: '',
    status: '',
    search: '',
  });

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
      </div>

      <UserFilters filters={filters} onFilterChange={setFilters} />
      <UserList users={users} filters={filters} />
    </div>
  );
}