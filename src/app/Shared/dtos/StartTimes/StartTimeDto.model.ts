import { EventDto } from "../EventDto.model";
import { StartAddressDto } from "../StartAddresses/StartAddressDto.model";

export interface StartTimeDto {
	id: number;
	eventId: number;
	addressId: number;
	note?: string ;
	name?: string ;
	time: Date;
	event?: EventDto ;
	address?: StartAddressDto ;
}
