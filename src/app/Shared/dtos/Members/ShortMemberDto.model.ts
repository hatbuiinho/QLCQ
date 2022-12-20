import { Gender } from '../Enums/Gender.enum';

export interface ShortMemberDto {
  id: string;
  email?: string;
  gender: Gender;
  fullName?: string;
  avatarPath?: string;
  phoneNumber?: string;
  religiousName?: string;
  facebookAddress?: string;
  dateOfBirth?: Date;
}
