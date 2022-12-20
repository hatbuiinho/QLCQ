import { ReceiveCardAddressDto } from 'src/app/Shared/dtos/ReceiveCardLocations/ReceiveCardAddressDto.model';
import { ScopeType } from "../Enums/ScopeType.enum";
import { EventRegistryPageContentDto } from "../EventRegistryPageContents/EventRegistryPageContentDto.model";
import { EventDto } from "../EventDto.model";
import { StartAddressDto } from "../StartAddresses/StartAddressDto.model";
import { LeaveAddressDto } from "../LeaveAddresses/LeaveAddressDto.model";
import { DepartmentDto } from "../Departments/DepartmentDto.model";

export interface EventRegistryPageDto {
  scopeCtn?: string;
	eventId: number;
	id: string ;
	name?: string ;
	ctnName?: string ;
	districtIds?: string ;
	end: Date;
	start: Date;
	event?: EventDto ;
	type: ScopeType;
	ctnId?: number ;
	provinceId?: number ;
	registerCount?: number ;
	pageContentId?: number ;
	departments: DepartmentDto[] ;
	departmentIds: number[];
	startAddresses: StartAddressDto[] ;
	leaveAddresses: LeaveAddressDto[] ;
	receiveCardAddresses: ReceiveCardAddressDto[] ;
	pageContent?: EventRegistryPageContentDto ;
}
