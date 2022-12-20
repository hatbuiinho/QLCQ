import { MemberDto } from './Members/MemberDto.model';

export interface LoginResponse {
  token?: string;
  expires: Date;
  member?: MemberDto;
  permissions?: string[];
}
