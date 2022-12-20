import { IncorrectInfo } from './../dtos/Enums/IncorrectInfo.enum';
export const RegisterTableColumns = {
  // member
  work: ['member.work', 'Nơi làm việc'],
  email: ['member.email', 'Email'],
  gender: ['member.gender', 'Giới tính'],
  fullName: ['member.fullName', 'Tên'],
  avatarPath: ['member.avatarPath', 'Ảnh thẻ'],
  phoneNumber: ['member.phoneNumber', 'Số điện thoại'],
  identityCard: ['member.identityCard', 'CCCD'],
  religiousName: ['member.religiousName', 'Pháp danh'],
  facebookAddress: ['member.facebookAddress', 'FB'],
  permanentAddress: ['member.permanentAddress', 'Thường trú'],
  temporaryAddress: ['member.temporaryAddress', 'Tạm trú'],
  identityCardImagePaths: ['member.identityCardImagePaths', 'Ảnh CCCD'],
  exps: ['member.exps', 'Số lần về chùa'],
  dateOfBirth: ['member.dateOfBirth', 'Ngày sinh'],
  organizationStructureId: [
    'member.organizationStructureId',
    'Chúng thanh niên',
  ],
  strongPoints: ['member.strongPoints', 'Sở trường'],

  // register
  receivedClothAt: ['receivedClothAt', 'Thời gian nhận áo'],
  receiveClothStatus: ['receiveClothStatus', 'Trạng thái nhận áo'],
  receiveClothQuantity: ['receiveClothQuantity', 'Số lượng áo'],
  receivedRefugeCert: ['receivedRefugeCert', 'Đăng ký Quy Y'],
  refugeRegistry: ['refugeRegistry', 'Lá phái'],
  registerGroup: ['registerGroup', 'Đoàn'],
  id: ['id', 'ID'],
  memberId: ['memberId', 'Mã thành viên'],
  eventId: ['eventId', 'Đại lễ'],
  code: ['code', 'Mã thẻ'],
  note: ['note', 'Ghi chú'],
  companyNameEN: ['companyNameEN', 'Trường/Cơ quan tiếng anh'],
  startPlaneCode: ['startPlaneCode', 'Mã vé bay đi'],
  companyNameVIE: ['companyNameVIE', 'Trường/Cơ quan tiếng việt'],
  returnPlaneCode: ['returnPlaneCode', 'Mã vé bay về'],
  otherStartAddress: ['otherStartAddress', 'Địa điểm xuất phát khác'],
  otherLeaveAddress: ['otherLeaveAddress', 'Địa điểm trở về khác'],
  eventRegistryPageId: ['eventRegistryPageId', 'Trang đăng ký'],
  area: ['area.name', 'Khu vực'],
  isArrived: ['isArrived', 'Tới chùa'],
  certificateRegistry: ['certificateRegistry', 'Nhận chứng nhận tình nguyện'],
  event: ['event', 'Đại lễ'],
  group: ['group', 'Nhóm'],
  moveType: ['moveType', 'Hình thức di chuyển'],
  endDate: ['endDate', ''],
  position: ['position', 'Vai trò'],
  startDate: ['startDate', ''],
  arrivedAt: ['arrivedAt', 'Thời gian đến chùa'],
  printStatus: ['printStatus', 'Trạng thái in'],
  registerRole: ['registerRole', 'Vai trò đăng ký'],
  assignStatus: ['assignStatus', 'Trạng thái phân ban'],
  clothingSize: ['clothingSize', 'Size áo'],
  otherStartTime: ['otherStartTime', 'Thời gian về chùa khác'],
  otherLeaveTime: ['otherLeaveTime', 'Thời gian rời chùa khác'],
  carBookingType: ['carBookingType', 'Đăng ký ô tô'],
  receiveCardStatus: ['receiveCardStatus', 'Trạng thái nhận thẻ'],
  startTime: ['startTime', 'Về chùa theo CTN'],
  leaveTime: ['leaveTime', 'Rời chùa cùng CTN'],
  registerType: ['registerType', 'Hình thức đăng ký'],
  expDepartments: ['expDepartments', 'Ban kinh nghiệm'],
  wishDepartment: ['wishDepartment', 'Ban nguyện vọng'],
  leader: ['leader', 'Trưởng đoàn'],
  contactStatus: ['contactStatus', 'Liên hệ'],
  departmentDetail: ['departmentDetail.department.name', 'Ban được phân'],
  eventRegistryPage: ['eventRegistryPage', 'Trang đăng ký'],
  receiveCardAddress: ['receiveCardAddress', 'Nơi nhận thẻ'],
  assignAt: ['assignAt', 'Được phân ban lúc'],
  assignBy: ['assignBy', 'Được phân ban bởi'],
  incorrectInfo: ['incorrectInfo', 'Đánh dấu'],
};
type Keys = keyof typeof RegisterTableColumns;
export const getRegisterTableColumns = () => {
  var types = Object.keys(RegisterTableColumns) as Keys[];
  return types.map((k: Keys) => {
    return {
      key: k,
      field: RegisterTableColumns[k][0],
      header: RegisterTableColumns[k][1],
    };
  });
};

export const getColumns = (cols: Keys[]) => {
  return cols.map((colKey) =>
    getRegisterTableColumns().find((c) => c.key === colKey)
  );
};
