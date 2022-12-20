import { PositionType } from '../Enums/PositionType.enum';
import { RegisterRole } from '../Enums/RegisterRole.enum';

export interface ShortRegisterDto {
  id: string;
  fullName?: string;
  avatarPath?: string;
  phoneNumber?: string;
  religiousName?: string;
  leaderId?: string;
  role: RegisterRole;
  position?: PositionType;
  departmentDetailId?: number;
  areaId?: number;
  groupId?: number;
}
