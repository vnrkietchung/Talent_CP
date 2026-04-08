import React from 'react';
import { 
  GraduationCap, Award, BookOpen, ShieldCheck, 
  CheckCircle2, AlertCircle, Clock, FileText, 
  Brain, TrendingUp, Target, UserCheck, ChevronRight,
  ShieldAlert, Activity, BarChart3
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer, Tooltip as RechartsTooltip, 
  LineChart, Line, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/Button';

// --- Mock Data ---
const roadmapMilestones = [
  { 
    period: "6 tháng", 
    title: "Bồi dưỡng lãnh đạo cấp Vụ", 
    org: "Học viện Hành chính Quốc gia", 
    status: "Đang thực hiện", 
    color: "bg-amber-500",
    desc: "Hoàn thiện kỹ năng quản lý nhà nước và điều hành vĩ mô."
  },
  { 
    period: "12 tháng", 
    title: "Cao cấp Lý luận chính trị", 
    org: "Học viện CTQG Hồ Chí Minh", 
    status: "Đề xuất", 
    color: "bg-blue-500",
    desc: "Chuẩn hóa tiêu chuẩn chính trị cho quy hoạch cấp chiến lược."
  },
  { 
    period: "24 tháng", 
    title: "Kèm cặp: Thứ trưởng phụ trách", 
    org: "Bộ Tài chính", 
    status: "Đề xuất", 
    color: "bg-indigo-500",
    desc: "Trực tiếp tham gia điều hành các dự án trọng điểm quốc gia."
  },
  { 
    period: "36 tháng", 
    title: "Đào tạo thực tế tại địa phương", 
    org: "Luân chuyển địa phương", 
    status: "Đề xuất", 
    color: "bg-emerald-500",
    desc: "Rèn luyện năng lực điều hành thực tiễn tại cơ sở."
  },
];

const trainingHistory = [
  { 
    id: "1", 
    title: "Thạc sĩ Chính sách công", 
    period: "2018 - 2020", 
    institution: "Đại học Quốc gia Singapore", 
    result: "Xuất sắc", 
    competency: "Hoạch định chiến lược",
    status: "verified" 
  },
  { 
    id: "2", 
    title: "Bồi dưỡng Chuyên viên cao cấp", 
    period: "2021", 
    institution: "Học viện Hành chính Quốc gia", 
    result: "Giỏi", 
    competency: "Quản lý nhà nước",
    status: "verified" 
  },
  { 
    id: "3", 
    title: "Anh văn C1 (IELTS 7.5)", 
    period: "2022", 
    institution: "British Council", 
    result: "Đạt", 
    competency: "Hội nhập quốc tế",
    status: "verified" 
  },
];

const competencyProgress = [
  { subject: 'Chính trị', A: 85, fullMark: 100 },
  { subject: 'Chuyên môn', A: 95, fullMark: 100 },
  { subject: 'Lãnh đạo', A: 90, fullMark: 100 },
  { subject: 'Thực tiễn', A: 75, fullMark: 100 },
  { subject: 'Đạo đức', A: 100, fullMark: 100 },
];

const performanceTrend = [
  { year: '2020', score: 82 },
  { year: '2021', score: 85 },
  { year: '2022', score: 92 },
  { year: '2023', score: 95 },
  { year: '2024', score: 96 },
];

export function TrainingDevelopmentContent() {
  return (
    <div className="flex flex-col gap-8">
      
      {/* 1. Khối ĐỊNH HƯỚNG & LỘ TRÌNH PHÁT TRIỂN */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider">
            <Target className="w-4 h-4 text-indigo-600" />
            Định hướng & Lộ trình phát triển cán bộ
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Tiêu chuẩn chức danh:</span>
            <span className="text-xs font-bold text-indigo-600">Vụ trưởng / Thứ trưởng</span>
          </div>
        </div>
        <div className="p-8">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10">
              {roadmapMilestones.map((milestone, idx) => (
                <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left group">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-[10px] mb-4 shadow-md transition-all group-hover:shadow-lg group-hover:-translate-y-1",
                    milestone.color
                  )}>
                    {milestone.period}
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-50 transition-all w-full flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className={cn(
                        "text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider border shadow-sm",
                        milestone.status === 'Hoàn thành' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        milestone.status === 'Đang thực hiện' ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-slate-50 text-slate-600 border-slate-200"
                      )}>
                        {milestone.status}
                      </div>
                      <ShieldCheck className="w-4 h-4 text-slate-300" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{milestone.title}</h4>
                    <p className="text-[11px] text-slate-500 font-medium mb-3">{milestone.org}</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed italic mb-4 flex-1">{milestone.desc}</p>
                    <Button variant="secondary" size="sm" className="w-full text-[10px] font-bold uppercase tracking-wider py-2 h-auto border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all">
                      Đăng ký học
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: History & Multi-dimensional progress */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          
          {/* 2. Khối THEO DÕI THỰC HIỆN & KẾT QUẢ ĐÀO TẠO */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                Kết quả đào tạo & bồi dưỡng
              </h3>
              <Button variant="secondary" size="sm" className="h-7 text-[10px] uppercase font-bold">Xem chứng chỉ</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/30 border-b border-slate-100">
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Khóa học / Văn bằng</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Đơn vị đào tạo</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kết quả</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Năng lực liên quan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {trainingHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-800">{item.title}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.period}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{item.institution}</td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-emerald-600">{item.result}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded border border-indigo-100">
                          {item.competency}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Khối THEO DÕI SỰ PHÁT TRIỂN ĐA CHIỀU */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider">
                <Activity className="w-4 h-4 text-rose-500" />
                Theo dõi sự phát triển đa chiều
              </h3>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  <TrendingUp className="w-3 h-3" /> XU HƯỚNG: CẢI THIỆN
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Competency Radar */}
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                    <Brain className="w-3.5 h-3.5 text-indigo-500" />
                    Tiến bộ năng lực
                  </h4>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={competencyProgress}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                        <Radar name="Năng lực" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.5} />
                        <RechartsTooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Performance Trend */}
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                    <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
                    Hiệu suất công tác
                  </h4>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceTrend} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                        <YAxis hide domain={[0, 100]} />
                        <RechartsTooltip />
                        <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Evaluation Metrics */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Chính trị tư tưởng", status: "Tốt", trend: "up" },
                  { label: "Đạo đức lối sống", status: "Mẫu mực", trend: "stable" },
                  { label: "Ý thức kỷ luật", status: "Nghiêm túc", trend: "stable" },
                  { label: "Tác phong lề lối", status: "Chuẩn mực", trend: "up" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{item.label}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">{item.status}</span>
                      {item.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <div className="w-3 h-0.5 bg-slate-300 rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: AI Insights & Recommendations */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          
          {/* 4. Khối NHẬN ĐỊNH & ĐỀ XUẤT PHỤC VỤ THAM MƯU */}
          <section className="bg-indigo-900 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Brain className="w-24 h-24" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Nhận định & Đề xuất tham mưu
              </h3>

              <div className="space-y-6 flex-1">
                <div>
                  <h4 className="text-[11px] font-bold text-indigo-200 uppercase mb-3 flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5" />
                    Mức độ sẵn sàng
                  </h4>
                  <div className="space-y-3">
                    {[
                      { label: "Quy hoạch", value: 95, status: "Sẵn sàng" },
                      { label: "Bổ nhiệm", value: 88, status: "Đủ điều kiện" },
                      { label: "Luân chuyển", value: 75, status: "Cần trải nghiệm" },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-[10px] font-bold mb-1">
                          <span>{item.label}</span>
                          <span className="text-indigo-300">{item.status} ({item.value}%)</span>
                        </div>
                        <div className="h-1.5 bg-indigo-950 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-400" style={{ width: `${item.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                  <h4 className="text-[11px] font-bold text-indigo-200 uppercase mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Gợi ý hệ thống
                  </h4>
                  <ul className="space-y-2">
                    <li className="text-[11px] text-indigo-50 flex items-start gap-2 leading-relaxed">
                      <div className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      Đủ điều kiện xem xét quy hoạch cấp chiến lược.
                    </li>
                    <li className="text-[11px] text-indigo-50 flex items-start gap-2 leading-relaxed">
                      <div className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      Cần bổ sung bồi dưỡng thực tế tại địa phương trong 12 tháng tới.
                    </li>
                  </ul>
                </div>

                <div className="bg-emerald-500/20 p-4 rounded-xl border border-emerald-500/30">
                  <p className="text-[11px] font-bold text-emerald-300 mb-1 italic">Nhận định tổng hợp:</p>
                  <p className="text-[10px] text-emerald-50 leading-relaxed">
                    Cán bộ có sự phát triển ổn định, năng lực chuyên môn và chính trị đều ở mức xuất sắc. Trọng tâm tiếp theo là rèn luyện bản lĩnh điều hành tại cơ sở để hoàn thiện hồ sơ bổ nhiệm Thứ trưởng.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Button className="w-full bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs h-10 gap-2">
                  Phục vụ kỳ xem xét cán bộ <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

