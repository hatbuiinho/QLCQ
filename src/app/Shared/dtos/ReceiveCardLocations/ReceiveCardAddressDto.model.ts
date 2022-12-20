import { AddressDto } from "../AddressDto.model";
import { EventDto } from "../EventDto.model";

export interface ReceiveCardAddressDto {
	id: number;
	eventId: number;
	name?: string ;
	address?: string ;
	description?: string ;
	event?: EventDto ;
	ward?: AddressDto ;
	province?: AddressDto ;
	district?: AddressDto ;
}
