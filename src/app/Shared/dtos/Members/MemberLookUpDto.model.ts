import { Gender } from "../Enums/Gender.enum";

export interface MemberLookUpDto {
	pageSize: number;
	pageIndex: number;
	name?: string ;
	cccd?: string ;
	email?: string ;
	phapDanh?: string ;
	sortMode?: string ;
	noiLamViec?: string ;
	soDienThoai?: string ;
	includeArea?: boolean;
	includeGroup?: boolean;
	includeDepartment?: boolean;
	includeRegistration?: boolean;
	sortBy?: any ;
	areaId?: number ;
	eventId?: number ;
	groupId?: number ;
	gioiTinh?: Gender ;
	departmentDetailId?: number ;
}
