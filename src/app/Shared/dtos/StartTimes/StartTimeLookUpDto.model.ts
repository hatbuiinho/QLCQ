
export interface StartTimeLookUpDto {
	pageSize: number;
	pageIndex: number;
	sortMode?: string ;
	sortBy?: any ;
	end?: Date ;
	start?: Date ;
	eventId?: number ;
	addressId?: number ;
}