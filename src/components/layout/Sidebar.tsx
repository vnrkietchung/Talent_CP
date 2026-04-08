import { cn } from "@/src/lib/utils";
import { LayoutDashboard, Users, Settings as SettingsIcon, ChevronLeft, ChevronRight, Award, BrainCircuit, Network, History, GraduationCap } from "lucide-react";

interface SidebarProps {
  activePath: string;
  onNavigate: (path: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ activePath, onNavigate, collapsed, setCollapsed }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { id: "talents", label: "Nhân tài", icon: Users },
    { id: "evaluations", label: "Đánh giá", icon: Award },
    { id: "talent-recommendation", label: "Đề xuất nhân tài", icon: BrainCircuit },
    { id: "relationship-network", label: "Mạng lưới quan hệ", icon: Network },
    { id: "work-history", label: "Lịch sử công tác", icon: History },
    { id: "training-development", label: "Đào tạo - Bồi dưỡng", icon: GraduationCap },
  ];

  return (
    <aside
      className={cn(
        "fixed top-[48px] left-0 bottom-0 bg-white border-r border-border-neutral-light transition-all duration-300 z-40 flex flex-col",
        collapsed ? "w-[64px]" : "w-[220px]"
      )}
    >
      <div className="flex-1 py-4 flex flex-col gap-1 px-2">
        {menuItems.map((item) => {
          const isActive = activePath === item.id;
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex items-center h-10 rounded-[8px] cursor-pointer transition-colors px-3",
                isActive
                  ? "bg-brand-light text-brand"
                  : "text-text-primary hover:bg-gray-50",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-brand" : "text-icon-neutral")} />
              {!collapsed && <span className="ml-3 text-[13px] font-medium">{item.label}</span>}
            </div>
          );
        })}
      </div>

      <div className="p-2 border-t border-border-neutral-light flex justify-end">
        <div
          className="w-8 h-8 flex items-center justify-center cursor-pointer text-icon-neutral hover:bg-gray-100 rounded-[8px]"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </div>
      </div>
    </aside>
  );
}
