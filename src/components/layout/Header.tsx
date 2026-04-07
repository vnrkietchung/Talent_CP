import { Grid3X3, Search, Settings, Bell, HelpCircle, MoreVertical } from "lucide-react";
import { Input } from "../ui/Input";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[48px] bg-header flex items-center justify-between px-4 z-50 border-b border-border-neutral-light">
      <div className="flex items-center gap-4">
        <Grid3X3 className="w-5 h-5 text-icon-neutral cursor-pointer" />
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-6 h-6 bg-brand rounded flex items-center justify-center text-white font-bold text-xs">
            M
          </div>
          <span className="font-semibold text-[16px] text-text-primary">Quản lý nhân tài</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-[240px]">
          <Input placeholder="Tìm kiếm..." icon={<Search className="w-4 h-4" />} />
        </div>
        <div className="flex items-center gap-3 text-icon-neutral">
          <Settings className="w-5 h-5 cursor-pointer hover:text-brand" />
          <Bell className="w-5 h-5 cursor-pointer hover:text-brand" />
          <HelpCircle className="w-5 h-5 cursor-pointer hover:text-brand" />
          <MoreVertical className="w-5 h-5 cursor-pointer hover:text-brand" />
        </div>
        <div className="w-8 h-8 rounded-full bg-brand-light border border-brand flex items-center justify-center text-brand font-semibold cursor-pointer">
          KC
        </div>
      </div>
    </header>
  );
}
