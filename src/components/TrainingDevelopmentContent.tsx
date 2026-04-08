import React, { useState } from 'react';
import { 
  GraduationCap, Award, BookOpen, ShieldCheck, 
  CheckCircle2, AlertCircle, Clock, FileText, 
  Download, Info, Brain
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/Button';

// --- Types ---
interface TrainingRecord {
  id: string;
  type: 'specialized' | 'political' | 'management' | 'other';
  title: string;
  institution: string;
  period: string;
  result: string;
  status: 'verified' | 'pending' | 'unverified';
  documentUrl?: string;
}

interface CompetencyGap {
  requirement: string;
  requiredLevel: string;
  currentLevel: string;
  status: 'pass' | 'fail' | 'in-progress';
  suggestion?: string;
}

// --- Mock Data ---
const summaryStats = [
  { label: "Trình độ chuyên môn", value: "Thạc sĩ Luật", subValue: "Đại học Luật Hà Nội", icon: GraduationCap, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Lý luận chính trị", value: "Cao cấp", subValue: "Học viện CTQG Hồ Chí Minh", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Quản lý nhà nước", value: "Chuyên viên chính", subValue: "Bồi dưỡng năm 2021", icon: Award, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Ngoại ngữ", value: "IELTS 7.0", subValue: "Bậc 4/6 Khung VN", icon: BookOpen, color: "text-amber-600", bg: "bg-amber-50" },
];

const competencyGaps: CompetencyGap[] = [
  { requirement: "Trình độ chuyên môn", requiredLevel: "Thạc sĩ trở lên", currentLevel: "Thạc sĩ Luật", status: 'pass' },
  { requirement: "Lý luận chính trị", requiredLevel: "Cao cấp", currentLevel: "Trung cấp", status: 'fail', suggestion: "Cần bố trí học Cao cấp LLCT trong năm 2025 để đủ điều kiện quy hoạch." },
  { requirement: "Quản lý nhà nước", requiredLevel: "Chuyên viên chính", currentLevel: "Chuyên viên", status: 'in-progress', suggestion: "Đang tham gia lớp bồi dưỡng Chuyên viên chính (Dự kiến xong 12/2024)." },
  { requirement: "Quản lý cấp vụ", requiredLevel: "Đã hoàn thành", currentLevel: "Chưa học", status: 'fail', suggestion: "Ưu tiên sắp xếp tham gia khóa bồi dưỡng lãnh đạo cấp Vụ đợt tới." },
];

const detailedHistory: TrainingRecord[] = [
  { id: "1", type: 'specialized', title: "Thạc sĩ Luật Kinh tế", institution: "Đại học Luật Hà Nội", period: "2018 - 2020", result: "Loại Giỏi", status: 'verified', documentUrl: "#" },
  { id: "2", type: 'political', title: "Trung cấp Lý luận chính trị", institution: "Trường Chính trị Tỉnh", period: "2015 - 2016", result: "Hoàn thành", status: 'verified', documentUrl: "#" },
  { id: "3", type: 'management', title: "Bồi dưỡng ngạch Chuyên viên", institution: "Học viện Hành chính Quốc gia", period: "2012", result: "Khá", status: 'verified', documentUrl: "#" },
  { id: "4", type: 'other', title: "Tiếng Anh B1 (Khung Châu Âu)", institution: "Đại học Ngoại ngữ", period: "2021", result: "Đạt", status: 'pending', documentUrl: "#" },
];

const StatusBadge = ({ status }: { status: CompetencyGap['status'] }) => {
  const configs = {
    pass: { label: "Đạt chuẩn", className: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
    fail: { label: "Chưa đạt", className: "bg-rose-50 text-rose-700 border-rose-200", icon: AlertCircle },
    'in-progress': { label: "Đang bồi dưỡng", className: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock }
  };
  const config = configs[status];
  const Icon = config.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border", config.className)}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};

export function TrainingDevelopmentContent() {
  const [activeTab, setActiveTab] = useState<'all' | 'specialized' | 'political' | 'management'>('all');

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Summary Scorecards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {summaryStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className={cn("p-3 rounded-xl", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-lg font-bold text-slate-900 leading-tight">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.subValue}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 2. Competency Gap Analysis */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-indigo-50/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Đối chiếu tiêu chuẩn chức danh</h2>
              <p className="text-xs text-slate-500">Đang đối chiếu với: <span className="font-bold text-indigo-600">Giám đốc Sở (Quy hoạch 2026-2031)</span></p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Mức độ đáp ứng</p>
              <p className="text-xl font-black text-indigo-600">85%</p>
            </div>
            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 w-[85%]" />
            </div>
          </div>
        </div>

        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tiêu chuẩn đào tạo</th>
                <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Yêu cầu chức danh</th>
                <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hiện trạng hồ sơ</th>
                <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Đánh giá</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {competencyGaps.map((gap, idx) => (
                <React.Fragment key={idx}>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-slate-700">{gap.requirement}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{gap.requiredLevel}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{gap.currentLevel}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={gap.status} />
                    </td>
                  </tr>
                  {gap.suggestion && (
                    <tr className="bg-slate-50/30">
                      <td colSpan={4} className="px-6 py-2">
                        <div className="flex items-start gap-2 text-[11px] text-indigo-600 font-medium italic">
                          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          Phân tích hệ thống: {gap.suggestion}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Detailed Training History */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col flex-1">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6 flex-wrap">
            <h2 className="font-bold text-slate-800">Lịch sử Đào tạo - Bồi dưỡng</h2>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')}>Tất cả</TabButton>
              <TabButton active={activeTab === 'specialized'} onClick={() => setActiveTab('specialized')}>Chuyên môn</TabButton>
              <TabButton active={activeTab === 'political'} onClick={() => setActiveTab('political')}>Chính trị</TabButton>
              <TabButton active={activeTab === 'management'} onClick={() => setActiveTab('management')}>QLNN</TabButton>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" className="gap-2 whitespace-nowrap">
              <Download className="w-4 h-4" /> Xuất báo cáo
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="sticky top-0 bg-white z-10 shadow-sm">
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Thời gian</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tên khóa học / Văn bằng</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cơ sở đào tạo</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Kết quả</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Xác thực</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Tài liệu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {detailedHistory.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-bold text-slate-400 font-mono">{record.period}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{record.title}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold mt-0.5">{record.type === 'specialized' ? 'Chuyên môn' : record.type === 'political' ? 'Lý luận chính trị' : 'Quản lý nhà nước'}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.institution}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{record.result}</td>
                  <td className="px-6 py-4 text-center">
                    {record.status === 'verified' ? (
                      <div className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-100 whitespace-nowrap">
                        <CheckCircle2 className="w-3 h-3" /> ĐÃ ĐỐI SOÁT
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 text-slate-400 bg-slate-50 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200 whitespace-nowrap">
                        <Clock className="w-3 h-3" /> CHỜ DUYỆT
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-indigo-50 rounded-lg text-indigo-600 transition-colors">
                      <FileText className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
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
