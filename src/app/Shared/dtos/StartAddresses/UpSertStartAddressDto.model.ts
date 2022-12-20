import { UpSertAddressDto } from "../UpSertAddressDto.model";
import { UpSertStartTimeDto } from "../StartTimes/UpSertStartTimeDto.model";

export interface UpSertStartAddressDto {
	name?: string ;
	description?: string ;
	times?: UpSertStartTimeDto[] ;
	address?: UpSertAddressDto ;
}
