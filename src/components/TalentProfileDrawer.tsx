import React, { useEffect, useState } from 'react';
import { X, MapPin, Calendar, Briefcase, Award, GraduationCap, TrendingUp, ShieldAlert, ShieldCheck, Brain, ChevronRight, CheckCircle2, Star, Lock, Unlock, AlertTriangle, Info, History, FileText } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as RechartsTooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { cn } from '@/src/lib/utils';
import { TrainingDevelopmentContent } from './TrainingDevelopmentContent';

interface TalentProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: any;
}

// Mock data for the 360 profile
const defaultProfileData = {
  id: 1,
  name: "Nguyễn Văn A",
  position: "Phó Giám đốc Sở Tài chính",
  level: "Cấp Tỉnh/Thành phố",
  age: 45,
  experience: 20,
  location: "Hà Nội",
  tags: ["Lãnh đạo chiến lược", "Chuyên gia kỹ trị", "Tầm ảnh hưởng cao"],
  summary: "Cán bộ quản lý cấp cao với 20 năm kinh nghiệm trong lĩnh vực tài chính công. Có năng lực hoạch định chính sách vĩ mô và lãnh đạo chuyển đổi số toàn diện.",
  avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=150&h=150&auto=format&fit=crop",
  
  timeline: [
    { year: "2020 - Nay", title: "Phó Giám đốc Sở", org: "Sở Tài chính Hà Nội", type: "leadership", highlight: true },
    { year: "2015 - 2020", title: "Trưởng phòng Ngân sách", org: "Sở Tài chính Hà Nội", type: "senior", highlight: false },
    { year: "2010 - 2015", title: "Phó Trưởng phòng", org: "Sở Tài chính Hà Nội", type: "mid", highlight: false },
    { year: "2004 - 2010", title: "Chuyên viên", org: "Sở Tài chính Hà Nội", type: "entry", highlight: false },
  ],

  education: [
    { degree: "Tiến sĩ Chính sách công", school: "Đại học Quốc gia Singapore (NUS)", year: "2018" },
    { degree: "Thạc sĩ Kinh tế", school: "Đại học Kinh tế Quốc dân", year: "2008" },
    { degree: "Cử nhân Tài chính Ngân hàng", school: "Học viện Tài chính", year: "2004" }
  ],

  achievements: [
    "Chủ trì xây dựng Đề án Chuyển đổi số ngành Tài chính giai đoạn 2021-2025.",
    "Tối ưu hóa quy trình phân bổ ngân sách, tiết kiệm 15% chi phí hành chính.",
    "Đạt danh hiệu Chiến sĩ thi đua cấp Tỉnh 3 năm liên tiếp (2021, 2022, 2023)."
  ],

  domains: ["Tài chính công", "Chính sách vĩ mô", "Quản trị rủi ro", "Chuyển đổi số"],

  competencies: [
    { subject: 'Lãnh đạo chiến lược', A: 95, fullMark: 100 },
    { subject: 'Quản lý tài chính', A: 98, fullMark: 100 },
    { subject: 'Ra quyết định', A: 90, fullMark: 100 },
    { subject: 'Quản trị rủi ro', A: 88, fullMark: 100 },
    { subject: 'Đổi mới sáng tạo', A: 92, fullMark: 100 },
  ],

  performanceHistory: [
    { year: '2019', score: 85 },
    { year: '2020', score: 88 },
    { year: '2021', score: 92 },
    { year: '2022', score: 95 },
    { year: '2023', score: 96 },
  ],

  aiInsights: {
    strengths: [
      "Năng lực lãnh đạo vĩ mô xuất sắc, đặc biệt trong quản lý tài chính công.",
      "Tư duy hệ thống tốt, khả năng thích ứng cao với chuyển đổi số."
    ],
    pattern: "Lộ trình thăng tiến ổn định từ chuyên viên lên quản lý cấp cao (Chuyên gia kỹ trị → Lãnh đạo chiến lược).",
    potentialRoles: ["Giám đốc Sở Tài chính", "Phó Chủ tịch UBND phụ trách Kinh tế"],
    risk: {
      level: "Thấp",
      explanation: "Lịch sử công tác minh bạch, không có vi phạm kỷ luật. Sức khỏe tốt, độ tuổi phù hợp cho quy hoạch dài hạn."
    }
  }
};

export function TalentProfileDrawer({ isOpen, onClose, candidate }: TalentProfileDrawerProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRendered, setIsRendered] = useState(false);

  const profileData = candidate ? {
    ...defaultProfileData,
    id: candidate.id,
    name: candidate.name,
    position: candidate.position,
    tags: candidate.tags,
    avatar: candidate.avatar,
    summary: candidate.explanation,
    age: candidate.age || defaultProfileData.age,
    experience: candidate.experience || defaultProfileData.experience,
    location: candidate.location || defaultProfileData.location,
    level: candidate.level || defaultProfileData.level,
    timeline: candidate.timeline || defaultProfileData.timeline,
    education: candidate.education || defaultProfileData.education,
    achievements: candidate.achievements || defaultProfileData.achievements,
    domains: candidate.domains || defaultProfileData.domains,
    competencies: candidate.competencies || [
      { subject: 'Năng lực', A: candidate.details?.competency || 90, fullMark: 100 },
      { subject: 'Kinh nghiệm', A: candidate.details?.experience || 90, fullMark: 100 },
      { subject: 'Học vấn', A: candidate.details?.education || 90, fullMark: 100 },
      { subject: 'Hiệu suất', A: candidate.details?.performance || 90, fullMark: 100 },
      { subject: 'Lãnh đạo', A: candidate.details?.leadership || 92, fullMark: 100 },
    ],
    aiInsights: candidate.aiInsights || {
      ...defaultProfileData.aiInsights,
      strengths: candidate.highlights || defaultProfileData.aiInsights.strengths,
    }
  } : defaultProfileData;

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => setIsRendered(false), 300);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div 
        className={cn(
          "relative w-full max-w-[1200px] bg-[#F8FAFC] h-full shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header - Profile Identity */}
        <div className="bg-white px-8 py-6 border-b border-slate-200 shrink-0">
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-6 items-center">
              <div className="relative">
                <img src={profileData.avatar} alt={profileData.name} className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-md" />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm" title="Đã xác thực">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-slate-900">{profileData.name}</h1>
                <p className="text-base font-medium text-slate-600">{profileData.position}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {profileData.experience} năm kinh nghiệm</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {profileData.age} tuổi</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {profileData.location}</span>
                  <span className="flex items-center gap-1.5"><Award className="w-4 h-4" /> {profileData.level}</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-slate-500" />
            </button>
          </div>
          
          <div className="flex items-start justify-between gap-8">
            <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
              {profileData.summary}
            </p>
            <div className="flex flex-wrap gap-2 justify-end max-w-md">
              {profileData.tags.map(tag => {
                const isReadiness = ["Sẵn sàng (0–6 tháng)", "Sẵn sàng có điều kiện (6–12 tháng)", "Nguồn kế cận"].includes(tag);
                let tagClass = "bg-indigo-50 text-indigo-700 border-indigo-100";
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
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-6 border-b border-slate-200">
            {['overview', 'performance', 'training', 'rewards', 'party'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-3 text-sm font-semibold transition-colors relative",
                  activeTab === tab ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {tab === 'overview' && 'Hồ sơ 360°'}
                {tab === 'performance' && 'Lịch sử đánh giá'}
                {tab === 'training' && 'Đào tạo – bồi dưỡng và theo dõi phát triển cán bộ'}
                {tab === 'rewards' && 'Khen thưởng & kỷ luật'}
                {tab === 'party' && 'Liên kết hồ sơ đảng viên'}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-12 gap-8 h-full">
              
              {/* Left Panel - Career Timeline */}
              <div className="col-span-3 flex flex-col gap-4">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-500" />
                  Lộ trình công danh
                </h3>
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex-1">
                  <div className="relative border-l-2 border-slate-100 ml-3 mt-2 space-y-8">
                    {profileData.timeline.map((item, idx) => (
                      <div key={idx} className="relative pl-6">
                        <div className={cn(
                          "absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 bg-white",
                          item.highlight ? "border-indigo-500 ring-4 ring-indigo-50" : "border-slate-300"
                        )} />
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold text-indigo-600">{item.year}</span>
                          <span className="text-sm font-bold text-slate-800">{item.title}</span>
                          <span className="text-xs text-slate-500">{item.org}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Panel - Core Profile */}
              <div className="col-span-5 flex flex-col gap-6">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    Thành tích nổi bật
                  </h3>
                  <ul className="space-y-3">
                    {profileData.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-500" />
                    Trình độ học vấn
                  </h3>
                  <div className="space-y-4">
                    {profileData.education.map((edu, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                          <GraduationCap className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">{edu.degree}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">{edu.school} • {edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-purple-500" />
                    Lĩnh vực chuyên môn
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.domains.map((domain, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-slate-50 text-slate-700 text-sm rounded-lg border border-slate-200">
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel - Insights */}
              <div className="col-span-4 flex flex-col gap-6">
                <div className="bg-indigo-900 rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Brain className="w-24 h-24" />
                  </div>
                  <h3 className="text-sm font-bold text-indigo-200 uppercase tracking-wider mb-4 flex items-center gap-2 relative z-10">
                    <Brain className="w-4 h-4" />
                    Phân tích năng lực hệ thống
                  </h3>
                  
                  <div className="h-56 -ml-4 relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="65%" data={profileData.competencies}>
                        <PolarGrid stroke="rgba(255,255,255,0.2)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 11 }} />
                        <Radar name="Năng lực" dataKey="A" stroke="#818cf8" fill="#6366f1" fillOpacity={0.6} />
                        <RechartsTooltip contentStyle={{ backgroundColor: '#1e1b4b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-4 space-y-4 relative z-10">
                    <div>
                      <h4 className="text-xs font-semibold text-indigo-300 uppercase mb-2">Điểm mạnh cốt lõi</h4>
                      <ul className="space-y-2">
                        {profileData.aiInsights.strengths.map((str, idx) => (
                          <li key={idx} className="text-sm text-indigo-50 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                            {str}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-indigo-300 uppercase mb-2">Đề xuất quy hoạch</h4>
                      <div className="flex flex-wrap gap-2">
                        {profileData.aiInsights.potentialRoles.map((role, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-indigo-800/50 text-indigo-100 text-xs rounded border border-indigo-700">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-500" />
                    Chỉ số rủi ro: <span className="text-emerald-600">{profileData.aiInsights.risk.level}</span>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {profileData.aiInsights.risk.explanation}
                  </p>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'performance' && (
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm h-full">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">Biểu đồ hiệu suất qua các năm</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={profileData.performanceHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} dot={{ r: 6, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'training' && (
            <TrainingDevelopmentContent />
          )}

          {activeTab === 'rewards' && (
            <div className="flex flex-col gap-6 h-full">
              {/* (A) TỔNG QUAN & TRẠNG THÁI */}
              <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trạng thái kỷ luật tổng hợp</p>
                    <p className="text-sm font-bold text-emerald-700">Không có kỷ luật trong thời gian hiệu lực</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Dữ liệu được xác thực bởi Ban Tổ chức Trung ương</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Thống kê khen thưởng</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900">08</span>
                    <span className="text-xs text-slate-500 font-medium">lần</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Cấp cao nhất: <span className="font-bold text-indigo-600">Trung ương</span></p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Cập nhật gần nhất</p>
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-bold text-slate-700">08/04/2024</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Năm khen thưởng cuối: <span className="font-bold">2023</span></p>
                </div>
              </section>

              <div className="grid grid-cols-12 gap-6">
                {/* Left Column: Rewards & Discipline */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                  
                  {/* (B) KHEN THƯỞNG */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-500" />
                        DANH SÁCH KHEN THƯỞNG
                      </h3>
                      <button className="text-[10px] font-bold text-indigo-600 hover:underline uppercase tracking-widest">Xem tất cả</button>
                    </div>
                    <div className="p-0">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50/30 border-b border-slate-100">
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Năm</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hình thức & Cấp ban hành</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Số quyết định</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            { year: '2023', title: 'Huân chương Lao động hạng Ba', type: 'Huân chương', level: 'Trung ương', decision: '123/QĐ-CTN', reason: 'Thành tích xuất sắc trong công tác 2018-2022' },
                            { year: '2020', title: 'Bằng khen của Thủ tướng Chính phủ', type: 'Bằng khen', level: 'Trung ương', decision: '456/QĐ-TTg', reason: 'Triển khai hệ thống quản lý tài chính công mới' },
                            { year: '2021', title: 'Chiến sĩ thi đua cấp Tỉnh', type: 'Danh hiệu', level: 'Tỉnh', decision: '789/QĐ-UBND', reason: 'Hoàn thành xuất sắc nhiệm vụ năm 2021' }
                          ].map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                              <td className="px-6 py-4 text-sm font-bold text-slate-400 font-mono">{item.year}</td>
                              <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-slate-800">{item.title}</span>
                                    <span className={cn(
                                      "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter border",
                                      item.level === 'Trung ương' ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-blue-50 text-blue-700 border-blue-200"
                                    )}>
                                      {item.level}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-500 line-clamp-1 italic">Lý do: {item.reason}</p>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                  <FileText className="w-3.5 h-3.5 text-slate-300" />
                                  {item.decision}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* (C) KỶ LUẬT (TRẠNG THÁI & KIỂM SOÁT) */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-rose-500" />
                        THÔNG TIN KỶ LUẬT
                      </h3>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                        <Lock className="w-3 h-3" />
                        Chế độ bảo mật
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 border-dashed flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                          <ShieldAlert className="w-6 h-6 text-slate-300" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-700 mb-1">Hồ sơ kỷ luật đã hết thời hạn hiệu lực</h4>
                        <p className="text-xs text-slate-500 max-w-sm mb-4">
                          Thông tin chi tiết về hành vi kỷ luật đã được ẩn theo quy định về bảo mật hồ sơ cán bộ.
                        </p>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                          <Unlock className="w-3.5 h-3.5" />
                          Yêu cầu quyền truy cập chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Impact Assessment */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                  {/* (D) ĐÁNH GIÁ TÁC ĐỘNG ĐẾN CÔNG TÁC CÁN BỘ */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full">
                    <div className="px-6 py-4 border-b border-slate-100 bg-indigo-50/30">
                      <h3 className="text-sm font-bold text-indigo-900 flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        ĐÁNH GIÁ TÁC ĐỘNG
                      </h3>
                    </div>
                    <div className="p-6 space-y-6">
                      {[
                        { label: 'Ảnh hưởng đến quy hoạch', status: 'pass', desc: 'Đủ tiêu chuẩn chính trị, đạo đức.' },
                        { label: 'Ảnh hưởng đến bổ nhiệm', status: 'warning', desc: 'Cần thẩm tra kỹ thành tích gần nhất.' },
                        { label: 'Ảnh hưởng đến luân chuyển', status: 'pass', desc: 'Không có rào cản kỷ luật.' }
                      ].map((impact, idx) => (
                        <div key={idx} className="flex flex-col gap-2 group relative">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-700">{impact.label}</span>
                            <div className={cn(
                              "w-3 h-3 rounded-full ring-4",
                              impact.status === 'pass' ? "bg-emerald-500 ring-emerald-50" : 
                              impact.status === 'warning' ? "bg-amber-500 ring-amber-50" : "bg-rose-500 ring-rose-50"
                            )} />
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <p className="text-[11px] text-slate-500 leading-relaxed">{impact.desc}</p>
                          </div>
                          
                          {/* Tooltip emulation */}
                          <div className="absolute -top-8 right-0 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-lg">
                            {impact.status === 'pass' ? 'Không ảnh hưởng' : impact.status === 'warning' ? 'Cần xem xét' : 'Không đủ điều kiện'}
                          </div>
                        </div>
                      ))}

                      <div className="pt-4 border-t border-slate-100">
                        <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-xl border border-amber-100">
                          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-amber-900 mb-1">Lưu ý tham mưu</p>
                            <p className="text-[10px] text-amber-700 leading-relaxed">
                              Cán bộ có 01 kỷ luật đã hết hiệu lực (2015). Tuy nhiên, thành tích khen thưởng từ 2018-2023 rất xuất sắc, thể hiện sự nỗ lực khắc phục và vươn lên.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'party' && (
            <div className="bg-white rounded-xl p-12 border border-slate-200 shadow-sm h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Liên kết hồ sơ đảng viên</h3>
              <p className="text-slate-500 max-w-md">Vui lòng xác thực tài khoản để liên kết dữ liệu với Cơ sở dữ liệu Đảng viên Trung ương.</p>
              <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors">
                Xác thực ngay
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
