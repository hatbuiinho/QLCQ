import { MemberDto } from "../Members/MemberDto.model";

export interface UserDto {
	memberId: string;
	id: number;
	email?: string ;
	username?: string ;
	phoneNumber?: string ;
	member?: MemberDto ;
	roles?: number[];
}