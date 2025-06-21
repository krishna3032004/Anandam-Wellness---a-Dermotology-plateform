// components/Sidebar.js
import { useState } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  UserPlus,
  MessageSquare,
  BarChart2,
  Settings,
  Users,
  Star,
  ThumbsUp,
  Megaphone,
  Video,
  Heart
} from 'lucide-react';

const menuItems = [
  { label: 'Calendar', icon: CalendarDays, href: '/calendar' },
  { label: 'Patients', icon: Users, href: '/patients' },
  { label: 'Communications', icon: MessageSquare, href: '/communications' },
  { label: 'Reports', icon: BarChart2, href: '/reports' },
  { label: 'Settings', icon: Settings, href: '/settings' },
  { label: 'Profiles', icon: UserPlus, href: '/profiles' },
  { label: 'Prime', icon: Star, href: '/prime' },
  { label: 'Feedback', icon: ThumbsUp, href: '/feedback' },
  { label: 'Reach', icon: Megaphone, href: '/reach' },
  { label: 'Consult', icon: Video, href: '/consult' },
  { label: 'Health feed', icon: Heart, href: '/health-feed' },
];

export default function Sidebar2() {
  return (
    <div className="fixed top-20 left-0 h-screen bg-blue-900 text-white flex flex-col items-start group hover:w-64 w-16 transition-all duration-300 z-50">
      {/* <div className="w-full px-4 py-4 text-lg font-bold text-yellow-400">practo</div> */}
      <nav className="flex-1 w-full">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link href={item.href} key={index} className="flex items-center px-4 py-3 hover:bg-blue-800 transition-all duration-300">
              <Icon className="w-6 h-6" />
              <span className="ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        practo.com
      </div>
    </div>
  );
}
