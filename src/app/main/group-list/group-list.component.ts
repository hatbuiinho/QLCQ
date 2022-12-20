import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { firstValueFrom, Observable } from 'rxjs';
import { QueryParamKeys } from 'src/app/Shared/constants/constants.module';
import { AreaDto } from 'src/app/Shared/dtos/Areas/AreaDto.model';
import { AreaLookUpDto } from 'src/app/Shared/dtos/Areas/AreaLookUpDto.model';
import { DepartmentDetailDto } from 'src/app/Shared/dtos/DepartmentDetails/DepartmentDetailDto.model';
import { DepartmentDetailLookUpDto } from 'src/app/Shared/dtos/DepartmentDetails/DepartmentDetailLookUpDto.model';
import { EventDto } from 'src/app/Shared/dtos/EventDto.model';
import { GroupDto } from 'src/app/Shared/dtos/Groups/GroupDto.model';
import { UpSertGroupDto } from 'src/app/Shared/dtos/Groups/UpSertGroupDto.model';
import { ServiceResponse } from 'src/app/Shared/dtos/ServiceResponse.model';
import { BreadCrumbService } from 'src/app/Shared/Services/client/bread-crumb.service';
import { AreasService } from 'src/app/Shared/Services/http/Areas.service';
import { DepartmentDetailsService } from 'src/app/Shared/Services/http/DepartmentDetails.service';
import { EventService } from 'src/app/Shared/Services/http/Event.service';
import { GroupService } from 'src/app/Shared/Services/http/Group.service';
import { GroupLookUpDto } from './../../Shared/dtos/Groups/GroupLookUpDto.model';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
})
export class GroupListComponent implements OnInit {
  @ViewChild(Table) table!: Table;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.tableOffsetTop = this.table.el.nativeElement.offsetTop;
  }

  // Component data variables
  public events: EventDto[] = [];
  public departmentDetails: DepartmentDetailDto[] = [];
  public areas: AreaDto[] = [];
  public groups: GroupDto[] = [];

  public selectedGroups: GroupDto[] = [];
  public selectedGroup: GroupDto | undefined = undefined;

  // Selected department detail
  public selectedDeptDetail: number | undefined;

  // Selected area
  public selectedArea: number | undefined;

  // Selected event
  private _selectedEvent: EventDto | undefined = undefined;
  public get selectedEvent(): EventDto | undefined {
    return this._selectedEvent;
  }

  public set selectedEvent(value: EventDto | undefined) {
    if (value && this.selectedEvent?.id !== value.id) {
      this._selectedEvent = value;
      this.loadDeptDetails();
    } else this._selectedEvent = value;
  }

  // Component type variables

  // Component state variables
  public formEditing: boolean = false;
  public formVisible: boolean = false;
  public loading: boolean = false;
  public tableOffsetTop: number = 0;
  public btnItems: MenuItem[];

  constructor(
    bread: BreadCrumbService,
    private eventService: EventService,
    private deptDetailService: DepartmentDetailsService,
    private message: MessageService,
    private confirm: ConfirmationService,
    private areaService: AreasService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    bread.setPageTitle('Quản lý trang đăng ký đại lễ');
    this.btnItems = [
      {
        label: 'Làm mới',
        icon: 'pi pi-refresh',
        command: () => this.loadGroups(),
      },
      {
        label: 'Xóa đã chọn',
        icon: 'pi pi-trash',
        command: () => this.deleteRange(),
      },
    ];
  }

  ngAfterViewInit(): void {
    setTimeout(
      () => (this.tableOffsetTop = this.table.el.nativeElement.offsetTop),
      300
    );
  }

  public loadEvents(): void {
    this.loading = true;
    this.eventService.getAll().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.events = res.data;
          firstValueFrom(this.route.queryParams).then((p) => {
            const event = Number(p[QueryParamKeys.event]);
            this.selectedDeptDetail = Number(
              p[QueryParamKeys.departmentDetail]
            );
            this.selectedArea = Number(p[QueryParamKeys.area]);
            if (event) {
              this.router.navigate([], {
                relativeTo: this.route,
                queryParams: {
                  [QueryParamKeys.event]: undefined,
                  [QueryParamKeys.departmentDetail]: undefined,
                  [QueryParamKeys.area]: undefined,
                },
                queryParamsHandling: 'merge',
              });
              this.selectedEvent =
                this.events.find((e) => e.id == event) ?? undefined;
            } else {
              this.selectedEvent = this.eventService.getDefault(this.events);
            }
          });
        }
      },
      complete: () => (this.loading = false),
    });
  }

  public loadDeptDetails() {
    if (this.selectedEvent) {
      const payload: DepartmentDetailLookUpDto = {
        eventId: this.selectedEvent.id,
        pageIndex: 1,
        pageSize: 999999,
      };
      this.loading = true;
      this.groups = [];
      this.deptDetailService.search(payload).subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.departmentDetails = res.data.items ?? [];
            firstValueFrom(this.route.queryParams).then((p) => {
              const event = Number(p[QueryParamKeys.event]);
              const dept = Number(p[QueryParamKeys.departmentDetail]);
              if (event == this.selectedEvent?.id && dept) {
                this.selectedDeptDetail =
                  this.departmentDetails.find((d) => d.id == dept)?.id ??
                  undefined;
              } else if (!this.groups?.length) {
                this.loadAreas();
              }
            });
          }
        },
        complete: () => (this.loading = false),
      });
    }
  }

  public loadAreas() {
    if (this.selectedEvent?.id && this.selectedDeptDetail) {
      const payload: AreaLookUpDto = {
        pageIndex: 1,
        pageSize: 999999,
        eventId: this.selectedEvent.id,
        departmentDetailId: this.selectedDeptDetail,
      };
      this.areaService.search(payload).subscribe({
        next: (res) => {
          if (res.success && res.data?.items) {
            this.areas = res.data.items;
          }
        },
      });
    }
  }

  public loadGroups() {
    if (this.selectedEvent) {
      this.loading = true;
      const payload: GroupLookUpDto = {
        pageIndex: 1,
        pageSize: 999999,
        eventId: this.selectedEvent?.id,
        includeDepartment: true,
      };
      if (this.selectedArea) {
        payload.areaId = this.selectedDeptDetail;
      } else if (this.selectedDeptDetail) {
        payload.departmentId = this.selectedDeptDetail;
      }
      this.groupService.search(payload).subscribe({
        next: (res) => {
          if (res.success) {
            this.groups = res.data?.items ?? [];
          }
        },
        complete: () => (this.loading = false),
      });
    }
  }

  ngOnInit(): void {
    this.loadEvents();
    this.loadDeptDetails();
  }

  public add() {
    this.formVisible = true;
    this.selectedGroup = undefined;
    this.formEditing = true;
  }

  public edit(dto: GroupDto) {
    this.formVisible = true;
    this.selectedGroup = dto;
    this.formEditing = true;
  }

  public showDetail(dto: GroupDto) {
    this.router.navigate(['/', 'event', 'registers'], {
      queryParams: {
        [QueryParamKeys.event]: this.selectedEvent?.id,
        [QueryParamKeys.departmentDetail]: this.selectedDeptDetail,
        [QueryParamKeys.area]: dto.id,
      },
    });
  }

  public save(item: UpSertGroupDto) {
    let request: Observable<ServiceResponse<GroupDto>>;
    const id = this.selectedGroup?.id;
    if (id) {
      request = this.groupService.update(id, item);
    } else {
      request = this.groupService.create(item);
    }
    request.subscribe((res) => {
      if (res.success && res.data) {
        if (id) {
          const index = this.departmentDetails.findIndex((d) => d.id === id);
          if (index >= 0) {
            this.groups[index] = res.data;
          }
          this.message.add({
            detail: `Đã cập nhập nhóm ${res.data.name}`,
            severity: 'success',
            summary: 'Thông báo',
          });
        } else {
          this.message.add({
            detail: `Đã thêm nhóm ${res.data.name}`,
            severity: 'success',
            summary: 'Thông báo',
          });
          this.groups.push(res.data);
        }
      } else {
        this.message.add({
          detail: `Thêm hoặc chỉnh sửa nhóm thất bại`,
          severity: 'error',
          summary: 'Thông báo',
        });
      }
    });
  }

  public deleteRange() {
    this.confirm.confirm({
      message: `Bạn có chắc chắn muốn xóa ${this.selectedGroups.length} nhóm?`,
      accept: () => {
        const ids = this.selectedGroups.map((a) => a.id);
        this.selectedGroups = [];
        this.groupService.deleteMany(ids).subscribe({
          next: (res) => {
            if (res.data && res.success) {
              this.groups = this.groups.filter(
                (a) => ids.findIndex((id) => id === a.id) === -1
              );
              this.message.add({
                detail: `Đã xóa thành công ${res.data} nhóm`,
                summary: 'Thông báo',
                severity: 'success',
              });
            } else {
              this.message.add({
                detail: `Xóa nhóm thát bại`,
                summary: 'Thông báo',
                severity: 'error',
              });
            }
            this.formVisible = false;
          },
        });
      },
      acceptButtonStyleClass: 'p-button-success',
      rejectButtonStyleClass: 'p-button-warning',
      acceptLabel: 'Chắc chắn',
      rejectLabel: 'Hủy',
    });
  }
}
