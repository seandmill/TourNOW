// frontend/src/components/layout/DashboardNav.tsx
import React from 'react';
import { createNavigationConfig } from './navigation/NavigationConfig';
import { NavSection } from '@/components/layout/navigation/NavSection';
import { NavItem } from '@/components/layout/navigation/NavItem';

export function DashboardNav() {
  const [activePath, setActivePath] = React.useState(window.location.pathname);

  const navigation = createNavigationConfig('USER');

  return (
    <nav className="flex-1 px-4 space-y-8 overflow-y-auto">
      {navigation.map((section) => (
        <NavSection key={section.title} title={section.title}>
          {section.items.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={activePath === item.href}
              onClick={() => setActivePath(item.href)}
            />
          ))}
        </NavSection>
      ))}
    </nav>
  );
}