import { DepartmentDetailDto } from '../DepartmentDetails/DepartmentDetailDto.model';
import { GroupDto } from '../Groups/GroupDto.model';
import { EventRegistryDto } from '../EventRegistries/EventRegistryDto.model';
import { ShortRegisterDto } from '../EventRegistries/ShortRegisterDto.model';

export interface AreaDto {
  id: number;
  actualQuantity?: number;
  departmentDetailId: number;
  name: string;
  code: string;
  requiredQuantity?: number;
  groups: GroupDto[];
  registers: EventRegistryDto[];
  roles?: ShortRegisterDto[];
  departmentDetail?: DepartmentDetailDto;
}
