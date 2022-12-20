import { Gender } from '../Enums/Gender.enum';
import { UpSertAddressDto } from '../UpSertAddressDto.model';
import { EventExp } from '../Enums/EventExp.enum';
import { PhanLoaiThanhNien } from '../Enums/PhanLoaiThanhNien.enum';
import { UpSertEventRegistryDto } from '../EventRegistries/UpSertEventRegistryDto.model';

export interface UpSertMemberDto {
  work?: string;
  email?: string;
  gender: Gender;
  fullName?: string;
  avatarPath?: string;
  phoneNumber?: string;
  identityCard?: string;
  religiousName?: string;
  facebookAddress?: string;
  identityCardImagePaths?: string[];
  exps: EventExp;
  ctnType?: PhanLoaiThanhNien;
  dateOfBirth?: Date;
  organizationStructureId?: number;
  strongPointIds: number[];
  permanentAddress?: UpSertAddressDto;
  temporaryAddress?: UpSertAddressDto;
  register?: UpSertEventRegistryDto;
}
