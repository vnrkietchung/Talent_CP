import React from 'react';
import { 
  Brain, Download, Plus, ChevronRight, History
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';
import { TrainingDevelopmentContent } from '@/src/components/TrainingDevelopmentContent';

export function TrainingDevelopment() {
  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans overflow-hidden">
      {/* Header Section */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 shadow-sm z-20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <History className="w-4 h-4" />
            <span>Hệ thống quản trị</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">Đào tạo - Bồi dưỡng</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" className="gap-2 whitespace-nowrap">
              <Download className="w-4 h-4" /> Xuất báo cáo tổng hợp
            </Button>
            <Button variant="primary" className="gap-2 whitespace-nowrap">
              <Plus className="w-4 h-4" /> Thêm kế hoạch đào tạo
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Quản lý Đào tạo & Bồi dưỡng cán bộ</h1>
            <p className="text-xs text-slate-500">Theo dõi, đánh giá và lập kế hoạch phát triển năng lực đội ngũ</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <TrainingDevelopmentContent />
      </main>
    </div>
  );
}


function TabButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 text-xs font-bold rounded-md transition-all",
        active ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
      )}
    >
      {children}
    </button>
  );
}
