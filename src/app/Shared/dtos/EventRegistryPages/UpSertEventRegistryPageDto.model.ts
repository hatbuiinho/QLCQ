import { ScopeType } from "../Enums/ScopeType.enum";

export interface UpSertEventRegistryPageDto {
	eventId: number;
	name?: string ;
	end: Date;
	start: Date;
	type: ScopeType;
	ctnId?: number ;
	pageContentId?: number ;
	startTimeIds: number[];
	departmentIds: number[];
	exactReceiveCardAddressIds: number[];
}
