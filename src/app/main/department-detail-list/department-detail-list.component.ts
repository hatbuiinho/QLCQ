import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  ConfirmationService,
  FilterMatchMode,
  MenuItem,
  MessageService,
} from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { BreadCrumbService } from 'src/app/Shared/Services/client/bread-crumb.service';
import { DepartmentDetailDialogComponent } from 'src/app/Shared/components/department-detail-dialog/department-detail-dialog.component';
import { DepartmentDetailDto } from 'src/app/Shared/dtos/DepartmentDetails/DepartmentDetailDto.model';
import { DepartmentDetailLookUpDto } from 'src/app/Shared/dtos/DepartmentDetails/DepartmentDetailLookUpDto.model';
import { UpSertDepartmentDetailDto } from 'src/app/Shared/dtos/DepartmentDetails/UpSertDepartmentDetailDto.model';
import { DepartmentDto } from 'src/app/Shared/dtos/Departments/DepartmentDto.model';
import { ScopeType } from 'src/app/Shared/dtos/Enums/ScopeType.enum';
import { StatusType } from 'src/app/Shared/dtos/Enums/StatusType.enum';
import { EventDto } from 'src/app/Shared/dtos/EventDto.model';
import { ServiceResponse } from 'src/app/Shared/dtos/ServiceResponse.model';
import { DepartmentService } from 'src/app/Shared/Services/http/Department.service';
import { DepartmentDetailsService } from 'src/app/Shared/Services/http/DepartmentDetails.service';
import { EventService } from 'src/app/Shared/Services/http/Event.service';

@Component({
  selector: 'app-department-detail-list',
  templateUrl: './department-detail-list.component.html',
  styleUrls: ['./department-detail-list.component.css'],
})
export class DepartmentDetailListComponent implements OnInit, AfterViewInit {
  @ViewChild(DepartmentDetailDialogComponent)
  dialog!: DepartmentDetailDialogComponent;
  @ViewChild(Table) table!: Table;

  public StatusType = StatusType;

  public statuses = StatusType.all();
  public FilterMatchMode = FilterMatchMode;

  public btnItems: MenuItem[];

  public remainDepartments: DepartmentDto[] = [];

  public loading: boolean = false;
  public formVisible: boolean = false;
  public detailVisible: boolean = false;
  public tableOffsetTop: number = 0;

  public selectedDeptDetails: DepartmentDetailDto[] = [];
  public selectedDeptDetail: DepartmentDetailDto | undefined;

  private _selectedEventId: number | undefined;
  private _selectedDepartmentId: number | undefined;

  public get selectedEventId(): number | undefined {
    return this._selectedEventId;
  }
  public set selectedEventId(value: number | undefined) {
    this._selectedEventId = value;
    if (value) {
      this.loadDepartmentDetails();
    }
  }

  public get selectedDepartmentId(): number | undefined {
    return this._selectedDepartmentId;
  }
  public set selectedDepartmentId(value: number | undefined) {
    this._selectedDepartmentId = value;
  }

  constructor(
    private breadCrumb: BreadCrumbService,
    private eventService: EventService,
    private departmentService: DepartmentService,
    private departmentDetailService: DepartmentDetailsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.breadCrumb.setPageTitle('Qu???n l?? danh s??ch ban');
    this.btnItems = [
      {
        label: 'Duy???t ban',
        icon: 'fa-regular fa-circle-check',
        command: () => this.acceptSelectedDept(),
      },
      {
        label: 'X??a ban',
        icon: 'fa-regular fa-trash-can',
        command: () => this.deleteSelected(),
      },
    ];
  }
  ngAfterViewInit(): void {
    setTimeout(
      () => (this.tableOffsetTop = this.table.el.nativeElement.offsetTop),
      300
    );
  }

  public events: EventDto[] = [];
  public departments: DepartmentDto[] = [];
  public departmentDetails: DepartmentDetailDto[] = [];

  ngOnInit(): void {
    this.loadEvents();
    this.loadDepartments();
  }

  public loadEvents(): void {
    this.eventService.getAll().subscribe((res) => {
      if (res.success && res.data) {
        this.events = res.data;
      }
    });
  }

  public loadDepartments() {
    this.departmentService.getAll().subscribe((res) => {
      if (res.success && res.data) {
        this.departments = res.data;
      }
    });
  }

  public loadDepartmentDetails() {
    this.loading = true;
    this.selectedDeptDetails = [];
    const payload: DepartmentDetailLookUpDto = {
      pageIndex: 1,
      pageSize: 100000,
      eventId: this.selectedEventId,
    };
    this.departmentDetailService.search(payload).subscribe((res) => {
      if (res.success && res.data) {
        this.departmentDetails = res.data.items??[];
      }
      this.remainDepartments = this.departments.filter(
        (d) =>
          this.departmentDetails.findIndex((dd) => dd.departmentId === d.id) ===
          -1
      );
    });
    this.loading = false;
  }

  public add() {
    this.dialog.reset();
    this.selectedDeptDetail = undefined;
    this.formVisible = true;
  }

  public edit(dept: DepartmentDetailDto) {
    this.selectedDeptDetail = dept;
    this.refreshRemainingDepartments();
    this.dialog.setValue(dept);
    this.formVisible = true;
  }

  public refreshRemainingDepartments() {
    this.remainDepartments = this.departments.filter(
      (d) =>
        this.departmentDetails.findIndex((dd) => dd.departmentId === d.id) ===
          -1 || d.id === this.selectedDeptDetail?.departmentId
    );
  }

  public deleteSelected() {
    if (this.selectedDeptDetails?.length) {
      this.confirmationService.confirm({
        message: `B???n c?? ch???c ch???n mu???n x??a ${this.selectedDeptDetails.length} ban?`,
        accept: () => {
          this.departmentDetailService
            .deleteRange(this.selectedDeptDetails.map((d) => d.id))
            .subscribe((res) => {
              if (res.success) {
                this.loadDepartmentDetails();
              }
            });
        },
        acceptLabel: 'Ch???c ch???c',
        rejectLabel: 'H???y',
      });
    }
  }

  public save(dto: UpSertDepartmentDetailDto) {
    let request: Observable<ServiceResponse<DepartmentDetailDto>>;
    if (!this.selectedEventId) {
      this.messageService.add({
        detail: 'C???n ch???n ?????i l??? tr?????c khi t???o ban.',
        severity: 'error',
        summary: 'Th??ng b??o',
      });
      return;
    }
    dto.eventId = this.selectedEventId;
    const id = this.selectedDeptDetail?.id;
    if (id) {
      request = this.departmentDetailService.update(id, dto);
    } else {
      request = this.departmentDetailService.create(dto);
    }
    request.subscribe((res) => {
      if (res.success && res.data) {
        if (id) {
          this.departmentDetails.splice(
            this.departmentDetails.findIndex((d) => d.id === id),
            1
          );
          this.messageService.add({
            detail: `???? c???p nh???p ban ${res.data.department?.name}`,
            severity: 'success',
            summary: 'Th??ng b??o',
          });
        } else {
          this.messageService.add({
            detail: `???? th??m ban ${res.data.department?.name}`,
            severity: 'success',
            summary: 'Th??ng b??o',
          });
        }
        this.departmentDetails.push(res.data);
        this.refreshRemainingDepartments();
      }
    });
  }

  public showDetail(dto: DepartmentDetailDto) {
    this.selectedDeptDetail = dto;
    this.detailVisible = true;
  }

  public acceptSelectedDept() {
    if (this.selectedDeptDetails.length) {
      this.departmentDetailService
        .acceptRange(this.selectedDeptDetails.map((d) => d.id))
        .subscribe((res) => {
          if (res.success && res.data) {
            this.loadDepartmentDetails();
            this.messageService.add({
              detail: `???? duy???t ${res.data} ban`,
              severity: 'success',
              summary: 'Th??ng b??o',
            });
          }
        });
    }
  }
}
