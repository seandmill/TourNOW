// frontend/src/routes/index.tsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { UserManagement } from '@/components/users/UserManagement';
import { NotFound } from '@/components/error/NotFound';

export function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: `/`,
      element: <DashboardLayout />,
      children: [
        { 
          index: true, 
          element: <Navigate to="users" replace /> 
        },
        { path: 'users', element: <UserManagement /> },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}