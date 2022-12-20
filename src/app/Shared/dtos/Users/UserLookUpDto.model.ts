
export interface UserLookUpDto {
	pageSize: number;
	pageIndex: number;
	search?: string ;
	sortMode?: string ;
	includeMember?: boolean;
	includeRoles?: boolean;
	sortBy?: any ;
	role?: number ;
	lock?: boolean ;
	isActive?: boolean ;
}
