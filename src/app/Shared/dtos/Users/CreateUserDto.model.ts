
export interface CreateUserDto {
	memberId: string;
	username?: string ;
	password?: string ;
	active?: boolean;
	roles?: number[];
	permissions?: string[] ;
}