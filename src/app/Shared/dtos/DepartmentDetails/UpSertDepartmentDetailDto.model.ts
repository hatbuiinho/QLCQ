import { ScopeType } from "../Enums/ScopeType.enum";

export interface UpSertDepartmentDetailDto {
	eventId: number;
	departmentId: number;
	note?: string ;
	imagePath?: string ;
	description?: string ;
	isVisible: boolean;
	type: ScopeType;
	requiredQuantity?: number ;
}