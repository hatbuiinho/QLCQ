import { AreaDto } from '../Areas/AreaDto.model';
import { EventDto } from '../EventDto.model';
import { EventRegistryDto } from '../EventRegistries/EventRegistryDto.model';
import { ShortRegisterDto } from '../EventRegistries/ShortRegisterDto.model';

export interface GroupDto {
  id: number;
  eventId: number;
  name?: string;
  code?: string;
  note?: string;
  description?: string;
  area?: AreaDto;
  event?: EventDto;
  areaId?: number;
  registers: EventRegistryDto[];
  roles?: ShortRegisterDto[];
  leader?: EventRegistryDto;
}
