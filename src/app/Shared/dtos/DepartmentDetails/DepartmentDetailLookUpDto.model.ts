
export interface DepartmentDetailLookUpDto {
	pageSize: number;
	pageIndex: number;
	sortMode?: string ;
	includeRoles?: boolean;
	includeAreas?: boolean;
	includeMembers?: boolean;
	sortBy?: any ;
	eventId?: number ;
	departmentId?: number ;
}