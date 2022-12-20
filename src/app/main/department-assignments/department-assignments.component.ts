import { DepartmentService } from 'src/app/Shared/Services/http/Department.service';
import { DepartmentDto } from './../../Shared/dtos/Departments/DepartmentDto.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { AreaDto } from 'src/app/Shared/dtos/Areas/AreaDto.model';
import { DepartmentDetailDto } from 'src/app/Shared/dtos/DepartmentDetails/DepartmentDetailDto.model';
import { StatusType } from 'src/app/Shared/dtos/Enums/StatusType.enum';
import { EventDto } from 'src/app/Shared/dtos/EventDto.model';
import { GroupDto } from 'src/app/Shared/dtos/Groups/GroupDto.model';
import { BreadCrumbService } from 'src/app/Shared/Services/client/bread-crumb.service';
import { DepartmentDetailsService } from 'src/app/Shared/Services/http/DepartmentDetails.service';
import { AssigmentToolbarComponent } from './../../Shared/components/assigment-toolbar/assigment-toolbar.component';
import { AssignType } from './../../Shared/dtos/Enums/AssignType.enum';
import { PositionType } from './../../Shared/dtos/Enums/PositionType.enum';
import { CustomMessageServiceService } from './../../Shared/Services/custom-message-service.service';
import { UpSertDepartmentDetailDto } from 'src/app/Shared/dtos/DepartmentDetails/UpSertDepartmentDetailDto.model';
import { ServiceResponse } from 'src/app/Shared/dtos/ServiceResponse.model';
import { Observable } from 'rxjs';
import { DepartmentDetailDialogComponent } from 'src/app/Shared/components/department-detail-dialog/department-detail-dialog.component';

@Component({
  selector: 'app-department-assignment',
  templateUrl: './department-assignments.component.html',
  styleUrls: ['./department-assignments.component.css'],
})
export class DepartmentAssignmentsComponent implements OnInit, AfterViewInit {
  @ViewChild(Table) table!: Table;
  @ViewChild(AssigmentToolbarComponent) toolbar!: AssigmentToolbarComponent;
  @ViewChild(DepartmentDetailDialogComponent)
  dialog!: DepartmentDetailDialogComponent;

  private _selectedEvent: EventDto | undefined;
  private _selectedDepartment: DepartmentDetailDto | undefined;

  public PositionType = PositionType;
  public StatusType = StatusType;
  public AssignType = AssignType;
  public loading: boolean = false;
  public tableOffsetTop: number = 0;
  private _isOpenDialog: boolean = false;
  public set isOpenDialog(open: boolean) {
    if (!open && this.selectedEvent) {
      this.toolbar.loadDepartmentDetails(this.selectedEvent);
    }
    this._isOpenDialog = open;
  }
  public get isOpenDialog() {
    return this._isOpenDialog;
  }
  public selectedDeptDetails: DepartmentDetailDto[] = [];
  public selectedDeptDetail: DepartmentDetailDto | undefined;
  public isPropose: boolean = true;

  public dialogDepartment?: DepartmentDetailDto;
  public dialogArea?: AreaDto;
  public dialogGroup?: GroupDto;

  private _departmentDetails: DepartmentDetailDto[] = [];
  public set departmentDetails(departmentDetails: DepartmentDetailDto[]) {
    this._departmentDetails = departmentDetails;
    this.remainDepartments = this.departments.filter(
      (d) =>
        this.departmentDetails.findIndex((dd) => dd.departmentId === d.id) ===
        -1
    );
    this.resizeTableHeight();
  }
  public get departmentDetails() {
    return this._departmentDetails;
  }

  private _showFilter = true;
  public set showFilter(show: boolean) {
    this._showFilter = show;
    if (this.table) {
      this.resizeTableHeight();
    }
  }
  public get showFilter() {
    return this._showFilter;
  }

  public get selectedEvent(): EventDto | undefined {
    return this._selectedEvent;
  }
  public set selectedEvent(value: EventDto | undefined) {
    this._selectedEvent = value;
  }
  public get selectedDepartment(): DepartmentDetailDto | undefined {
    return this._selectedDepartment;
  }
  public set selectedDepartment(value: DepartmentDetailDto | undefined) {
    this._selectedDepartment = value;
  }
  public isViewOnly: boolean = false;
  private _showCrudPopup: boolean = false;
  public set showCrudPopup(show: boolean) {
    if (show != this._showCrudPopup) {
      this.dialog.reset();
    }
    this._showCrudPopup = show;
  }
  public get showCrudPopup() {
    return this._showCrudPopup;
  }
  public remainDepartments: DepartmentDto[] = [];
  public departments: DepartmentDto[] = [];
  public severities: string[] = ['primary', 'success', 'info'];

  constructor(
    private breadCrumb: BreadCrumbService,
    private departmentService: DepartmentService,
    private departmentDetailService: DepartmentDetailsService,
    private messageService: CustomMessageServiceService
  ) {
    this.breadCrumb.setPageTitle('Quản lý phân ban');
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  resizeTableHeight() {
    setTimeout(() => {
      this.tableOffsetTop =
        this.table.el.nativeElement.getBoundingClientRect().top;
    }, 300);
  }

  openDepartmentMembers(department: DepartmentDetailDto) {
    this.isOpenDialog = true;
    this.isViewOnly = true;
    this.dialogDepartment = department;
  }

  public loadDepartments() {
    this.departmentService.getAll().subscribe((res) => {
      if (res.success && res.data) {
        this.departments = res.data;
      }
    });
  }

  public save(dto: UpSertDepartmentDetailDto) {
    let request: Observable<ServiceResponse<DepartmentDetailDto>>;
    if (!this.selectedEvent) {
      this.messageService.error('Cần chọn đại lễ trước khi tạo ban.');
      return;
    }
    dto.eventId = this.selectedEvent.id;
    const id = this.selectedDeptDetail?.id;
    if (id) {
      request = this.departmentDetailService.update(id, dto);
    } else {
      request = this.departmentDetailService.create(dto);
    }
    request.subscribe({
      next: (res) => {
        if (res.success && res.data) {
          if (id) {
            this.departmentDetails.splice(
              this.departmentDetails.findIndex((d) => d.id === id),
              1
            );
            this.messageService.success(
              `Đã cập nhập ban ${res.data.department?.name}`
            );
            this.toolbar.loadDepartmentDetails({} as EventDto);
          } else {
            this.messageService.success(
              `Đã thêm ban ${res.data.department?.name}`
            );
            this.departmentDetails.unshift(res.data);
          }
          this.refreshRemainingDepartments();
        }
      },
    });
  }

  public refreshRemainingDepartments() {
    this.remainDepartments = this.departments.filter(
      (d) =>
        this.departmentDetails.findIndex((dd) => dd.departmentId === d.id) ===
          -1 || d.id === this.selectedDeptDetail?.departmentId
    );
  }

  public edit(dept: DepartmentDetailDto) {
    this.selectedDeptDetail = dept;
    this.refreshRemainingDepartments();

    this.showCrudPopup = true;
    this.dialog.setValue(dept);
  }
}
