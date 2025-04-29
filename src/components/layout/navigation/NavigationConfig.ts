// frontend/src/components/layout/navigation/NavigationConfig.ts
import {
    LayoutDashboard,
    Users,
  } from 'lucide-react';
  import { UserRole } from '@/types';

  export function createNavigationConfig(role: UserRole) {
  
    const config: Record<UserRole, Array<{
      title: string;
      items: Array<{
        icon: any;
        label: string;
        href: string;
      }>;
    }>> = {
      USER: [
        {
          title: 'Overview',
          items: [
            { icon: LayoutDashboard, label: 'Search Tours', href: `/tours` },
            { icon: Users, label: 'Users', href: `/users` },
          ],
        },
      ],
    };
  
    return config[role] || [];
  }