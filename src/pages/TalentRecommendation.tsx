import React, { useState } from 'react';
import { Brain, Search, SlidersHorizontal, CheckCircle2, Zap, Briefcase, GraduationCap, Award, ChevronRight, X, TrendingUp, UserPlus, ChevronDown, AlertCircle } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { cn } from '@/src/lib/utils';
import { TalentProfileDrawer } from '@/src/components/TalentProfileDrawer';

const positions = [
  {
    "positionId": "POS-001",
    "title": "Giám đốc Sở Tài chính",
    "code": "GDS-TC",
    "level": "Tỉnh",
    "organizationType": "Sở",
    "domain": ["Tài chính công", "Ngân sách nhà nước"],
    "jobGroup": "Lãnh đạo quản lý",
    "reportTo": "UBND Tỉnh",
    "minAge": 40,
    "maxAge": 55,
    "minExperienceYears": 10,
    "educationRequirement": "Thạc sĩ trở lên",
    "requiredCompetencies": [
      "Lãnh đạo chiến lược",
      "Quản lý tài chính",
      "Ra quyết định",
      "Quản trị rủi ro"
    ],
    "specialConditions": [
      "Đã qua quy hoạch",
      "Đã giữ chức vụ tương đương hoặc phó",
      "Có kinh nghiệm địa phương"
    ],
    "kpiGroups": [
      "Hiệu quả ngân sách",
      "Quản lý chi tiêu công",
      "Minh bạch tài chính"
    ]
  },
  {
    "positionId": "POS-002",
    "title": "Phó Giám đốc Sở Tài chính",
    "code": "PGDS-TC",
    "level": "Tỉnh",
    "organizationType": "Sở",
    "domain": ["Tài chính công"],
    "jobGroup": "Lãnh đạo quản lý",
    "reportTo": "Giám đốc Sở",
    "minAge": 35,
    "maxAge": 50,
    "minExperienceYears": 8,
    "educationRequirement": "Đại học trở lên",
    "requiredCompetencies": [
      "Quản lý tài chính",
      "Phân tích số liệu",
      "Điều phối công việc"
    ],
    "specialConditions": [
      "Nằm trong quy hoạch",
      "Có kinh nghiệm quản lý cấp phòng"
    ],
    "kpiGroups": [
      "Hiệu quả công việc",
      "Tiến độ xử lý ngân sách"
    ]
  },
  {
    "positionId": "POS-003",
    "title": "Trưởng phòng Ngân sách",
    "code": "TP-NS",
    "level": "Tỉnh",
    "organizationType": "Sở",
    "domain": ["Ngân sách nhà nước"],
    "jobGroup": "Quản lý cấp trung",
    "reportTo": "Phó Giám đốc Sở",
    "minAge": 30,
    "maxAge": 45,
    "minExperienceYears": 5,
    "educationRequirement": "Đại học Tài chính/Kế toán",
    "requiredCompetencies": [
      "Phân tích ngân sách",
      "Lập kế hoạch",
      "Báo cáo tài chính"
    ],
    "specialConditions": [
      "Có chứng chỉ nghiệp vụ tài chính",
      "Kinh nghiệm quản lý nhóm"
    ],
    "kpiGroups": [
      "Độ chính xác dự toán",
      "Tiến độ báo cáo"
    ]
  },
  {
    "positionId": "POS-004",
    "title": "Chuyên viên Tài chính",
    "code": "CV-TC",
    "level": "Nhân viên",
    "organizationType": "Sở",
    "domain": ["Tài chính"],
    "jobGroup": "Chuyên môn",
    "reportTo": "Trưởng phòng",
    "minAge": 22,
    "maxAge": 40,
    "minExperienceYears": 2,
    "educationRequirement": "Đại học",
    "requiredCompetencies": [
      "Phân tích số liệu",
      "Excel/BI",
      "Hiểu quy định tài chính"
    ],
    "specialConditions": [],
    "kpiGroups": [
      "Chất lượng báo cáo",
      "Thời gian xử lý công việc"
    ]
  },
  {
    "positionId": "POS-005",
    "title": "Bộ trưởng Bộ Tài chính",
    "code": "BT-BTC",
    "level": "Quốc gia",
    "organizationType": "Bộ",
    "domain": ["Tài chính vĩ mô", "Chính sách tài khóa"],
    "jobGroup": "Lãnh đạo cấp cao",
    "reportTo": "Thủ tướng Chính phủ",
    "minAge": 50,
    "maxAge": 65,
    "minExperienceYears": 20,
    "educationRequirement": "Tiến sĩ",
    "requiredCompetencies": [
      "Tầm nhìn chiến lược quốc gia",
      "Quản trị rủi ro vĩ mô",
      "Ngoại giao kinh tế"
    ],
    "specialConditions": [
      "Ủy viên Trung ương Đảng",
      "Đã qua luân chuyển địa phương"
    ],
    "kpiGroups": [
      "Tăng trưởng kinh tế",
      "An toàn nợ công"
    ]
  },
  {
    "positionId": "POS-006",
    "title": "Thứ trưởng Bộ Tài chính",
    "code": "TT-BTC",
    "level": "Quốc gia",
    "organizationType": "Bộ",
    "domain": ["Quản lý ngân sách", "Thuế"],
    "jobGroup": "Lãnh đạo cấp cao",
    "reportTo": "Bộ trưởng",
    "minAge": 45,
    "maxAge": 60,
    "minExperienceYears": 15,
    "educationRequirement": "Thạc sĩ trở lên",
    "requiredCompetencies": [
      "Điều hành vĩ mô",
      "Chỉ đạo thực tiễn",
      "Xây dựng pháp luật"
    ],
    "specialConditions": [
      "Quy hoạch cấp chiến lược",
      "Kinh nghiệm quản lý cấp Tổng cục/Cục"
    ],
    "kpiGroups": [
      "Hiệu quả thu chi ngân sách",
      "Cải cách hành chính"
    ]
  },
  {
    "positionId": "POS-007",
    "title": "Cục trưởng Cục Thuế",
    "code": "CT-CT",
    "level": "Tổng cục/Cục",
    "organizationType": "Cục",
    "domain": ["Quản lý thuế", "Thanh tra tài chính"],
    "jobGroup": "Lãnh đạo quản lý",
    "reportTo": "Thứ trưởng phụ trách",
    "minAge": 40,
    "maxAge": 55,
    "minExperienceYears": 12,
    "educationRequirement": "Thạc sĩ",
    "requiredCompetencies": [
      "Quản lý thu ngân sách",
      "Chuyển đổi số ngành thuế",
      "Thanh tra kiểm tra"
    ],
    "specialConditions": [
      "Kinh nghiệm ngành thuế > 10 năm",
      "Đã giữ chức vụ Phó Cục trưởng"
    ],
    "kpiGroups": [
      "Hoàn thành chỉ tiêu thu",
      "Mức độ hài lòng của doanh nghiệp"
    ]
  }
];

const candidates = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    position: "Phó Giám đốc Sở Tài chính",
    score: 95,
    tags: ["Tiềm năng cao", "Sẵn sàng (0–6 tháng)"],
    highlights: ["15 năm kinh nghiệm khu vực công", "Lãnh đạo chuyển đổi số ngành tài chính", "Tiến sĩ Chính sách công"],
    avatar: "https://i.postimg.cc/0b5SkBjL/2026-04-07-21-33-47.png",
    details: {
      competency: 95,
      experience: 90,
      education: 100,
      performance: 95
    },
    explanation: "Ứng viên thể hiện năng lực lãnh đạo xuất sắc trong các sáng kiến chuyển đổi số. Được đề xuất cao cho vị trí Giám đốc Sở nhờ thành tích đã được chứng minh trong việc điều phối liên ngành."
  },
  {
    id: 2,
    name: "Trần Thị B",
    position: "Trưởng phòng Ngân sách",
    score: 88,
    tags: ["Ngôi sao đang lên", "Sẵn sàng có điều kiện (6–12 tháng)"],
    highlights: ["10 năm kinh nghiệm quản lý cấp phòng", "Quản lý thành công ngân sách 500 tỷ", "Thạc sĩ Kinh tế"],
    avatar: "https://i.postimg.cc/jLqfxF2B/2026-04-07-21-33-58.png",
    details: {
      competency: 85,
      experience: 80,
      education: 90,
      performance: 95
    },
    explanation: "Nền tảng vận hành vững chắc với kết quả đánh giá hiệu suất xuất sắc gần đây. Cho thấy tiềm năng lớn cho các vai trò lãnh đạo cao hơn nhưng có thể cần thêm kinh nghiệm thực tiễn ở cấp Sở."
  },
  {
    id: 3,
    name: "Lê Hoàng C",
    position: "Chuyên viên Cao cấp",
    score: 82,
    tags: ["Chuyên gia kỹ thuật"],
    highlights: ["20 năm kinh nghiệm chuyên sâu", "Tác giả 5 tiêu chuẩn quốc gia", "Cử nhân Tài chính"],
    avatar: "https://i.postimg.cc/SJQ9SvRB/2026-04-07-21-34-16.png",
    details: {
      competency: 90,
      experience: 95,
      education: 80,
      performance: 85
    },
    explanation: "Chuyên môn kỹ thuật vượt trội trong lĩnh vực. Phù hợp nhất cho các vai trò cố vấn hoặc lãnh đạo chuyên môn thay vì quản lý điều hành chung."
  },
  {
    id: 4,
    name: "Phạm Văn D",
    position: "Thứ trưởng Thường trực Bộ Tài chính",
    score: 98,
    tags: ["Tầm nhìn vĩ mô", "Quy hoạch Bộ trưởng"],
    highlights: ["25 năm kinh nghiệm quản lý nhà nước", "Chủ trì đàm phán tài chính quốc tế", "Tiến sĩ Kinh tế học"],
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&h=150&auto=format&fit=crop",
    details: {
      competency: 98,
      experience: 100,
      education: 100,
      performance: 96
    },
    explanation: "Ứng viên có năng lực hoạch định chính sách vĩ mô xuất sắc. Đã kinh qua các vị trí trọng yếu ở cả địa phương và trung ương. Hoàn toàn đáp ứng các tiêu chuẩn khắt khe cho vị trí Bộ trưởng."
  },
  {
    id: 5,
    name: "Lê Thị E",
    position: "Cục trưởng Cục Thuế",
    score: 94,
    tags: ["Chuyên gia điều hành", "Nữ lãnh đạo"],
    highlights: ["Lãnh đạo số hóa toàn diện ngành Thuế", "Vượt 15% chỉ tiêu thu ngân sách 3 năm liền", "Thạc sĩ Tài chính công"],
    avatar: "https://i.postimg.cc/bsYnyBrW/2026-04-07-21-34-32.png",
    details: {
      competency: 95,
      experience: 90,
      education: 95,
      performance: 98
    },
    explanation: "Nữ lãnh đạo có thành tích điều hành thực tiễn ấn tượng. Năng lực chuyển đổi số và quản lý sự thay đổi rất cao. Là ứng viên sáng giá cho vị trí Thứ trưởng phụ trách khối thu."
  },
  {
    id: 6,
    name: "Hoàng Văn F",
    position: "Phó Cục trưởng Cục Thuế",
    score: 89,
    tags: ["Kinh nghiệm thực tiễn", "Nguồn kế cận"],
    highlights: ["15 năm công tác trong ngành Thuế", "Xây dựng hệ thống hóa đơn điện tử", "Thạc sĩ Quản trị Kinh doanh"],
    avatar: "https://i.postimg.cc/yk6R1bxQ/2026-04-07-21-34-50.png",
    details: {
      competency: 88,
      experience: 92,
      education: 85,
      performance: 90
    },
    explanation: "Cán bộ quản lý có chuyên môn sâu và khả năng thực thi xuất sắc. Đã chứng minh được năng lực qua các dự án trọng điểm. Phù hợp để kế nhiệm vị trí Cục trưởng."
  },
  {
    id: 7,
    name: "Lê Minh Hưng",
    position: "Thủ tướng Chính phủ",
    score: 99,
    tags: ["Lãnh đạo cấp cao", "Sẵn sàng (0–6 tháng)", "Tầm nhìn chiến lược"],
    highlights: ["Thống đốc NHNN trẻ nhất lịch sử", "Kinh nghiệm quản lý cán bộ cấp cao", "Nền tảng kinh tế - tài chính vững chắc"],
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&h=150&auto=format&fit=crop",
    details: {
      competency: 100,
      experience: 98,
      education: 95,
      performance: 99,
      leadership: 100
    },
    explanation: "Nhà lãnh đạo kỹ trị xuất sắc với nền tảng kinh tế - tài chính - chính sách công vững chắc. Đã kinh qua các vị trí trọng yếu từ Ngân hàng Nhà nước đến Trung ương Đảng, thể hiện năng lực điều hành vĩ mô và thiết kế chính sách nhân sự chiến lược.",
    age: 56,
    experience: 33,
    location: "Hà Nội",
    level: "Cấp Quốc gia",
    timeline: [
      { year: "2026 - Nay", title: "Thủ tướng Chính phủ", org: "Chính phủ nước CHXHCN Việt Nam", type: "leadership", highlight: true },
      { year: "2024 - 2026", title: "Trưởng Ban Tổ chức Trung ương", org: "Ban Chấp hành Trung ương Đảng", type: "leadership", highlight: true },
      { year: "2020 - 2024", title: "Chánh Văn phòng Trung ương Đảng", org: "Ban Chấp hành Trung ương Đảng", type: "leadership", highlight: false },
      { year: "2016 - 2020", title: "Thống đốc", org: "Ngân hàng Nhà nước Việt Nam", type: "leadership", highlight: true },
      { year: "1993 - 2016", title: "Chuyên viên đến Phó Thống đốc", org: "Ngân hàng Nhà nước Việt Nam", type: "senior", highlight: false },
    ],
    education: [
      { degree: "Thạc sĩ Kinh tế", school: "Đại học Saitama, Nhật Bản", year: "1997" },
      { degree: "Cử nhân Ngoại ngữ / Kinh tế", school: "Đại học tại Việt Nam", year: "1993" }
    ],
    achievements: [
      "Trở thành Thống đốc Ngân hàng Nhà nước trẻ nhất lịch sử ở tuổi 46.",
      "Quản lý công tác cán bộ cấp cao và thiết kế chính sách nhân sự chiến lược tại Ban Tổ chức Trung ương.",
      "Lãnh đạo điều hành chính sách tiền tệ, hợp tác quốc tế (IMF, WB, ADB) hiệu quả."
    ],
    domains: ["Kinh tế vĩ mô", "Tài chính - Ngân hàng", "Chính sách công", "Tổ chức cán bộ"],
    aiInsights: {
      strengths: [
        "Nền tảng kỹ trị vững chắc, kết hợp giữa chuyên môn kinh tế và kinh nghiệm chính trị.",
        "Năng lực quản lý cán bộ cấp cao và thiết kế chính sách chiến lược.",
        "Kinh nghiệm làm việc quốc tế sâu rộng (IMF, WB, ADB)."
      ],
      pattern: "Lộ trình thăng tiến đột phá từ chuyên gia kỹ trị (NHNN) sang lãnh đạo chính trị cấp cao (Trung ương Đảng, Chính phủ).",
      potentialRoles: ["Thủ tướng Chính phủ", "Lãnh đạo chủ chốt của Đảng và Nhà nước"],
      risk: {
        level: "Rất thấp",
        explanation: "Hồ sơ công tác xuất sắc, uy tín cao trong Đảng và Nhà nước. Năng lực đã được kiểm chứng qua nhiều vị trí trọng yếu."
      }
    }
  }
];

export function TalentRecommendation() {
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0]);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [selectedPosition, setSelectedPosition] = useState(positions[0].positionId);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [titleFilter, setTitleFilter] = useState("");
  const [competencyFilter, setCompetencyFilter] = useState("");

  const filteredCandidates = candidates.filter(candidate => {
    const matchesTitle = !titleFilter || 
      candidate.tags.some(t => t.includes(titleFilter)) || 
      candidate.highlights.some(h => h.includes(titleFilter));
    const matchesCompetency = !competencyFilter || 
      candidate.tags.some(t => t.includes(competencyFilter)) || 
      candidate.highlights.some(h => h.includes(competencyFilter)) ||
      candidate.explanation.includes(competencyFilter);
    return matchesTitle && matchesCompetency;
  });

  const toggleCompare = (id: number) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(c => c !== id));
    } else {
      if (compareList.length < 3) setCompareList([...compareList, id]);
    }
  };

  return (
    <div className="flex h-full w-full bg-slate-50 text-slate-800 font-sans">
      {/* Left Sidebar - Filters */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full shadow-sm z-10">
        <div className="p-4 border-b border-slate-200 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
          <h2 className="font-semibold text-base text-slate-800">Tham số hệ thống</h2>
        </div>
        <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-5">
          {/* Target Position */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Vị trí mục tiêu</label>
            <div className="relative">
              <select 
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {positions.map(pos => (
                  <option key={pos.positionId} value={pos.positionId}>{pos.title}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Level */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cấp độ</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Cấp Quốc gia</option>
              <option>Cấp Tỉnh/Thành phố</option>
              <option>Cấp Bộ/Ngành</option>
            </select>
          </div>

          {/* Title/Award Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Danh hiệu (Title/Award)</label>
            <select 
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Tất cả</option>
              <option value="Chiến sĩ thi đua">Chiến sĩ thi đua</option>
              <option value="Tiềm năng cao">Tiềm năng cao</option>
              <option value="Chuyên gia">Chuyên gia</option>
            </select>
          </div>

          {/* Competency Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Năng lực (Competency)</label>
            <select 
              value={competencyFilter}
              onChange={(e) => setCompetencyFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Tất cả</option>
              <option value="Lãnh đạo">Lãnh đạo</option>
              <option value="Tài chính">Tài chính</option>
              <option value="Chuyển đổi số">Chuyển đổi số</option>
            </select>
          </div>

          {/* Age Range */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Độ tuổi: 35 - 55</label>
            <input type="range" min="25" max="65" className="w-full accent-indigo-600" />
          </div>

          {/* Experience */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Số năm kinh nghiệm tối thiểu</label>
            <input type="number" placeholder="10" className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col gap-3 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" defaultChecked />
              <span className="text-sm text-slate-700">Nằm trong quy hoạch</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" defaultChecked />
              <span className="text-sm text-slate-700">Đã luân chuyển công tác</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" />
              <span className="text-sm text-slate-700">Đã hoàn thành đào tạo cao cấp</span>
            </label>
          </div>
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer">
            <Brain className="w-4 h-4" />
            Tạo đề xuất hệ thống
          </button>
        </div>
      </div>

      {/* Center - Candidate List */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between shadow-sm z-10">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Bảng xếp hạng ứng viên</h1>
            <p className="text-sm text-slate-500">Tìm thấy 24 ứng viên phù hợp cao dựa trên các tham số đã chọn</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Sắp xếp theo:</span>
            <select className="px-3 py-1.5 border border-slate-200 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Điểm phù hợp</option>
              <option>Kinh nghiệm</option>
              <option>Hiệu suất gần đây</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 pb-24">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map(candidate => (
              <div 
                key={candidate.id} 
                onClick={() => setSelectedCandidate(candidate)}
                onDoubleClick={() => {
                  setSelectedCandidate(candidate);
                  setIsProfileOpen(true);
                }}
                className={cn(
                  "bg-white rounded-xl border p-5 cursor-pointer transition-all duration-200 hover:shadow-md flex gap-5 group",
                  selectedCandidate.id === candidate.id ? "border-indigo-500 shadow-md ring-1 ring-indigo-500" : "border-slate-200"
                )}
              >
                <div className="flex flex-col items-center gap-2">
                  <img 
                    src={candidate.avatar} 
                    alt={candidate.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCandidate(candidate);
                      setIsProfileOpen(true);
                    }}
                  />
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Điểm đánh giá</span>
                    <span className="text-2xl font-bold text-indigo-600 leading-none">{candidate.score}</span>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 
                        className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors cursor-pointer hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCandidate(candidate);
                          setIsProfileOpen(true);
                        }}
                      >
                        {candidate.name}
                      </h3>
                      <p className="text-sm text-slate-600 font-medium">{candidate.position}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {candidate.tags.map(tag => {
                        const isReadiness = ["Sẵn sàng (0–6 tháng)", "Sẵn sàng có điều kiện (6–12 tháng)", "Nguồn kế cận"].includes(tag);
                        let tagClass = "bg-indigo-50 text-indigo-700 border-indigo-100";
                        if (tag === "Sẵn sàng (0–6 tháng)") tagClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
                        if (tag === "Sẵn sàng có điều kiện (6–12 tháng)") tagClass = "bg-amber-50 text-amber-700 border-amber-200";
                        if (tag === "Nguồn kế cận") tagClass = "bg-blue-50 text-blue-700 border-blue-200";

                        return (
                          <span key={tag} className={cn("px-2.5 py-1 text-[10px] font-bold rounded-full flex items-center gap-1 border uppercase tracking-wider", tagClass)}>
                            {isReadiness ? <div className={cn("w-1.5 h-1.5 rounded-full", 
                              tag === "Sẵn sàng (0–6 tháng)" ? "bg-emerald-500" : 
                              tag === "Sẵn sàng có điều kiện (6–12 tháng)" ? "bg-amber-500" : "bg-blue-500"
                            )} /> : <Zap className="w-3 h-3" />}
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="mt-2 flex flex-col gap-1.5">
                    {candidate.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end border-l border-slate-100 pl-5 ml-2 min-w-[160px]">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="relative w-full">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(openDropdownId === candidate.id ? null : candidate.id);
                        }}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer whitespace-nowrap"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        Đề xuất
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      
                      {openDropdownId === candidate.id && (
                        <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-xl z-30 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                          <button 
                            onClick={(e) => { e.stopPropagation(); alert(`Đề xuất quy hoạch: ${candidate.name}`); setOpenDropdownId(null); }}
                            className="w-full text-left px-3 py-2 text-[11px] font-medium hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 transition-colors"
                          >
                            Quy hoạch
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); alert(`Đề xuất bổ nhiệm: ${candidate.name}`); setOpenDropdownId(null); }}
                            className="w-full text-left px-3 py-2 text-[11px] font-medium hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 transition-colors border-t border-slate-50"
                          >
                            Bổ nhiệm
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); alert(`Đề xuất luân chuyển: ${candidate.name}`); setOpenDropdownId(null); }}
                            className="w-full text-left px-3 py-2 text-[11px] font-medium hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 transition-colors border-t border-slate-50"
                          >
                            Luân chuyển
                          </button>
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleCompare(candidate.id); }}
                      className={cn(
                        "w-full px-3 py-1.5 rounded-md text-xs font-medium transition-colors border cursor-pointer whitespace-nowrap",
                        compareList.includes(candidate.id) 
                          ? "bg-indigo-50 text-indigo-700 border-indigo-200" 
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      )}
                    >
                      {compareList.includes(candidate.id) ? "Đã thêm so sánh" : "So sánh"}
                    </button>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCandidate(candidate);
                      setIsProfileOpen(true);
                    }}
                    className="flex items-center gap-1 text-[11px] font-medium text-indigo-600 hover:text-indigo-800 transition-colors mt-4"
                  >
                    Xem hồ sơ 360° <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
              <Search className="w-16 h-16 opacity-20" />
              <div className="text-center">
                <p className="font-bold text-slate-600">Không tìm thấy ứng viên phù hợp</p>
                <p className="text-sm">Vui lòng điều chỉnh lại các tham số lọc</p>
              </div>
            </div>
          )}
        </div>

        {/* Comparison Bottom Bar */}
        {compareList.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_15px_rgba(0,0,0,0.05)] p-4 flex items-center justify-between z-20">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-slate-800">Đã chọn {compareList.length}/3 để so sánh</span>
              <div className="flex gap-2">
                {compareList.map(id => {
                  const c = candidates.find(cand => cand.id === id);
                  return c ? (
                    <div key={id} className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-sm">
                      <img src={c.avatar} className="w-5 h-5 rounded-full" alt="" />
                      <span className="font-medium text-slate-700">{c.name}</span>
                      <X className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-slate-600" onClick={() => toggleCompare(id)} />
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            <button 
              disabled={compareList.length < 2}
              className="bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors shadow-sm cursor-pointer"
            >
              Xem bảng so sánh
            </button>
          </div>
        )}
      </div>

      {/* Right Panel - Phân tích hệ thống */}
      <div className="w-96 bg-white border-l border-slate-200 flex flex-col h-full shadow-sm z-10">
        <div className="p-5 border-b border-slate-200 bg-indigo-50/50">
          <div className="flex items-center gap-2 text-indigo-600 mb-1">
            <Brain className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wide uppercase">Phân tích hệ thống</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800">{selectedCandidate.name}</h2>
          <p className="text-sm text-slate-500">{selectedCandidate.position}</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
          {/* Đối chiếu tiêu chuẩn chức danh */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2 uppercase tracking-tight">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Đối chiếu tiêu chuẩn chức danh
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Lý luận chính trị
                </span>
                <span className="font-bold text-emerald-600">Đạt</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Quản lý nhà nước
                </span>
                <span className="font-bold text-emerald-600">Đạt</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" /> Đào tạo chức danh tương đương
                </span>
                <span className="font-bold text-amber-600">Chưa đủ</span>
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-500" />
              Chi tiết năng lực
            </h3>
            <div className="h-64 bg-white rounded-xl border border-slate-100 p-2 shadow-sm">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                  { subject: 'Năng lực', A: selectedCandidate.details.competency, fullMark: 100 },
                  { subject: 'Kinh nghiệm', A: selectedCandidate.details.experience, fullMark: 100 },
                  { subject: 'Học vấn', A: selectedCandidate.details.education, fullMark: 100 },
                  { subject: 'Hiệu suất', A: selectedCandidate.details.performance, fullMark: 100 },
                  { subject: 'Lãnh đạo', A: 92, fullMark: 100 },
                ]}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Radar name={selectedCandidate.name} dataKey="A" stroke="#4f46e5" fill="#6366f1" fillOpacity={0.4} />
                  <RechartsTooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Phân tích lý do đề xuất */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Lý do đề xuất
            </h3>
            <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100 text-sm text-slate-700 leading-relaxed shadow-sm">
              {selectedCandidate.explanation}
            </div>
          </div>

          {/* Key Strengths */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              Điểm mạnh cốt lõi
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Kinh nghiệm dày dặn</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Hơn 15 năm làm việc trong các vai trò khu vực công có liên quan với trách nhiệm tăng dần.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Học vấn chuyên sâu</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Sở hữu bằng Tiến sĩ, phù hợp hoàn hảo với các yêu cầu chiến lược của vị trí.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TalentProfileDrawer 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        candidate={selectedCandidate} 
      />
    </div>
  );
}

