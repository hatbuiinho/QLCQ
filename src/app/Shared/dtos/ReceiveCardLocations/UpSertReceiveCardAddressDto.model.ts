import { UpSertAddressDto } from '../UpSertAddressDto.model';

export interface UpSertReceiveCardAddressDto {
  eventId: number;
  name: string;
  description?: string;
  address?: UpSertAddressDto;
}
