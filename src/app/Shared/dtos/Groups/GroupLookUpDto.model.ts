export interface GroupLookUpDto {
  pageSize?: number;
  pageIndex?: number;
  sortMode?: string;
  includeMembers?: boolean;
	includeRoles?: boolean;
  sortBy?: any;
  areaId?: number;
  eventId?: number;
  departmentId?: number;
  includeDepartment?: boolean;
}
