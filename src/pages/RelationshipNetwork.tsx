import React, { useState } from 'react';
import { Network, GitMerge, Clock, Brain, User, Briefcase, MapPin, Award, ChevronDown, ChevronRight, AlertTriangle, CheckCircle2, Share2, GitCommit } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// Mock data
const profileData = {
  id: 1,
  name: "Nguyễn Văn A",
  position: "Phó Giám đốc Sở Tài chính",
  org: "UBND Thành phố Hà Nội",
  experience: 20,
  level: "Cấp Tỉnh/Thành phố",
  tags: ["Lãnh đạo chiến lược", "Quản lý", "Sẵn sàng (0–6 tháng)"],
  avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=150&h=150&auto=format&fit=crop",
};

const historyData = [
  { id: 1, period: "2020 - Nay", manager: "Lê Thị Y", managerPos: "Giám đốc Sở Tài chính", color: "bg-indigo-500", lightColor: "bg-indigo-50", borderColor: "border-indigo-200", textColor: "text-indigo-700" },
  { id: 2, period: "2015 - 2020", manager: "Đinh Văn K", managerPos: "Giám đốc Sở Tài chính (Nhiệm kỳ trước)", color: "bg-blue-500", lightColor: "bg-blue-50", borderColor: "border-blue-200", textColor: "text-blue-700" },
  { id: 3, period: "2010 - 2015", manager: "Nguyễn Thị M", managerPos: "Trưởng phòng Ngân sách", color: "bg-emerald-500", lightColor: "bg-emerald-50", borderColor: "border-emerald-200", textColor: "text-emerald-700" },
  { id: 4, period: "2004 - 2010", manager: "Trần Văn N", managerPos: "Phó Trưởng phòng Ngân sách", color: "bg-amber-500", lightColor: "bg-amber-50", borderColor: "border-amber-200", textColor: "text-amber-700" },
];

const aiInsights = {
  insights: [
    "Đã làm việc dưới quyền 3 lãnh đạo cấp cao khác nhau.",
    "Có sự tiếp xúc mạnh mẽ với ban lãnh đạo cấp Tỉnh/Thành phố.",
    "Mạng lưới nội bộ vững chắc trong lĩnh vực tài chính công."
  ],
  risks: [
    "Kinh nghiệm làm việc liên vùng/liên sở còn hạn chế.",
    "Chưa có kinh nghiệm báo cáo trực tiếp cho cấp Bộ/Ngành."
  ]
};

// Hierarchy Node Component
const TreeNode = ({ node, isRoot = false }: { node: any, isRoot?: boolean }) => {
  const [expanded, setExpanded] = useState(true);
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn(
          "relative flex flex-col items-center p-4 rounded-xl border-2 transition-all cursor-pointer shadow-sm w-64",
          node.level === 'selected' 
            ? "bg-indigo-50 border-indigo-500 shadow-md ring-4 ring-indigo-50" 
            : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md",
          !isRoot && "mt-8"
        )}
        onClick={() => setExpanded(!expanded)}
      >
        {!isRoot && (
          <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-slate-300 -translate-x-1/2" />
        )}
        
        <img src={node.avatar} alt={node.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm mb-2" />
        <h4 className={cn("font-bold text-center", node.level === 'selected' ? "text-indigo-700" : "text-slate-800")}>{node.name}</h4>
        <p className="text-xs text-slate-500 text-center mt-1 font-medium">{node.position}</p>
        
        {node.children && node.children.length > 0 && (
          <button className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border border-slate-300 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-400 shadow-sm transition-colors z-10">
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        )}
      </div>

      {expanded && node.children && node.children.length > 0 && (
        <div className="relative flex justify-center mt-8 gap-8">
          <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-slate-300 -translate-x-1/2" />
          {node.children.length > 1 && (
            <div className="absolute -top-4 left-[calc(25%+1rem)] right-[calc(25%+1rem)] h-0.5 bg-slate-300" />
          )}
          {node.children.map((child: any, idx: number) => (
            <div key={idx} className="relative">
              {node.children.length > 1 && (
                <div className="absolute -top-4 left-1/2 w-0.5 h-4 bg-slate-300 -translate-x-1/2" />
              )}
              <TreeNode node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const hierarchyData = {
  name: "Trần Văn X",
  position: "Chủ tịch UBND Thành phố",
  level: "top",
  avatar: "https://images.unsplash.com/photo-1556157382-97dee2dcb748?q=80&w=150&h=150&auto=format&fit=crop",
  children: [
    {
      name: "Lê Thị Y",
      position: "Giám đốc Sở Tài chính",
      level: "middle",
      avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=150&h=150&auto=format&fit=crop",
      children: [
        {
          name: "Nguyễn Văn A",
          position: "Phó Giám đốc Sở Tài chính",
          level: "selected",
          avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=150&h=150&auto=format&fit=crop",
          children: [
            { name: "Phạm Văn Z", position: "Trưởng phòng Ngân sách", level: "bottom", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&h=150&auto=format&fit=crop" },
            { name: "Hoàng Thị W", position: "Trưởng phòng Kế toán", level: "bottom", avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=150&h=150&auto=format&fit=crop" }
          ]
        }
      ]
    }
  ]
};

export function RelationshipNetwork() {
  const [viewMode, setViewMode] = useState<'tree' | 'network'>('tree');

  return (
    <div className="flex h-full w-full bg-slate-50 text-slate-800 font-sans overflow-hidden">
      
      {/* Left Panel - Profile & Quick Info */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full shadow-sm z-10 shrink-0">
        <div className="p-5 border-b border-slate-200 bg-indigo-50/30">
          <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-600" />
            Mạng lưới quan hệ
          </h2>
        </div>
        
        <div className="p-6 flex flex-col gap-6 overflow-y-auto">
          {/* Profile Card */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img src={profileData.avatar} alt={profileData.name} className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-lg" />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-slate-900">{profileData.name}</h1>
            <p className="text-sm font-medium text-indigo-600 mt-1">{profileData.position}</p>
            <p className="text-xs text-slate-500 mt-1">{profileData.org}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            {profileData.tags.map(tag => {
              const isReadiness = ["Sẵn sàng (0–6 tháng)", "Sẵn sàng có điều kiện (6–12 tháng)", "Nguồn kế cận"].includes(tag);
              let tagClass = "bg-slate-100 text-slate-700 border-slate-200";
              if (tag === "Sẵn sàng (0–6 tháng)") tagClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
              if (tag === "Sẵn sàng có điều kiện (6–12 tháng)") tagClass = "bg-amber-50 text-amber-700 border-amber-200";
              if (tag === "Nguồn kế cận") tagClass = "bg-blue-50 text-blue-700 border-blue-200";

              return (
                <span key={tag} className={cn("px-3 py-1 text-[10px] font-bold rounded-full border uppercase tracking-wider flex items-center gap-1.5", tagClass)}>
                  {isReadiness && <div className={cn("w-1.5 h-1.5 rounded-full", 
                    tag === "Sẵn sàng (0–6 tháng)" ? "bg-emerald-500" : 
                    tag === "Sẵn sàng có điều kiện (6–12 tháng)" ? "bg-amber-500" : "bg-blue-500"
                  )} />}
                  {tag}
                </span>
              );
            })}
          </div>

          <hr className="border-slate-100" />

          {/* Key Stats */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Thông tin tóm tắt</h3>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">{profileData.experience} năm</p>
                <p className="text-xs text-slate-500">Kinh nghiệm công tác</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">{profileData.level}</p>
                <p className="text-xs text-slate-500">Cấp độ quản lý hiện tại</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Panel - Hierarchy Tree */}
      <div className="flex-1 flex flex-col h-full bg-slate-50/50 relative overflow-hidden">
        {/* Toolbar */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 flex items-center gap-2">
            <GitMerge className="w-5 h-5 text-slate-400" />
            <span className="font-semibold text-slate-700 text-sm">Chuỗi báo cáo trực tiếp</span>
          </div>
          
          <div className="bg-white p-1 rounded-lg shadow-sm border border-slate-200 flex gap-1">
            <button 
              onClick={() => setViewMode('tree')}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                viewMode === 'tree' ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <GitMerge className="w-4 h-4" /> Sơ đồ cây
            </button>
            <button 
              onClick={() => setViewMode('network')}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                viewMode === 'network' ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <Network className="w-4 h-4" /> Mạng lưới
            </button>
          </div>
        </div>

        {/* Tree Container */}
        <div className="flex-1 overflow-auto p-12 flex items-center justify-center min-h-[600px]">
          {viewMode === 'tree' ? (
            <div className="pt-16 pb-12 px-12 bg-white rounded-3xl shadow-sm border border-slate-200 min-w-max">
              <TreeNode node={hierarchyData} isRoot={true} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 gap-4">
              <Network className="w-16 h-16 opacity-20" />
              <p>Chế độ xem mạng lưới đang được phát triển</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Management History & Insights */}
      <div className="w-[400px] bg-white border-l border-slate-200 flex flex-col h-full shadow-sm z-10 shrink-0">
        
        {/* Insights Section */}
        <div className="p-6 border-b border-slate-200 bg-indigo-900 text-white relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Brain className="w-24 h-24" />
          </div>
          <h3 className="text-sm font-bold text-indigo-200 uppercase tracking-wider mb-4 flex items-center gap-2 relative z-10">
            <Brain className="w-4 h-4" />
            Phân tích quan hệ hệ thống
          </h3>
          
          <div className="space-y-4 relative z-10">
            <ul className="space-y-2">
              {aiInsights.insights.map((insight, idx) => (
                <li key={idx} className="text-sm text-indigo-50 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{insight}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 pt-4 border-t border-indigo-800/50">
              <h4 className="text-xs font-semibold text-rose-300 uppercase mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Điểm cần lưu ý
              </h4>
              <ul className="space-y-2">
                {aiInsights.risks.map((risk, idx) => (
                  <li key={idx} className="text-sm text-indigo-100 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-500" />
            Lịch sử báo cáo (Quản lý trực tiếp)
          </h3>
          
          <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
            {historyData.map((item) => (
              <div key={item.id} className="relative pl-6 group">
                <div className={cn(
                  "absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 bg-white transition-colors",
                  item.id === 1 ? "border-indigo-500 ring-4 ring-indigo-50" : "border-slate-300 group-hover:border-indigo-400"
                )} />
                
                <div className={cn(
                  "p-4 rounded-xl border transition-all hover:shadow-md",
                  item.lightColor, item.borderColor
                )}>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className={cn("w-3.5 h-3.5", item.textColor)} />
                    <span className={cn("text-xs font-bold", item.textColor)}>{item.period}</span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-bold shadow-sm", item.color)}>
                      {item.manager.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{item.manager}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{item.managerPos}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
