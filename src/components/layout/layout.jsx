import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }) {
  return (
    // light-grid-bg ko yahan rakha hai taaki poora page cover ho
    <div className="flex min-h-screen relative light-grid-bg overflow-x-hidden">
      
      {/* Sidebar: Fixed width w-16 */}
      <Sidebar />

      {/* Main Content Area */}
      {/* lg:ml-16 sidebar ki width (64px) ke saath perfectly match karta hai */}
      <div className="flex-1 flex flex-col ml-0 lg:ml-16 relative z-10 pt-16 lg:pt-0">
        
        <Header />
        
        {/* Main content with negative margin for the 'Pinterest' pop effect */}
        <main className="px-4 md:px-10 pb-10 flex-1 relative z-30 -mt-16 md:-mt-20 lg:-mt-24">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}