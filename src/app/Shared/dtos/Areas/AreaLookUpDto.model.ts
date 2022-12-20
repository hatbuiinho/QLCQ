export interface AreaLookUpDto {
  pageSize: number;
  pageIndex: number;
  sortMode?: string;
  includeDepartmentDetail?: boolean;
  includeGroups?: boolean;
  includeMembers?: boolean;
  includeRoles?: boolean;
  sortBy?: any;
  eventId?: number;
  departmentDetailId?: number;
}
