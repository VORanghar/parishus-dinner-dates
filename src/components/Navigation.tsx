
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Search, User, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home', exact: true },
    { path: '/my-events', icon: Calendar, label: 'My Events' },
    { path: '/explore', icon: Search, label: 'Explore' },
    { path: '/crossed-paths', icon: MapPin, label: 'Crossed Paths' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 bg-card border-t border-border",
      "flex items-center justify-around px-4 py-2 z-50",
      "md:relative md:border-t-0 md:bg-transparent md:flex-col md:space-y-2",
      className
    )}>
      {navItems.map(({ path, icon: Icon, label, exact }) => (
        <NavLink
          key={path}
          to={path}
          end={exact}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
              "min-w-[60px] md:min-w-[120px] md:flex-row md:justify-start md:px-4",
              isActive
                ? "text-peach bg-peach/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )
          }
        >
          <Icon className="w-5 h-5 md:mr-2" />
          <span className="text-xs mt-1 md:text-sm md:mt-0">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
