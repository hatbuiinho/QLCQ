import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FilterMatchMode, MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Toolbar } from 'primeng/toolbar';
import { AreaDto } from '../../dtos/Areas/AreaDto.model';
import { DepartmentDetailDto } from '../../dtos/DepartmentDetails/DepartmentDetailDto.model';
import { DepartmentDetailLookUpDto } from '../../dtos/DepartmentDetails/DepartmentDetailLookUpDto.model';
import { DepartmentDto } from '../../dtos/Departments/DepartmentDto.model';
import { AssignType } from '../../dtos/Enums/AssignType.enum';
import { StatusType } from '../../dtos/Enums/StatusType.enum';
import { EventDto } from '../../dtos/EventDto.model';
import { GroupDto } from '../../dtos/Groups/GroupDto.model';
import { GroupLookUpDto } from '../../dtos/Groups/GroupLookUpDto.model';
import { CustomMessageServiceService } from '../../Services/custom-message-service.service';
import { AreasService } from '../../Services/http/Areas.service';
import { DepartmentDetailsService } from '../../Services/http/DepartmentDetails.service';
import { GroupService } from '../../Services/http/Group.service';

@Component({
  selector: 'app-assigment-toolbar',
  templateUrl: './assigment-toolbar.component.html',
  styleUrls: ['./assigment-toolbar.component.css'],
})
export class AssigmentToolbarComponent implements OnInit, OnChanges {
  @Input() table!: Table;
  @Input() assignType?: AssignType;

  @ViewChild('toolbar') toolbar!: Toolbar;

  /* show crud popup */
  private _showCrudPopup: boolean = false;
  @Input() public set showCrudPopup(showCrudPopup: boolean) {
    this._showCrudPopup = showCrudPopup;
    this.showCrudPopupChange.emit(this._showCrudPopup);
  }
  @Output() public showCrudPopupChange = new EventEmitter<boolean>();

  /* is view only */
  private _isViewOnly: boolean = false;
  @Input() public set isViewOnly(isViewOnly: boolean) {
    this._isViewOnly = isViewOnly;
    this.isViewOnlyChange.emit(this._isViewOnly);
  }
  @Output() public isViewOnlyChange = new EventEmitter<boolean>();

  /*event*/
  private _selectedEvent?: EventDto;
  @Input() public set selectedEvent(value: EventDto | undefined) {
    if (value && value != this._selectedEvent) {
      this.loadDepartmentDetails(value);
    }
    this._selectedEvent = value;
    this._selectedDepartment = undefined;
    this.selectedEventChange.emit(value);
  }
  @Output() public selectedEventChange = new EventEmitter<EventDto>();
  public get selectedEvent(): EventDto | undefined {
    return this._selectedEvent;
  }

  /* departmentDetails */
  private _departmentDetails?: DepartmentDetailDto[] = [];
  @Input() public set departmentDetails(departments: DepartmentDetailDto[]) {
    this._departmentDetails = departments || [];
    this.departmentDetailsChange.emit(this._departmentDetails);
  }
  @Output() public departmentDetailsChange = new EventEmitter<
    DepartmentDetailDto[]
  >();
  public get departmentDetails() {
    return this._departmentDetails || [];
  }

  /* selected Department */
  private _selectedDepartment?: DepartmentDetailDto;
  @Input() public set selectedDepartment(
    department: DepartmentDetailDto | undefined
  ) {
    this._selectedDepartment = department;
    this.selectedDepartmentChange.emit(this._selectedDepartment);
  }
  @Output() public selectedDepartmentChange = new EventEmitter<
    DepartmentDetailDto | undefined
  >();
  public get selectedDepartment() {
    return this._selectedDepartment;
  }

  /* selected Area */
  private _selectedArea?: AreaDto;
  @Input() public set selectedArea(area: AreaDto | undefined) {
    this._selectedArea = area;
    console.log('area in toolbar', area);

    this.selectedAreaChange.emit(this._selectedArea);
  }
  @Output() public selectedAreaChange = new EventEmitter<AreaDto | undefined>();
  public get selectedArea() {
    return this._selectedArea;
  }

  /* selected Group */
  private _selectedGroup?: GroupDto;
  @Input() public set selectedGroup(group: GroupDto | undefined) {
    this._selectedGroup = group;
    this.selectedAreaChange.emit(this._selectedArea);
  }
  @Output() public selectedGroupChange = new EventEmitter<
    GroupDto | undefined
  >();
  public get selectedGroup() {
    return this._selectedGroup;
  }

  /* is Assign */
  private _isAssign: boolean = false;
  @Input() public set isAssign(isAssign: boolean) {
    this._isAssign = isAssign;
    this.isAssignChange.emit(this._isAssign);
  }
  @Output() public isAssignChange = new EventEmitter<boolean>();

  /* areas */
  private _areas: AreaDto[] = [];
  @Input() public set areas(isAssign: AreaDto[]) {
    this._areas = isAssign;
    this.areasChange.emit(this._areas);
  }
  @Output() public areasChange = new EventEmitter<AreaDto[]>();
  public get areas() {
    return this._areas;
  }

  /* groups */
  private _groups: GroupDto[] = [];
  @Input() public set groups(groups: GroupDto[]) {
    this._groups = groups;
    this.groupsChange.emit(this._groups);
  }
  @Output() public groupsChange = new EventEmitter<GroupDto[]>();
  public get groups() {
    return this._groups;
  }

  public StatusType = StatusType;
  public FilterMatchMode = FilterMatchMode;
  public AssignType = AssignType;
  public remainDepartments: DepartmentDto[] = [];
  public loading: boolean = false;
  public formVisible: boolean = false;
  public detailVisible: boolean = false;
  public selectedDeptDetails: DepartmentDetailDto[] = [];
  public selectedDeptDetail: DepartmentDetailDto | undefined;
  public events: EventDto[] = [];
  public manageOptions: MenuItem[] = [];
  public actionLabel!: string;
  public targetLabel!: string;

  // dialogDepartment
  private _dialogDeparment?: DepartmentDetailDto;
  @Input() public set dialogDepartment(
    departmentDetail: DepartmentDetailDto | undefined
  ) {
    this._dialogDeparment = departmentDetail;
    this.dialogDepartmentChange.emit(this._dialogDeparment);
  }
  @Output() public dialogDepartmentChange = new EventEmitter<
    DepartmentDetailDto | undefined
  >();

  // dialogArea
  private _dialogArea?: AreaDto;
  @Input() public set dialogArea(area: AreaDto | undefined) {
    this._dialogArea = area;
    this.dialogAreaChange.emit(this._dialogArea);
  }
  @Output() public dialogAreaChange = new EventEmitter<AreaDto | undefined>();

  // dialogGroup
  private _dialogGroup?: GroupDto;
  @Input() public set dialogGroup(group: GroupDto | undefined) {
    this._dialogGroup = group;
    this.dialogGroupChange.emit(this._dialogGroup);
  }
  @Output() public dialogGroupChange = new EventEmitter<GroupDto | undefined>();

  // isPropose
  private _isPropose: boolean = false;
  @Input() public set isPropose(isPropose: boolean) {
    this._isPropose = isPropose;
    this.isProposeChange.emit(this._isPropose);
  }
  @Output() public isProposeChange = new EventEmitter<boolean>();

  /* show Filter */
  private _showFilter: boolean = true;
  @Input() public set showFilter(show: boolean) {
    this._showFilter = show;
    this.showFilterChange.emit(this._showFilter);
  }
  @Output() public showFilterChange = new EventEmitter<boolean>();
  public get showFilter() {
    return this._showFilter;
  }

  isDepartment: boolean = this.assignType === AssignType.DEPARTMENT;
  isArea: boolean = this.assignType === AssignType.AREA;
  isGroup: boolean = this.assignType === AssignType.GROUP;

  constructor(
    private departmentDetailService: DepartmentDetailsService,
    private areaService: AreasService,
    private messageService: CustomMessageServiceService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    // handle on init
    this.loadGroups();

    switch (this.assignType) {
      case AssignType.DEPARTMENT:
        this.actionLabel = 'Phân ban';
        this.targetLabel = 'ban';
        return;
      case AssignType.AREA:
        this.actionLabel = 'Phân khu vực';
        this.targetLabel = 'khu vực';
        return;
      case AssignType.GROUP:
        this.actionLabel = 'Phân nhóm';
        this.targetLabel = 'nhóm';
        return;
      default:
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isDepartment = this.assignType === AssignType.DEPARTMENT;
    this.isArea = this.assignType === AssignType.AREA;
    this.isGroup = this.assignType === AssignType.GROUP;
  }

  openCrudPopup() {
    this.showCrudPopup = true;
  }

  public loadDepartmentDetails(event: EventDto) {
    this.loading = true;
    this.selectedDeptDetails = [];
    const payload: DepartmentDetailLookUpDto = {
      pageIndex: 1,
      pageSize: 9999999,
      includeRoles: true,
    };

    if (event) {
      payload.eventId = event.id;
    }
    this.departmentDetailService.search(payload).subscribe((res) => {
      if (res.success && res.data) {
        const responseDepartments = res.data.items ?? [];
        this.departmentDetails = responseDepartments.map((department) => {
          const roles = department.roles;
          if (roles) {
            roles.sort((r1, r2) => {
              if (r1.position && r2.position) {
                return r1.position - r2.position;
              }
              return 0;
            });
            department.roles = roles;
          }
          return department;
        });
        // this.selectedDepartment = this.departmentDetails?.[0];
      }
    });
    this.loading = false;
  }

  public loadAreas() {
    if (this.selectedDepartment) {
      this.areaService
        .search({
          pageIndex: 1,
          pageSize: 9999,
          departmentDetailId: this.selectedDepartment.id,
          eventId: this.selectedEvent?.id,
          includeDepartmentDetail: true,
          includeRoles: true,
        })
        .subscribe({
          next: (res) => {
            this.areas = res.data?.items || [];
            // this.selectedArea = this.areas?.[0];
          },
        });
    } else {
      this.areas = [];
    }
  }

  public loadGroups() {
    if (this.selectedArea?.id) {
      const payload: GroupLookUpDto = {
        pageIndex: 1,
        pageSize: 9999,
        areaId: this.selectedArea.id,
        departmentId: this.selectedDepartment?.id,
        eventId: this.selectedEvent?.id,
        includeRoles: true,
      };

      if (this.selectedArea) {
        payload.areaId = this.selectedArea.id;
      }
      this.groupService.search(payload).subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.groups = res.data.items ?? [];
          }
        },
      });
    }
  }

  handleProposePosition() {
    if (
      (this.isDepartment && this.selectedDepartment) ||
      (this.isArea && this.selectedArea) ||
      (this.isGroup && this.selectedGroup)
    ) {
      this.dialogDepartment = this.selectedDepartment;
      this.dialogArea = this.selectedArea;
      this.dialogGroup = this.selectedGroup;
      this.isPropose = true;
      this.isAssign = true;
      this.isViewOnly = false;
      return;
    }

    return this.messageService.error(
      `Xin hãy chọn ${this.targetLabel} cần đề xuất`
    );
  }
  handleAssign() {
    if (
      (this.isDepartment && this.selectedDepartment) ||
      (this.isArea && this.selectedArea) ||
      (this.isGroup && this.selectedGroup)
    ) {
      this.dialogDepartment = this.selectedDepartment;
      this.dialogArea = this.selectedArea;
      this.dialogGroup = this.selectedGroup;
      this.isPropose = false;
      this.isAssign = true;
      this.isViewOnly = false;
      return;
    }
    return this.messageService.error(
      `Xin hãy chọn ${this.targetLabel} cần phân`
    );
  }
}
