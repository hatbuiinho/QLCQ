import { ShortRegisterDto } from './../EventRegistries/ShortRegisterDto.model';
import { StatusType } from '../Enums/StatusType.enum';
import { DepartmentDto } from '../Departments/DepartmentDto.model';
import { EventDto } from '../EventDto.model';
import { AreaDto } from '../Areas/AreaDto.model';
import { EventRegistryDto } from '../EventRegistries/EventRegistryDto.model';
import { ScopeType } from '../Enums/ScopeType.enum';

export interface DepartmentDetailDto {
  id: number;
  eventId: number;
  actualQuantity?: number;
  note?: string;
  imagePath?: string;
  description?: string;
  isVisible: boolean;
  event?: EventDto;
  type: ScopeType;
  statusId: StatusType;
  departmentId?: number;
  requiredQuantity?: number;
  areas: AreaDto[];
  registers: EventRegistryDto[];
  department?: DepartmentDto;
  roles?: ShortRegisterDto[];
}
