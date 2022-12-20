import { UpSertAddressDto } from "../UpSertAddressDto.model";

export interface UpSertLeaveAddressDto {
	eventId: number;
	name: string ;
	description?: string ;
	address?: UpSertAddressDto ;
}