export interface CardMemberDto {
    id?: string; // 1
    fullName?: string; // họ và tên: Phạm Hoàng Dủ
    religiousName?: string; // pháp danh: Đồng Khả Nhân
    registerCode?: string; // mã đăng ký: HD1-001, HD2-002, BV-005, HDTN-010
    organzationStuctureName?: string; // tên CTN: CTN TP.HCM, CTN Cần Thơ, CTN Bình Dương, CTN Hà Nội
    avatarPath?: string; // link hình thẻ: https://ctnpq.com/avatar/template.jpg
    departmentCode?: string; // mã ban: HD1, HD2, BV, HDTN,...
    positionType?: string; // chức vụ trong ban: Trưởng ban, Thành viên,...
    qrCodeLink?: string; // mã QR
}