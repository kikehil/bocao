"use client";

import Header from "./Header";
import BottomNavigation from "./BottomNavigation";

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <main className="max-w-md mx-auto">{children}</main>
      <BottomNavigation />
    </div>
  );
}

