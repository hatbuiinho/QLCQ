export interface UpSertAddressDto {
  wardId: number;
  provinceId: number;
  districtId: number;
  address?: string;
}

export class UpSertAddressDto implements UpSertAddressDto {
  wardId: number = 0;
  provinceId: number = 0;
  districtId: number = 0;
  address?: string;
}
