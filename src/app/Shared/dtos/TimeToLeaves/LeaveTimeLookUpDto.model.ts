
export interface LeaveTimeLookUpDto {
	pageSize: number;
	pageIndex: number;
	sortMode?: string ;
	sortBy?: any ;
	end?: Date ;
	start?: Date ;
	addressId?: number ;
}