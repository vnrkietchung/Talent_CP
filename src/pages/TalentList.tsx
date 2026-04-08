import { useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/Table";
import { Search, MoreVertical, RefreshCw, Settings, Filter, Edit, Trash2, Copy, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const mockData = [
  { id: 1, code: "NV001", name: "Nguyễn Văn A", email: "nva@gov.vn", position: "Phó Giám đốc Sở Tài chính", department: "Sở Tài chính Hà Nội", status: "Đang làm việc", avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=100&h=100&auto=format&fit=crop" },
  { id: 2, code: "NV002", name: "Trần Thị B", email: "ttb@gov.vn", position: "Trưởng phòng Ngân sách", department: "Sở Tài chính Hà Nội", status: "Đang làm việc", avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=100&h=100&auto=format&fit=crop" },
  { id: 3, code: "NV003", name: "Lê Văn C", email: "lvc@gov.vn", position: "Chuyên gia", department: "Bộ Tài chính", status: "Nghỉ phép", avatar: "https://images.unsplash.com/photo-1556157382-97dee2dcb748?q=80&w=100&h=100&auto=format&fit=crop" },
  { id: 4, code: "NV004", name: "Phạm Thị D", email: "ptd@gov.vn", position: "Phó Vụ trưởng", department: "Bộ Ngoại giao", status: "Đang làm việc", avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=100&h=100&auto=format&fit=crop" },
  { id: 5, code: "NV005", name: "Hoàng Văn E", email: "hve@gov.vn", position: "Chuyên viên", department: "Bộ Nội vụ", status: "Đang làm việc", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&h=100&auto=format&fit=crop" },
];

export function TalentList() {
  return (
    <div className="h-full overflow-auto p-4 flex flex-col gap-4">
      {/* Page Header */}
      <div className="flex items-center justify-between h-[56px] px-4">
        <h2>Danh sách nhân tài</h2>
        <div className="flex items-center gap-2">
          <Button variant="secondary">Nhập từ Excel</Button>
          <Button variant="primary">Thêm mới</Button>
          <Button variant="secondary" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Data Table Container */}
      <div className="bg-white rounded-[8px] misa-shadow flex flex-col">
        {/* Search & Filter Bar */}
        <div className="h-[56px] px-4 py-3 flex items-center justify-between border-b border-border-neutral-light">
          <div className="w-[300px]">
            <Input placeholder="Tìm kiếm theo mã, tên, email..." icon={<Search className="w-4 h-4" />} />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><RefreshCw className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon"><Settings className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon"><Filter className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* Table Content */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <input type="checkbox" className="rounded-[4px] border-border-neutral" />
              </TableHead>
              <TableHead className="w-[60px]">Ảnh</TableHead>
              <TableHead>Mã nhân viên</TableHead>
              <TableHead>Họ và tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Chức vụ</TableHead>
              <TableHead>Đơn vị công tác</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="w-[100px] text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <input type="checkbox" className="rounded-[4px] border-border-neutral" />
                </TableCell>
                <TableCell>
                  <img 
                    src={row.avatar} 
                    alt={row.name} 
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                </TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.position}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-[4px] border border-brand text-brand text-[12px]">
                    {row.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" title="Sửa"><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" title="Nhân bản"><Copy className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" title="Xóa"><Trash2 className="w-4 h-4 text-red-500" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="h-[56px] px-4 flex items-center justify-between border-t border-border-neutral-light text-[13px]">
          <div>Tổng số: <span className="font-semibold">{mockData.length}</span></div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Số dòng/trang:</span>
              <select className="border border-border-neutral rounded-[4px] px-2 py-1 outline-none focus:border-brand">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span>1 - {mockData.length}</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon"><ChevronsLeft className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon"><ChevronLeft className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon"><ChevronRight className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon"><ChevronsRight className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
