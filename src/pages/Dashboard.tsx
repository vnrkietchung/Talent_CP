import React, { useState } from "react";
import { 
  Users, UserCheck, AlertTriangle, CheckCircle2, Brain, ChevronRight, 
  ShieldAlert, TrendingUp, Briefcase, GraduationCap, ArrowRight, Activity,
  BarChart3, PieChart as PieChartIcon, Target, GitMerge
} from "lucide-react";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";
import { cn } from "@/src/lib/utils";
import { TalentProfileDrawer } from "@/src/components/TalentProfileDrawer";

// Mock Data
const kpiData = [
  { title: "Tổng số nhân sự quản lý", value: "12,450", trend: "+2.5%", status: "neutral", icon: Users },
  { title: "Vị trí có người kế nhiệm", value: "68%", trend: "+5.2%", status: "warning", icon: UserCheck },
  { title: "Tỷ lệ thiếu hụt nhân sự", value: "12%", trend: "-1.5%", status: "critical", icon: AlertTriangle },
  { title: "Đạt chuẩn năng lực", value: "85%", trend: "+3.1%", status: "healthy", icon: CheckCircle2 },
];

const talentGaps = [
  { id: "POS-001", title: "Giám đốc Sở Tài chính", org: "UBND Tỉnh A", status: "Thiếu hụt", successors: 0, risk: "Cao" },
  { id: "POS-002", title: "Tổng cục trưởng", org: "Tổng cục Thuế", status: "Nguy cơ", successors: 1, risk: "Trung bình" },
  { id: "POS-003", title: "Giám đốc Sở Kế hoạch & Đầu tư", org: "UBND Tỉnh B", status: "Thiếu hụt", successors: 0, risk: "Cao" },
  { id: "POS-004", title: "Trưởng phòng Ngân sách", org: "Sở Tài chính", status: "Ổn định", successors: 3, risk: "Thấp" },
];

const aiRecommendations = {
  "POS-001": [
    { id: 1, name: "Nguyễn Văn A", position: "Phó Giám đốc Sở Tài chính", score: 95, tags: ["Sẵn sàng (0–6 tháng)", "Tiềm năng cao"], avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=150&h=150&auto=format&fit=crop", highlights: ["15 năm kinh nghiệm", "Lãnh đạo chuyển đổi số", "Chiến sĩ thi đua"], details: { competency: 95, experience: 90, education: 100, performance: 95 }, explanation: "Ứng viên thể hiện năng lực lãnh đạo xuất sắc trong các sáng kiến chuyển đổi số." },
    { id: 2, name: "Trần Thị B", position: "Trưởng phòng Ngân sách", score: 88, tags: ["Sẵn sàng có điều kiện (6–12 tháng)", "Tài chính"], avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=150&h=150&auto=format&fit=crop", highlights: ["Quản lý ngân sách 500 tỷ", "Thạc sĩ Kinh tế", "Chiến sĩ thi đua"], details: { competency: 85, experience: 80, education: 90, performance: 95 }, explanation: "Nền tảng vận hành vững chắc với kết quả đánh giá hiệu suất xuất sắc gần đây." },
    { id: 3, name: "Lê Hoàng C", position: "Chuyên viên Cao cấp", score: 82, tags: ["Nguồn kế cận", "Chuyển đổi số"], avatar: "https://images.unsplash.com/photo-1556157382-97dee2dcb748?q=80&w=150&h=150&auto=format&fit=crop", highlights: ["Tác giả 5 tiêu chuẩn", "Cử nhân Tài chính"], details: { competency: 90, experience: 95, education: 80, performance: 85 }, explanation: "Chuyên môn kỹ thuật vượt trội trong lĩnh vực Chuyển đổi số." },
  ]
};

const pipelineData = {
  readyNow: [
    { id: 1, name: "Nguyễn Văn A", position: "Phó Giám đốc Sở Tài chính", avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=150&h=150&auto=format&fit=crop" },
    { id: 7, name: "Lê Minh Hưng", position: "Thủ tướng Chính phủ", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&h=150&auto=format&fit=crop" },
  ],
  ready1to3: [
    { id: 2, name: "Trần Thị B", position: "Trưởng phòng Ngân sách", avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=150&h=150&auto=format&fit=crop" },
    { id: 5, name: "Lê Thị E", position: "Cục trưởng Cục Thuế", avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=150&h=150&auto=format&fit=crop" },
  ],
  notReady: [
    { id: 3, name: "Lê Hoàng C", position: "Chuyên viên Cao cấp", avatar: "https://images.unsplash.com/photo-1556157382-97dee2dcb748?q=80&w=150&h=150&auto=format&fit=crop" },
    { id: 6, name: "Hoàng Văn F", position: "Phó Cục trưởng Cục Thuế", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&h=150&auto=format&fit=crop" },
  ]
};

const trainingData = [
  { name: 'Lãnh đạo chiến lược', completed: 65, gap: 35 },
  { name: 'Quản lý tài chính', completed: 85, gap: 15 },
  { name: 'Chuyển đổi số', completed: 45, gap: 55 },
  { name: 'Ngoại ngữ', completed: 70, gap: 30 },
];

export function Dashboard() {
  const [selectedGap, setSelectedGap] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [titleFilter, setTitleFilter] = useState("");
  const [competencyFilter, setCompetencyFilter] = useState("");

  const handleViewRecommendations = (id: string) => {
    setSelectedGap(id);
    setSelectedCandidate(null);
    setTitleFilter("");
    setCompetencyFilter("");
    setTimeout(() => {
      document.getElementById('recommendations-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleViewProfile = (candidate: any) => {
    setSelectedCandidate(candidate);
    setIsProfileOpen(true);
  };

  return (
    <div className="h-full overflow-auto p-6 flex flex-col gap-8 bg-slate-50 font-sans">
      
      {/* 1. Executive Overview */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-6 h-6 text-indigo-600" />
            Tổng quan điều hành
          </h2>
          <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-indigo-100">
            <Brain className="w-4 h-4" />
            Phân tích thông minh: Thiếu hụt nhân sự lãnh đạo cấp cao trong lĩnh vực tài chính.
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {kpiData.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    kpi.status === 'healthy' ? "bg-emerald-50 text-emerald-600" :
                    kpi.status === 'warning' ? "bg-amber-50 text-amber-600" :
                    kpi.status === 'critical' ? "bg-rose-50 text-rose-600" :
                    "bg-blue-50 text-blue-600"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-full",
                    kpi.trend.startsWith('+') ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                  )}>
                    {kpi.trend}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500">{kpi.title}</h3>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{kpi.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Talent Gap Alerts */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-600" />
            Cảnh báo thiếu hụt nhân sự
          </h2>
          <div className="bg-rose-50 text-rose-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-rose-100">
            <Brain className="w-4 h-4" />
            Phân tích thông minh: Không có người kế nhiệm sẵn sàng cho các vị trí trọng yếu tại các thành phố lớn.
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Vị trí</th>
                <th className="px-6 py-4 font-semibold">Đơn vị</th>
                <th className="px-6 py-4 font-semibold">Trạng thái</th>
                <th className="px-6 py-4 font-semibold">Số người kế nhiệm</th>
                <th className="px-6 py-4 font-semibold">Mức độ rủi ro</th>
                <th className="px-6 py-4 font-semibold text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {talentGaps.map((gap) => (
                <tr key={gap.id} className={cn("hover:bg-slate-50 transition-colors", gap.risk === 'Cao' && "bg-rose-50/30")}>
                  <td className="px-6 py-4 font-medium text-slate-900">{gap.title}</td>
                  <td className="px-6 py-4 text-slate-600">{gap.org}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium",
                      gap.status === 'Thiếu hụt' ? "bg-rose-100 text-rose-700" :
                      gap.status === 'Nguy cơ' ? "bg-amber-100 text-amber-700" :
                      "bg-emerald-100 text-emerald-700"
                    )}>
                      {gap.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{gap.successors}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "font-semibold",
                      gap.risk === 'Cao' ? "text-rose-600" :
                      gap.risk === 'Trung bình' ? "text-amber-600" :
                      "text-emerald-600"
                    )}>
                      {gap.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleViewRecommendations(gap.id)}
                    className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors cursor-pointer"
                  >
                    Xem đề xuất hệ thống <ArrowRight className="w-4 h-4" />
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Recommendation Preview */}
      {selectedGap && (
        <section id="recommendations-section" className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Target className="w-6 h-6 text-indigo-600" />
              Đề xuất ứng viên kế nhiệm: {talentGaps.find(g => g.id === selectedGap)?.title}
            </h2>

            <div className="flex flex-wrap gap-3 items-center bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Lọc theo:</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-600">Danh hiệu</label>
                <select 
                  value={titleFilter} 
                  onChange={(e) => setTitleFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Tất cả</option>
                  <option value="Chiến sĩ thi đua">Chiến sĩ thi đua</option>
                  <option value="Tiềm năng cao">Tiềm năng cao</option>
                  <option value="Chuyên gia">Chuyên gia</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-600">Năng lực</label>
                <select 
                  value={competencyFilter} 
                  onChange={(e) => setCompetencyFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Tất cả</option>
                  <option value="Lãnh đạo">Lãnh đạo</option>
                  <option value="Tài chính">Tài chính</option>
                  <option value="Chuyển đổi số">Chuyển đổi số</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(aiRecommendations[selectedGap as keyof typeof aiRecommendations] || [])
              .filter(candidate => {
                const matchesTitle = !titleFilter || 
                  candidate.tags.some(t => t.includes(titleFilter)) || 
                  candidate.highlights.some(h => h.includes(titleFilter));
                const matchesCompetency = !competencyFilter || 
                  candidate.tags.some(t => t.includes(competencyFilter)) || 
                  candidate.highlights.some(h => h.includes(competencyFilter)) ||
                  candidate.explanation.includes(competencyFilter);
                return matchesTitle && matchesCompetency;
              })
              .map((candidate) => (
              <div key={candidate.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4 hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={candidate.avatar} alt={candidate.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-100" />
                    <div>
                      <h3 className="font-bold text-slate-900">{candidate.name}</h3>
                      <p className="text-xs text-slate-500">{candidate.position}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100">
                    <span className="text-[10px] text-indigo-600 font-bold uppercase">Điểm đánh giá</span>
                    <span className="text-lg font-bold text-indigo-700 leading-none">{candidate.score}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {candidate.tags.map(tag => {
                    const isReadiness = ["Sẵn sàng (0–6 tháng)", "Sẵn sàng có điều kiện (6–12 tháng)", "Nguồn kế cận"].includes(tag);
                    let tagClass = "bg-indigo-50 text-indigo-700 border-indigo-100";
                    if (tag === "Sẵn sàng (0–6 tháng)") tagClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
                    if (tag === "Sẵn sàng có điều kiện (6–12 tháng)") tagClass = "bg-amber-50 text-amber-700 border-amber-200";
                    if (tag === "Nguồn kế cận") tagClass = "bg-blue-50 text-blue-700 border-blue-200";

                    return (
                      <span key={tag} className={cn(
                        "px-2 py-1 text-[10px] font-bold rounded-md border uppercase tracking-wider flex items-center gap-1",
                        tagClass
                      )}>
                        {isReadiness && <div className={cn("w-1 h-1 rounded-full", 
                          tag === "Sẵn sàng (0–6 tháng)" ? "bg-emerald-500" : 
                          tag === "Sẵn sàng có điều kiện (6–12 tháng)" ? "bg-amber-500" : "bg-blue-500"
                        )} />}
                        {tag}
                      </span>
                    );
                  })}
                </div>

                <ul className="space-y-1.5 mt-2 flex-1">
                  {candidate.highlights.map((h, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-slate-100 flex gap-3 mt-auto">
                  <button 
                    onClick={() => handleViewProfile(candidate)}
                    className="flex-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                  >
                    Xem hồ sơ chi tiết
                  </button>
                  <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                    Thêm vào quy hoạch
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 5. Succession Planning Pipeline */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <GitMerge className="w-6 h-6 text-indigo-600" />
              Lộ trình quy hoạch kế nhiệm
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-6 h-full">
            {/* Ready Now */}
            <div>
              <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" /> Sẵn sàng (0–6 tháng)
              </h3>
              <div className="flex flex-wrap gap-3">
                {pipelineData.readyNow.map(c => (
                  <div key={c.id} className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg shadow-sm cursor-grab hover:border-indigo-300 transition-colors">
                    <img src={c.avatar} className="w-8 h-8 rounded-full" alt="" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{c.name}</p>
                      <p className="text-[10px] text-slate-500">{c.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ready 1-3 Years */}
            <div>
              <h3 className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500" /> Sẵn sàng có điều kiện (6–12 tháng)
              </h3>
              <div className="flex flex-wrap gap-3">
                {pipelineData.ready1to3.map(c => (
                  <div key={c.id} className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg shadow-sm cursor-grab hover:border-indigo-300 transition-colors">
                    <img src={c.avatar} className="w-8 h-8 rounded-full" alt="" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{c.name}</p>
                      <p className="text-[10px] text-slate-500">{c.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Not Ready */}
            <div>
              <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" /> Nguồn kế cận
              </h3>
              <div className="flex flex-wrap gap-3">
                {pipelineData.notReady.map(c => (
                  <div key={c.id} className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg shadow-sm cursor-grab hover:border-indigo-300 transition-colors">
                    <img src={c.avatar} className="w-8 h-8 rounded-full" alt="" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{c.name}</p>
                      <p className="text-[10px] text-slate-500">{c.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Training & Development Insights */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
              Phân tích đào tạo & phát triển
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4 h-full">
            <div className="bg-amber-50 text-amber-800 px-4 py-3 rounded-lg text-sm font-medium flex items-start gap-3 border border-amber-100">
              <Brain className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
              <div>
                <span className="font-bold block mb-1">Phân tích thông minh:</span>
                55% ứng viên tiềm năng cao đang thiếu hụt kỹ năng Chuyển đổi số. Đề xuất mở khóa đào tạo chuyên sâu trong quý tới.
              </div>
            </div>

            <div className="flex-1 min-h-[250px] mt-4">
              <h3 className="text-sm font-bold text-slate-700 mb-4 text-center">Tỷ lệ hoàn thành đào tạo theo năng lực cốt lõi</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trainingData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} width={120} />
                  <RechartsTooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="completed" name="Đã hoàn thành (%)" stackId="a" fill="#4f46e5" radius={[0, 0, 0, 0]} barSize={24} />
                  <Bar dataKey="gap" name="Thiếu hụt (%)" stackId="a" fill="#cbd5e1" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>

      <TalentProfileDrawer 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        candidate={selectedCandidate} 
      />
    </div>
  );
}
