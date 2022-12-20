import { AddressDto } from "../AddressDto.model";
import { StartTimeDto } from "../StartTimes/StartTimeDto.model";

export interface StartAddressDto {
	id: number;
	wardId: number;
	provinceId: number;
	districtId: number;
	name?: string ;
	address?: string ;
	description?: string ;
	ward?: AddressDto ;
	province?: AddressDto ;
	district?: AddressDto ;
	times: StartTimeDto[] ;
}