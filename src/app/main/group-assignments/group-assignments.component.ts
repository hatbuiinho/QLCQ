import { GroupService } from './../../Shared/Services/http/Group.service';
import { GroupDto } from './../../Shared/dtos/Groups/GroupDto.model';
import {
  Component,
  OnInit,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { AreaDto } from 'src/app/Shared/dtos/Areas/AreaDto.model';
import { DepartmentDetailDto } from 'src/app/Shared/dtos/DepartmentDetails/DepartmentDetailDto.model';
import { AssignType } from 'src/app/Shared/dtos/Enums/AssignType.enum';
import { StatusType } from 'src/app/Shared/dtos/Enums/StatusType.enum';
import { EventDto } from 'src/app/Shared/dtos/EventDto.model';
import { BreadCrumbService } from 'src/app/Shared/Services/client/bread-crumb.service';
import { CustomMessageServiceService } from 'src/app/Shared/Services/custom-message-service.service';
import { Table } from 'primeng/table';
import { AssigmentToolbarComponent } from 'src/app/Shared/components/assigment-toolbar/assigment-toolbar.component';
import { Observable } from 'rxjs';
import { UpSertGroupDto } from 'src/app/Shared/dtos/Groups/UpSertGroupDto.model';
import { ServiceResponse } from 'src/app/Shared/dtos/ServiceResponse.model';

@Component({
  selector: 'app-group-assignments',
  templateUrl: './group-assignments.component.html',
  styleUrls: ['./group-assignments.component.css'],
})
export class GroupAssignmentsComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @ViewChild(Table) table!: Table;
  @ViewChild(AssigmentToolbarComponent) toolbar!: AssigmentToolbarComponent;

  private _selectedEvent: EventDto | undefined;
  private _selectedDepartment: DepartmentDetailDto | undefined;
  private _selectedDept: DepartmentDetailDto | undefined;

  public StatusType = StatusType;
  public AssignType = AssignType;
  public loading: boolean = false;
  public tableOffsetTop: number = 0;
  public isOpenDialog: boolean = false;
  public selectedDeptDetails: DepartmentDetailDto[] = [];
  public selectedDeptDetail: DepartmentDetailDto | undefined;
  public departmentDetails: DepartmentDetailDto[] = [];
  public isPropose: boolean = true;
  public proposeDepartment?: DepartmentDetailDto;

  public dialogDepartment?: DepartmentDetailDto;
  public dialogArea?: AreaDto;
  public dialogGroup?: GroupDto;

  public set selectedDept(department: DepartmentDetailDto | undefined) {
    this._selectedDept = department;
  }
  public get selectedDept() {
    return this._selectedDept;
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

  public selectedArea?: AreaDto;
  public selectedGroup?: GroupDto;
  public areas: AreaDto[] = [];
  /* groups */
  private _groups: GroupDto[] = [];
  public set groups(groups: GroupDto[]) {
    this._groups = groups;
    this.resizeTableHeight();
  }
  public get groups() {
    return this._groups;
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
  public isViewOnly: boolean = false;

  private _showCrudPopup: boolean = false;
  public set showCrudPopup(show: boolean) {
    if (show != this._showCrudPopup) {
      this.selectedGroup = undefined;
    }
    this._showCrudPopup = show;
  }
  public get showCrudPopup() {
    return this._showCrudPopup;
  }

  constructor(
    private breadCrumb: BreadCrumbService,
    private groupService: GroupService,
    private messageService: CustomMessageServiceService
  ) {
    this.breadCrumb.setPageTitle('Quản lý phân nhóm');
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.tableOffsetTop =
      this.table.el.nativeElement.getBoundingClientRect().top;
  }
  ngAfterViewInit(): void {
    this.resizeTableHeight();
  }

  ngOnInit(): void {}

  resizeTableHeight() {
    setTimeout(() => {
      this.tableOffsetTop =
        this.table.el.nativeElement.getBoundingClientRect().top;
    }, 300);
  }

  public save(item: UpSertGroupDto) {
    let request: Observable<ServiceResponse<GroupDto>>;
    const id = this.selectedGroup?.id;
    if (id) {
      request = this.groupService.update(id, item);
    } else {
      request = this.groupService.create(item);
    }
    request.subscribe({
      next: (res) => {
        if (res.success && res.data) {
          if (id) {
            const index = this.departmentDetails.findIndex((d) => d.id === id);
            if (index >= 0) {
              this.groups[index] = res.data;
            }
            this.messageService.success(`Đã cập nhập nhóm ${res.data.name}`);
            this.toolbar.loadGroups();
          } else {
            this.messageService.success(`Đã thêm nhóm ${res.data.name}`);
            this.groups.unshift(res.data);
          }
        } else {
          this.messageService.error(`Thêm hoặc chỉnh sửa nhóm thất bại`);
        }
      },
      complete: () => {},
    });
  }

  openGroupMembers(group: GroupDto) {
    this.isOpenDialog = true;
    this.isViewOnly = true;
    this.dialogDepartment = this.selectedDepartment;
    this.dialogArea = this.selectedArea;
    this.dialogGroup = group;
  }

  public edit(dto: GroupDto) {
    this.showCrudPopup = true;
    this.selectedGroup = dto;
  }
}
