
export interface UpdateUserDto {
	memberId: string;
	password?: string ;
	active: boolean;
	roles?: number[];
	permissions?: string[] ;
}