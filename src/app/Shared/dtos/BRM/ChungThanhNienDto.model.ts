export interface ChungThanhNienDto {
  id: number;
  sort: number;
  type: number;
  status: number;
  parentId?: number;
  perDelId?: number;
  provinceId?: number;
  name?: string;
  districtIds?: string;
  deleteReason?: string;
}
