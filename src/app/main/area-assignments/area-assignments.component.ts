import { AreasService } from 'src/app/Shared/Services/http/Areas.service';
import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Table } from 'primeng/table';
import { AssigmentToolbarComponent } from 'src/app/Shared/components/assigment-toolbar/assigment-toolbar.component';
import { DepartmentDetailDto } from 'src/app/Shared/dtos/DepartmentDetails/DepartmentDetailDto.model';
import { AssignType } from 'src/app/Shared/dtos/Enums/AssignType.enum';
import { PositionType } from 'src/app/Shared/dtos/Enums/PositionType.enum';
import { StatusType } from 'src/app/Shared/dtos/Enums/StatusType.enum';
import { EventDto } from 'src/app/Shared/dtos/EventDto.model';
import { GroupDto } from 'src/app/Shared/dtos/Groups/GroupDto.model';
import { AreaDto } from './../../Shared/dtos/Areas/AreaDto.model';
import { BreadCrumbService } from './../../Shared/Services/client/bread-crumb.service';
import { CustomMessageServiceService } from './../../Shared/Services/custom-message-service.service';
import { Observable } from 'rxjs';
import { UpSertAreaDto } from 'src/app/Shared/dtos/Areas/UpSertAreaDto.model';
import { ServiceResponse } from 'src/app/Shared/dtos/ServiceResponse.model';

@Component({
  selector: 'app-area-assignments',
  templateUrl: './area-assignments.component.html',
  styleUrls: ['./area-assignments.component.css'],
})
export class AreaAssignmentsComponent
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
  public _areas: AreaDto[] = [];
  public set areas(areas: AreaDto[]) {
    this._areas = areas;
    this.resizeTableHeight();
  }
  public get areas() {
    return this._areas;
  }

  public PositionType = PositionType;
  public isViewOnly = false;

  private _showCrudPopup: boolean = false;
  public set showCrudPopup(show: boolean) {
    if (show != this._showCrudPopup) {
      this.selectedArea = undefined;
    }
    this._showCrudPopup = show;
  }
  public get showCrudPopup() {
    return this._showCrudPopup;
  }

  constructor(
    private breadCrumb: BreadCrumbService,
    private areaService: AreasService,
    private messageService: CustomMessageServiceService
  ) {
    this.breadCrumb.setPageTitle('Quản lý phân khu vực');
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

  openAreaMembers(area: AreaDto) {
    this.isOpenDialog = true;
    this.isViewOnly = true;
    this.dialogDepartment = this.selectedDepartment;
    this.dialogArea = area;
  }

  public save(item: UpSertAreaDto) {
    let request: Observable<ServiceResponse<AreaDto>>;
    const id = this.selectedArea?.id;
    if (id) {
      request = this.areaService.update(id, item);
    } else {
      request = this.areaService.create(item);
    }
    request.subscribe({
      next: (res) => {
        if (res.success && res.data) {
          if (id) {
            const index = this.departmentDetails.findIndex((d) => d.id === id);
            if (index >= 0) {
              this.areas[index] = res.data;
            }
            this.messageService.success(`Đã cập nhập khu vực ${res.data.name}`);
            this.toolbar.loadAreas();
          } else {
            this.messageService.success(`Đã thêm khu vực ${res.data.name}`);
            this.areas.unshift(res.data);
          }
        } else {
          this.messageService.error(`Thêm hoặc chỉnh sửa khu vực thất bại`);
        }
      },
    });
  }

  public edit(dto: AreaDto) {
    this.showCrudPopup = true;
    this.selectedArea = dto;
  }
}
