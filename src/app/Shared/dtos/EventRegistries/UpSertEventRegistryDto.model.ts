import { MoveType } from "../Enums/MoveType.enum";
import { PositionType } from "../Enums/PositionType.enum";
import { RegisterRole } from "../Enums/RegisterRole.enum";
import { CarBookingType } from "../Enums/CarBookingType.enum";
import { RegisterType } from "../Enums/RegisterType.enum";
import { ClothingSize } from "../Enums/ClothingSize.enum";

export interface UpSertEventRegistryDto {
	memberId: string;
	eventId: number;
	note?: string ;
	companyNameEN?: string ;
	startPlaneCode?: string ;
	companyNameVIE?: string ;
	returnPlaneCode?: string ;
	otherStartAddress?: string ;
	otherLeaveAddress?: string ;
	eventRegistryPageId?: string ;
	certificateRegistry?: boolean;
	moveType: MoveType;
	endDate?: Date ;
	position?: PositionType ;
	leaderId?: string ;
	startDate?: Date ;
	startTimeId?: number ;
	leaveTimeId?: number ;
	registerRole?: RegisterRole ;
	clothingSize?: ClothingSize ;
	otherStartTime?: Date ;
	otherLeaveTime?: Date ;
	carBookingType?: CarBookingType ;
	wishDepartmentId?: number ;
	receiveCardAddressId?: number ;
	registerType: RegisterType;
	expDepartmentIds: number[];
}