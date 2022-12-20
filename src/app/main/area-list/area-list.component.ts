import { QueryParamKeys } from 'src/app/Shared/constants/constants.module';
import { ActivatedRoute, Router } from '@angular/router';
import { UpSertAreaDto } from './../../Shared/dtos/Areas/UpSertAreaDto.model';
import { GroupLookUpDto } from './../../Shared/dtos/Groups/GroupLookUpDto.model';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AreaLookUpDto } from 'src/app/Shared/dtos/Areas/AreaLookUpDto.model';
import { DepartmentDetailDto } from 'src/app/Shared/dtos/DepartmentDetails/DepartmentDetailDto.model';
import { DepartmentDetailLookUpDto } from 'src/app/Shared/dtos/DepartmentDetails/DepartmentDetailLookUpDto.model';
import { EventDto } from 'src/app/Shared/dtos/EventDto.model';
import { BreadCrumbService } from 'src/app/Shared/Services/client/bread-crumb.service';
import { DepartmentDetailsService } from 'src/app/Shared/Services/http/DepartmentDetails.service';
import { EventService } from 'src/app/Shared/Services/http/Event.service';
import { EventRegistryService } from 'src/app/Shared/Services/http/EventRegistry.service';
import { AreaDto } from './../../Shared/dtos/Areas/AreaDto.model';
import { AreasService } from './../../Shared/Services/http/Areas.service';
import { Observable, firstValueFrom } from 'rxjs';
import { ServiceResponse } from 'src/app/Shared/dtos/ServiceResponse.model';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css'],
})
export class AreaListComponent implements OnInit {
  @ViewChild(Table) table!: Table;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.tableOffsetTop = this.table.el.nativeElement.offsetTop;
  }

  // Component data variables
  public events: EventDto[] = [];
  public departmentDetails: DepartmentDetailDto[] = [];
  public areas: AreaDto[] = [];

  public selectedAreas: AreaDto[] = [];
  public selectedArea: AreaDto | undefined = undefined;

  // Selected department detail
  private _selectedDeptDetail: DepartmentDetailDto | undefined = undefined;
  public get selectedDeptDetail(): DepartmentDetailDto | undefined {
    return this._selectedDeptDetail;
  }
  public set selectedDeptDetail(value: DepartmentDetailDto | undefined) {
    if (this._selectedDeptDetail != value) {
      this._selectedDeptDetail = value;
      this.loadAreas();
    }
  }

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
    private route: ActivatedRoute,
    private router: Router
  ) {
    bread.setPageTitle('Quản lý khu vực');
    this.btnItems = [
      {
        label: 'Làm mới',
        icon: 'pi pi-refresh',
        command: () => this.loadAreas(),
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
            const event = p[QueryParamKeys.event];
            if (event) {
              this.router.navigate([], {
                relativeTo: this.route,
                queryParams: {
                  [QueryParamKeys.event]: undefined,
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
      this.areas = [];
      this.deptDetailService.search(payload).subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.departmentDetails = res.data.items ?? [];
            firstValueFrom(this.route.queryParams).then((p) => {
              const event = Number(p[QueryParamKeys.event]);
              const dept = Number(p[QueryParamKeys.departmentDetail]);
              if (event == this.selectedEvent?.id && dept) {
                this.selectedDeptDetail =
                  this.departmentDetails.find((d) => d.id == dept) ?? undefined;
              } else if (!this.areas?.length) {
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
    if (this.selectedEvent?.id) {
      const payload: AreaLookUpDto = {
        pageIndex: 1,
        pageSize: 999999,
        eventId: this.selectedEvent.id,
      };
      if (this.selectedDeptDetail?.id) {
        payload.departmentDetailId = this.selectedDeptDetail.id;
      }
      this.areaService.search(payload).subscribe({
        next: (res) => {
          if (res.success && res.data?.items) {
            res.data.items.forEach((item) => {
              if (!item.departmentDetail) {
                item.departmentDetail =
                  this.departmentDetails.find(
                    (d) => d.id == item.departmentDetailId
                  ) || undefined;
              }
            });
            this.areas = res.data.items;
          }
        },
      });
    }
  }

  ngOnInit(): void {
    this.loadEvents();
    this.loadDeptDetails();
  }

  public add() {
    this.formVisible = true;
    this.selectedArea = undefined;
    this.formEditing = true;
  }

  public edit(dto: AreaDto) {
    this.formVisible = true;
    this.selectedArea = dto;
    this.formEditing = true;
  }

  public showDetail(dto: AreaDto) {
    this.router.navigate(['/', 'event', 'registers'], {
      queryParams: {
        [QueryParamKeys.event]: this.selectedEvent?.id,
        [QueryParamKeys.departmentDetail]: this.selectedDeptDetail?.id,
        [QueryParamKeys.area]: dto.id,
      },
    });
  }

  public save(item: UpSertAreaDto) {
    let request: Observable<ServiceResponse<AreaDto>>;
    const id = this.selectedArea?.id;
    if (id) {
      request = this.areaService.update(id, item);
    } else {
      request = this.areaService.create(item);
    }
    request.subscribe((res) => {
      if (res.success && res.data) {
        if (id) {
          const index = this.departmentDetails.findIndex((d) => d.id === id);
          if (index >= 0) {
            this.areas[index] = res.data;
          }
          this.message.add({
            detail: `Đã cập nhập khu vực ${res.data.name}`,
            severity: 'success',
            summary: 'Thông báo',
          });
        } else {
          this.message.add({
            detail: `Đã thêm khu vực ${res.data.name}`,
            severity: 'success',
            summary: 'Thông báo',
          });
          this.areas.push(res.data);
        }
      } else {
        this.message.add({
          detail: `Thêm hoặc chỉnh sửa khu vực thất bại`,
          severity: 'error',
          summary: 'Thông báo',
        });
      }
    });
  }

  public deleteRange() {
    this.confirm.confirm({
      message: `Bạn có chắc chắn muốn xóa ${this.selectedAreas.length} khu vực?`,
      accept: () => {
        const ids = this.selectedAreas.map((a) => a.id);
        this.selectedAreas = [];
        this.areaService.deleteMany(ids).subscribe({
          next: (res) => {
            if (res.data && res.success) {
              this.areas = this.areas.filter(
                (a) => ids.findIndex((id) => id === a.id) === -1
              );
              this.message.add({
                detail: `Đã xóa thành công ${res.data} khu vực`,
                summary: 'Thông báo',
                severity: 'success',
              });
            } else {
              this.message.add({
                detail: `Xóa khu vực thát bại`,
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
