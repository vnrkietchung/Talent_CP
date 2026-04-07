import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { cn } from "@/src/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  activePath: string;
  onNavigate: (path: string) => void;
}

export function MainLayout({ children, activePath, onNavigate }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen w-full bg-[#F0F2F4] flex flex-col overflow-hidden">
      <Header />
      <Sidebar activePath={activePath} onNavigate={onNavigate} collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <main
        className={cn(
          "flex-1 pt-[48px] transition-all duration-300 flex flex-col overflow-hidden",
          collapsed ? "ml-[64px]" : "ml-[220px]"
        )}
      >
        {children}
      </main>
    </div>
  );
}
