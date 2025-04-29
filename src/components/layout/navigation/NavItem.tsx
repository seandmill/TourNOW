import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  hasSubItems?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

export function NavItem({ href, icon: Icon, label, hasSubItems }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={`
        flex items-center px-3 py-2 text-sm font-medium rounded-md
        transition-colors group
        'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
      `}
    >
      <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'}`} />
      <span className="flex-1">{label}</span>
      {hasSubItems && (
        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      )}
    </Link>
  );
}