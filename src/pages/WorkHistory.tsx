import React, { useState } from 'react';
import { 
  Clock, Briefcase, Building2, User, FileText, ChevronRight, 
  Filter, Download, Calendar, ArrowLeft, MoreHorizontal,
  CheckCircle2, AlertCircle, HelpCircle, ExternalLink,
  UserCheck, History
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/Button';

// --- Types ---
interface ManagerHistory {
  name: string;
  position: string;
  period: string;
  avatar?: string;
}

interface WorkRecord {
  id: string;
  period: {
    from: string;
    to: string | null; // null means "Present"
  };
  unit: string;
  position: string;
  type: 'primary' | 'concurrent' | 'seconded'; // Chính nhiệm / Kiêm nhiệm / Biệt phái
  status: 'past' | 'current' | 'future';
  decisionNumber: string;
  decisionDate: string;
  managers: ManagerHistory[];
  description: string;
}

// --- Mock Data ---
const civilServant = {
  id: "CC001",
  name: "Nguyễn Văn A",
  dob: "15/05/1985",
  status: "Đang công tác",
  avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=150&h=150&auto=format&fit=crop",
  currentUnit: "Sở Tài chính TP. Hà Nội",
  currentPosition: "Phó Giám đốc"
};

const workHistory: WorkRecord[] = [
  {
    id: "rec-001",
    period: { from: "01/2022", to: null },
    unit: "Sở Tài chính TP. Hà Nội",
    position: "Phó Giám đốc",
    type: 'primary',
    status: 'current',
    decisionNumber: "123/QĐ-UBND",
    decisionDate: "25/12/2021",
    managers: [
      { name: "Trần Văn B", position: "Giám đốc Sở", period: "01/2022 - Nay", avatar: "https://images.unsplash.com/photo-1556157382-97dee2dcb748?q=80&w=100&h=100&auto=format&fit=crop" }
    ],
    description: "Phụ trách khối ngân sách nhà nước và đầu tư công."
  },
  {
    id: "rec-002",
    period: { from: "06/2018", to: null },
    unit: "Đảng bộ Khối các cơ quan Thành phố",
    position: "Ủy viên Ban chấp hành",
    type: 'concurrent',
    status: 'current',
    decisionNumber: "45-NQ/ĐB",
    decisionDate: "15/06/2018",
    managers: [
      { name: "Lê Thị C", position: "Bí thư Đảng ủy", period: "2018 - Nay", avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=100&h=100&auto=format&fit=crop" }
    ],
    description: "Tham gia công tác Đảng tại khối cơ quan."
  },
  {
    id: "rec-003",
    period: { from: "06/2015", to: "12/2021" },
    unit: "Sở Tài chính TP. Hà Nội",
    position: "Trưởng phòng Ngân sách",
    type: 'primary',
    status: 'past',
    decisionNumber: "890/QĐ-STC",
    decisionDate: "20/05/2015",
    managers: [
      { name: "Hoàng Văn D", position: "Giám đốc Sở (Cũ)", period: "2018 - 2021", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&h=100&auto=format&fit=crop" },
      { name: "Nguyễn Thị M", position: "Giám đốc Sở (Cũ)", period: "2015 - 2018", avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=100&h=100&auto=format&fit=crop" }
    ],
    description: "Quản lý và điều hành phòng Ngân sách, xây dựng dự toán hàng năm."
  },
  {
    id: "rec-004",
    period: { from: "01/2010", to: "05/2015" },
    unit: "Phòng Tài chính - Kế hoạch Quận H",
    position: "Phó Trưởng phòng",
    type: 'primary',
    status: 'past',
    decisionNumber: "56/QĐ-UBND-Q",
    decisionDate: "15/12/2009",
    managers: [
      { name: "Phạm Văn K", position: "Trưởng phòng", period: "2010 - 2015" }
    ],
    description: "Hỗ trợ Trưởng phòng quản lý tài chính địa phương."
  }
];

// --- Components ---

const StatusBadge = ({ status }: { status: WorkRecord['status'] }) => {
  const configs = {
    current: { label: "Đang diễn ra", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    past: { label: "Đã kết thúc", className: "bg-slate-100 text-slate-600 border-slate-200" },
    future: { label: "Quy hoạch", className: "bg-amber-50 text-amber-700 border-amber-200" }
  };
  const config = configs[status];
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wider", config.className)}>
      {config.label}
    </span>
  );
};

const TypeBadge = ({ type }: { type: WorkRecord['type'] }) => {
  const configs = {
    primary: { label: "Chính nhiệm", className: "text-blue-600 bg-blue-50 border-blue-100" },
    concurrent: { label: "Kiêm nhiệm", className: "text-purple-600 bg-purple-50 border-purple-100" },
    seconded: { label: "Biệt phái", className: "text-orange-600 bg-orange-50 border-orange-100" }
  };
  const config = configs[type];
  return (
    <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold border uppercase", config.className)}>
      {config.label}
    </span>
  );
};

export function WorkHistory() {
  const [selectedRecord, setSelectedRecord] = useState<WorkRecord | null>(null);

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans overflow-hidden">
      {/* Header Section */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 shadow-sm z-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <History className="w-4 h-4" />
            <span>Hồ sơ công chức</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">Lịch sử công tác</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="gap-2">
              <Download className="w-4 h-4" /> Xuất hồ sơ (2C)
            </Button>
            <Button variant="primary" size="sm" className="gap-2">
              Cập nhật hồ sơ
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <img 
              src={civilServant.avatar} 
              alt={civilServant.name} 
              className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
              <CheckCircle2 className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-slate-900">{civilServant.name}</h1>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-bold rounded border border-slate-200 uppercase">
                {civilServant.id}
              </span>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> Ngày sinh: {civilServant.dob}
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> {civilServant.currentUnit}
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" /> {civilServant.currentPosition}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lọc theo:</span>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Tất cả đơn vị</option>
              <option>Sở Tài chính</option>
              <option>Đảng bộ Khối</option>
            </select>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Tất cả chức vụ</option>
              <option>Lãnh đạo Sở</option>
              <option>Lãnh đạo Phòng</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-slate-500">
            <Filter className="w-4 h-4 mr-2" /> Bộ lọc nâng cao
          </Button>
        </div>
      </div>

      {/* Main Content - Timeline */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-slate-200" />

          <div className="space-y-12">
            {workHistory.map((record, index) => (
              <div key={record.id} className="relative pl-12 group">
                {/* Timeline Node */}
                <div className={cn(
                  "absolute left-0 top-1.5 w-10 h-10 rounded-full border-4 bg-white flex items-center justify-center z-10 transition-all",
                  record.status === 'current' ? "border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]" : "border-slate-200 group-hover:border-indigo-300"
                )}>
                  {record.status === 'current' ? (
                    <Clock className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-indigo-400" />
                  )}
                </div>

                {/* Content Card */}
                <div 
                  className={cn(
                    "bg-white rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl hover:border-indigo-200 cursor-pointer relative overflow-hidden",
                    record.status === 'current' ? "border-emerald-100 shadow-sm" : "border-slate-200"
                  )}
                  onClick={() => setSelectedRecord(record)}
                >
                  {/* Status Ribbon for Current */}
                  {record.status === 'current' && (
                    <div className="absolute top-0 right-0 px-4 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-xl">
                      Hiện tại
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-slate-400 font-mono">
                          {record.period.from} — {record.period.to || "Nay"}
                        </span>
                        <TypeBadge type={record.type} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                        {record.position}
                      </h3>
                      <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        {record.unit}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <StatusBadge status={record.status} />
                      <div className="text-[11px] text-slate-400 font-medium">
                        QĐ: {record.decisionNumber}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                    {/* Managers */}
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Quản lý trực tiếp</p>
                      <div className="flex -space-x-2 overflow-hidden">
                        {record.managers.map((m, i) => (
                          <div key={i} className="relative group/avatar">
                            <img 
                              src={m.avatar || "https://ui-avatars.com/api/?name=" + m.name} 
                              className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                              alt={m.name}
                              title={`${m.name} (${m.period})`}
                            />
                          </div>
                        ))}
                        {record.managers.length > 0 && (
                          <div className="flex items-center ml-4 text-xs text-slate-500 font-medium">
                            {record.managers[0].name} {record.managers.length > 1 && `+${record.managers.length - 1}`}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-end justify-end">
                      <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-bold gap-1">
                        Xem chi tiết <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">Chi tiết quá trình công tác</h2>
                  <p className="text-xs text-slate-500">Mã bản ghi: {selectedRecord.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedRecord(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <XIcon className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <DetailItem label="Thời gian" value={`${selectedRecord.period.from} — ${selectedRecord.period.to || "Nay"}`} icon={<Clock className="w-4 h-4" />} />
                  <DetailItem label="Đơn vị" value={selectedRecord.unit} icon={<Building2 className="w-4 h-4" />} />
                  <DetailItem label="Chức vụ" value={selectedRecord.position} icon={<Briefcase className="w-4 h-4" />} />
                  <DetailItem label="Loại hình" value={<TypeBadge type={selectedRecord.type} />} icon={<HelpCircle className="w-4 h-4" />} />
                </div>
                <div className="space-y-4">
                  <DetailItem label="Số quyết định" value={selectedRecord.decisionNumber} icon={<FileText className="w-4 h-4" />} />
                  <DetailItem label="Ngày ký" value={selectedRecord.decisionDate} icon={<Calendar className="w-4 h-4" />} />
                  <DetailItem label="Trạng thái" value={<StatusBadge status={selectedRecord.status} />} icon={<AlertCircle className="w-4 h-4" />} />
                  <DetailItem 
                    label="Văn bản đính kèm" 
                    value={<span className="text-indigo-600 flex items-center gap-1 cursor-pointer hover:underline">QD_Bo_nhiem.pdf <ExternalLink className="w-3 h-3" /></span>} 
                    icon={<Download className="w-4 h-4" />} 
                  />
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Mô tả nhiệm vụ</h4>
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed border border-slate-100">
                  {selectedRecord.description}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Lịch sử quản lý trực tiếp</h4>
                <div className="space-y-4">
                  {selectedRecord.managers.map((m, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                      <img src={m.avatar || "https://ui-avatars.com/api/?name=" + m.name} className="w-10 h-10 rounded-full object-cover" alt="" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-800">{m.name}</p>
                        <p className="text-xs text-slate-500">{m.position}</p>
                      </div>
                      <div className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded">
                        {m.period}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setSelectedRecord(null)}>Đóng</Button>
              <Button variant="primary" className="gap-2">
                <FileText className="w-4 h-4" /> In trích lục
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value, icon }: { label: string, value: React.ReactNode, icon: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
        {icon} {label}
      </span>
      <div className="text-sm font-semibold text-slate-800">{value}</div>
    </div>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
