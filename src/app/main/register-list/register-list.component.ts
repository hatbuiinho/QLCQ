import { IncorrectInfo } from './../../Shared/dtos/Enums/IncorrectInfo.enum';
import {
  RegisterTableColumns,
  getRegisterTableColumns,
  getColumns,
} from './../../Shared/constants/registerTableColumns.constant';
import { ReceiveClothStatus } from './../../Shared/dtos/Enums/ReceiveClothStatus.enum';
import { CustomMessageServiceService } from './../../Shared/Services/custom-message-service.service';
import { SkillForRegisterDto } from 'src/app/Shared/dtos/SkillForRegisters/SkillForRegisterDto.model';
import { SkillForRegistersService } from 'src/app/Shared/Services/http/SkillForRegisters.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { firstValueFrom, Observable } from 'rxjs';
import { QueryParamKeys } from 'src/app/Shared/constants/constants.module';
import { AreaDto } from 'src/app/Shared/dtos/Areas/AreaDto.model';
import { DepartmentDetailDto } from 'src/app/Shared/dtos/DepartmentDetails/DepartmentDetailDto.model';
import { DepartmentDto } from 'src/app/Shared/dtos/Departments/DepartmentDto.model';
import { ClothingSize } from 'src/app/Shared/dtos/Enums/ClothingSize.enum';
import { Gender } from 'src/app/Shared/dtos/Enums/Gender.enum';
import { PhanLoaiThanhNien } from 'src/app/Shared/dtos/Enums/PhanLoaiThanhNien.enum';
import { PositionType } from 'src/app/Shared/dtos/Enums/PositionType.enum';
import { RegisterRole } from 'src/app/Shared/dtos/Enums/RegisterRole.enum';
import { EventDto } from 'src/app/Shared/dtos/EventDto.model';
import { EventRegistryDto } from 'src/app/Shared/dtos/EventRegistries/EventRegistryDto.model';
import { EventRegistryLookUpDto } from 'src/app/Shared/dtos/EventRegistries/EventRegistryLookUpDto.model';
import { GroupDto } from 'src/app/Shared/dtos/Groups/GroupDto.model';
import { GroupLookUpDto } from 'src/app/Shared/dtos/Groups/GroupLookUpDto.model';
import { ServiceResponse } from 'src/app/Shared/dtos/ServiceResponse.model';
import { BreadCrumbService } from 'src/app/Shared/Services/client/bread-crumb.service';
import { DepartmentService } from 'src/app/Shared/Services/http/Department.service';
import { DepartmentDetailsService } from 'src/app/Shared/Services/http/DepartmentDetails.service';
import { EventService } from 'src/app/Shared/Services/http/Event.service';
import { EventRegistryService } from 'src/app/Shared/Services/http/EventRegistry.service';
import { CellInfo } from './../../Shared/dtos/cell-info';
import { ContactStatusType } from './../../Shared/dtos/Enums/ContactStatusType.enum';
import { MoveType } from './../../Shared/dtos/Enums/MoveType.enum';
import { PrintStatus } from './../../Shared/dtos/Enums/PrintStatus.enum';
import { ReceiveCardStatus } from './../../Shared/dtos/Enums/ReceiveCardStatus.enum';
import { RegisterType } from './../../Shared/dtos/Enums/RegisterType.enum';
import { PageResultDto } from './../../Shared/dtos/PageResultDto.model';
import { AreasService } from './../../Shared/Services/http/Areas.service';
import { GroupService } from './../../Shared/Services/http/Group.service';
import { StatusType } from 'src/app/Shared/dtos/Enums/StatusType.enum';
import * as _ from 'lodash';
import { EventExp } from 'src/app/Shared/dtos/Enums/EventExp.enum';
import { Inplace } from 'primeng/inplace';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.css'],
})
export class RegisterListComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('excelUpload') excelUpload!: HTMLInputElement;
  @ViewChild(Table) table!: Table;
  @ViewChild('filterPanel', { read: ElementRef }) filterPanel!: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.tableOffsetTop = this.table.el.nativeElement.offsetTop;
  }

  public _ = _;
  public events: EventDto[] = [];
  public departmentDetails: DepartmentDetailDto[] = [];
  public departments: DepartmentDto[] = [];
  public areas: AreaDto[] = [];
  public groups: GroupDto[] = [];
  public skills: SkillForRegisterDto[] = [];

  public registerRoles: any[];
  public registerTypes: any[];
  public receiveCardStatuses: any[];
  public printStatuses: any[];
  public receiveClothStatus: any[];

  private _selectedEvent: EventDto | undefined;
  public get selectedEvent(): EventDto | undefined {
    return this._selectedEvent;
  }
  public set selectedEvent(value: EventDto | undefined) {
    if (this._selectedEvent != value) {
      if (value) this.eventService.setDefault(value.id);
      this._selectedEvent = value;
      console.log('set event');
      this.refresh();
    }
  }

  public registers: EventRegistryDto[] = [];
  public selectedRegisters: EventRegistryDto[] = [];
  public selectedRegister: EventRegistryDto | undefined;
  public frozen = true;

  public loading: boolean = true;
  public editingForm: boolean = false;
  public btnItems: MenuItem[];
  public tableOffsetTop = 0;
  private _formVisible: boolean = false;
  public get formVisible(): boolean {
    return this._formVisible;
  }
  public set formVisible(value: boolean) {
    if (
      this.selectedRegister === undefined &&
      this._formVisible === true &&
      value === false
    ) {
      this.confirmation.confirm({
        header: 'Xác nhận',
        message:
          'Huynh đệ chưa tạo đăng ký, nếu đóng form thông tin thành viên sẽ không hiện thị trong trang đăng ký',
        acceptLabel: 'Xác nhận',
        rejectLabel: 'Hủy',
        acceptButtonStyleClass: 'p-button-sm',
        rejectButtonStyleClass: 'p-button-sm',
        accept: () => {
          this._formVisible = false;
        },
      });
    } else this._formVisible = value;
  }
  public moveTypes: any[];

  public totalRecords: number = 0;

  // Component type variables
  public EventExp = EventExp;
  public Gender = Gender;
  public PhanLoaiThanhNien = PhanLoaiThanhNien;
  public RegisterRole = RegisterRole;
  public MoveType = MoveType;
  public ContactStatusType = ContactStatusType;
  public RegisterType = RegisterType;
  public PositionType = PositionType;
  public ReceiveCardStatus = ReceiveCardStatus;
  public PrintStatus = PrintStatus;
  public ClothingSize = ClothingSize;
  public ReceiveClothStatus = ReceiveClothStatus;

  // Filter variables
  public showFilter: boolean = false;
  public showFilterExtend: boolean = false;
  public filterArea?: AreaDto;
  public filterGroup?: GroupDto;
  public filterDepartmentDetail?: DepartmentDetailDto;
  public filterMoveType: MoveType | undefined;
  public filterRegisterType: RegisterType | undefined;
  public filterRegisterRole: RegisterRole | undefined;
  public filterReceiveCardStatus: boolean | undefined;
  public filterPrintStatus: PrintStatus | undefined;
  public filterReceiveCloth: ReceiveClothStatus | undefined;

  // assign
  public _showAssignPopup: boolean = false;
  public set showAssignPopup(show: boolean) {
    if (!show) {
      this.refresh();
      this.selectedRegisters = [];
    }
    this._showAssignPopup = show;
  }
  public get showAssignPopup() {
    return this._showAssignPopup;
  }
  public StatusType = StatusType;
  public assignStatus?: StatusType;
  public assignStatusOptions: any[] = [
    {
      value: StatusType.NotAssignYet,
      label: 'Chưa phân ban',
    },
    {
      value: StatusType.ChuaDuyet,
      label: 'Chờ duyệt',
    },
    {
      value: StatusType.DaDuyet,
      label: 'Đã vào ban',
    },
  ];
  public activeFilter?: number;
  public tableColumns: any[] = [];
  public selectedColumns: any[] = [];
  public frozenColumns: any[] = getColumns([
    'fullName',
    'avatarPath',
    'departmentDetail',
  ]);
  public RegisterTableColumns = RegisterTableColumns;
  public isDynamicTable = true;

  public actionMenuItems: MenuItem[] = [];

  constructor(
    private bread: BreadCrumbService,
    private eventService: EventService,
    private eventRegistryService: EventRegistryService,
    private departmentDetailsService: DepartmentDetailsService,
    private departmentService: DepartmentService,
    private areaService: AreasService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private skillService: SkillForRegistersService,
    private messageService: MessageService,
    private customMessageServiceService: CustomMessageServiceService,
    private confirmation: ConfirmationService,
    private router: Router
  ) {
    this.moveTypes = MoveType.toList();
    this.registerRoles = RegisterRole.toList();
    this.registerTypes = RegisterType.toList();
    this.receiveClothStatus = ReceiveClothStatus.getList();
    // this.receiveCardStatuses = ReceiveCardStatus.getList();
    this.receiveCardStatuses = [
      { value: true, label: 'Đã nhận' },
      { value: false, label: 'chưa nhận' },
    ];

    this.printStatuses = PrintStatus.getList();
    this.btnItems = [
      {
        label: 'Nhập Excel',
        icon: 'fa-regular fa-file-excel',
        command: () =>
          (document.querySelector('input[type=file]') as any)?.click(),
      },
      {
        label: 'Xuất Excel',
        icon: 'fa-solid fa-file-arrow-down',
        command: () => this.exportExcel(),
      },
      {
        label: 'Tải mẫu Excel',
        icon: 'fa-solid fa-file-arrow-down',
        // command: () =>
        //   window.open('assets/excel/Template import.xlsx', '_parent'),
        command: () => this.downloadExcelTemplate(),
      },
      {
        label: 'Mở rộng',
        icon: 'fa-solid fa-expand',
        command: () => {
          document.body.classList.toggle('zoom-out');
          if (document.body.classList.contains('zoom-out')) {
            this.tableOffsetTop = 0;
          } else {
            this.tableOffsetTop = this.table.el.nativeElement.offsetTop;
          }
        },
      },
    ];

    this.actionMenuItems = [
      {
        label: 'Sai ảnh',
        command: () => {
          const selectedRegisters = this.selectedRegisters.map((r) => {
            if (r.inCorrectInfos) {
              r.inCorrectInfos.push(IncorrectInfo.INCORRECT_PHOTO);
            } else {
              r.inCorrectInfos = [IncorrectInfo.INCORRECT_PHOTO];
            }
            return r;
          });
          eventRegistryService.patchFields(selectedRegisters, [
            'inCorrectInfos',
          ]);
        },
      },
    ];
    this.route.queryParams.subscribe((params) => {
      const area = Number(params[QueryParamKeys.area]);
      if (area && this.filterArea) {
        this.filterArea.id = area;
      }
      const departmentDetail = Number(params[QueryParamKeys.departmentDetail]);
      if (departmentDetail && this.filterDepartmentDetail) {
        this.filterDepartmentDetail.id = departmentDetail;
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {}
  ngAfterViewInit(): void {
    this.bread.setPageTitle('Danh sách đăng ký đại lễ');
    setTimeout(
      () => (this.tableOffsetTop = this.table.el.nativeElement.offsetTop),
      300
    );
  }

  ngOnInit(): void {
    this.loadEvents();
    this.loadDepartments();
    this.loadSkills();
    this.tableColumns = getRegisterTableColumns();
    this.selectedColumns = getColumns([
      'avatarPath',
      'fullName',
      'departmentDetail',
      'religiousName',
      'phoneNumber',
      'gender',
      'identityCard',
      'dateOfBirth',
      'organizationStructureId',
      'temporaryAddress',
      'permanentAddress',
      'exps',
    ]);
    console.log(
      '🚀 ~ file: register-list.component.ts:276 ~ RegisterListComponent ~ ngOnInit ~ this.selectedColumns',
      this.selectedColumns
    );

    // this.frozenColumns = getColumns([
    //   'fullName',
    //   'avatarPath',
    //   'departmentDetail',
    // ]);
    // [
    //   { field: 'member.avatarPath', header: 'Ảnh thẻ' },
    //   { field: 'member.fullName', header: 'Tên' },
    //   { field: 'member.religiousName', header: 'Pháp danh' },
    //   { field: 'member.phoneNumber', header: 'Số điện thoại' },
    //   { field: 'member.identityCard', header: 'CCCD' },
    //   { field: 'member.dateOfBirth', header: 'Ngày sinh' },
    //   { field: 'member.organizationStructureId', header: 'Chúng thanh niên' },
    //   { field: 'member.temporaryAddress', header: 'Tạm trú' },
    //   { field: 'member.permanentAddress', header: 'Thường trú' },
    //   { field: 'member.exps', header: 'Số lần về chùa' },
    //   { field: 'member.gender', header: 'Giới tính' },
    // ];
  }

  logSelectedColumn(inplace: Inplace) {
    //   console.log(
    //     '🚀 ~ file: register-list.component.ts:305 ~ RegisterListComponent ~ logSelectedColumn ~ selectedColumns',
    //     this.selectedColumns
    //   );
  }

  updateActiveFilterNumber() {
    let filterCount = 0;
    this.activeFilter = 0;
    if (
      this.filterDepartmentDetail !== undefined &&
      this.filterDepartmentDetail !== null
    ) {
      filterCount++;
    }
    if (this.assignStatus !== undefined && this.assignStatus !== null) {
      filterCount++;
    }
    if (
      this.filterRegisterType !== undefined &&
      this.filterRegisterType !== null
    ) {
      filterCount++;
    }
    if (this.filterMoveType !== undefined && this.filterMoveType !== null) {
      filterCount++;
    }
    if (
      this.filterPrintStatus !== undefined &&
      this.filterPrintStatus !== null
    ) {
      filterCount++;
    }
    if (
      this.filterReceiveCloth !== undefined &&
      this.filterReceiveCloth !== null
    ) {
      filterCount++;
    }
    if (
      this.filterRegisterRole !== undefined &&
      this.filterRegisterRole !== null
    ) {
      filterCount++;
    }
    if (
      this.filterReceiveCardStatus !== undefined &&
      this.filterReceiveCardStatus !== null
    ) {
      filterCount++;
    }
    if (
      this.filterPrintStatus !== undefined &&
      this.filterPrintStatus !== null
    ) {
      filterCount++;
    }
    console.log(
      '🚀 ~ file: register-list.component.ts:295 ~ RegisterListComponent ~ updateActiveFilterNumber ~ filterCount',
      filterCount
    );

    this.activeFilter = filterCount;
  }

  renderAssignStatusOptions() {
    // render options
  }

  public loadDepartments() {
    this.departmentService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          this.departments = res.data?.filter((d) => d.id !== 1) ?? [];
        }
      },
    });
  }
  public loadSkills() {
    this.skillService.getall().subscribe({
      next: (res) => {
        if (res.success) {
          this.skills = res.data ?? [];
        }
      },
    });
  }

  public loadEvents(): void {
    this.eventService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          this.events = res.data ?? [];
          firstValueFrom(this.route.queryParams).then((p) => {
            const event = Number(p[QueryParamKeys.event]);
            if (event) {
              this.selectedEvent = this.events.find((e) => e.id === event);
            } else {
              this.selectedEvent = this.eventService.getDefault(this.events);
            }
            if (p[QueryParamKeys.area]) {
              this.loadAreas();
            }
          });
        }
      },
    });
  }

  public loadDepartmentDetails() {
    if (!this.departmentDetails.length) {
      this.departmentDetailsService
        .search({
          pageIndex: 1,
          pageSize: 9999,
          eventId: this.selectedEvent?.id,
        })
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.departmentDetails = res.data?.items ?? [];
            }
          },
        });
    }
  }

  public loadAreas() {
    if (!this.areas.length) {
      this.areaService
        .search({
          pageIndex: 1,
          pageSize: 9999,
          departmentDetailId: this.filterDepartmentDetail?.id,
        })
        .subscribe({
          next: (res) => {
            if (res.success && res.data) {
              this.areas = res.data.items ?? [];
            }
          },
        });
    }
  }

  public loadGroups() {
    if (this.selectedEvent?.id) {
      const payload: GroupLookUpDto = {
        pageIndex: 1,
        pageSize: 9999,
        eventId: this.selectedEvent.id,
      };

      if (this.filterArea) {
        payload.areaId = this.filterArea.id;
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

  public refresh() {
    this.lazyLoad(this.table?.createLazyLoadMetadata());
  }

  public lazyLoad(e: any) {
    if (this.selectedEvent) {
      const payload = this.computeSearchPayload(e);
      if (!this.nextRequest) {
        this.nextRequest = this.eventRegistryService.search(payload);
      }
      this.processSearchRequest();
    }
  }

  public nextRequest:
    | Observable<ServiceResponse<PageResultDto<EventRegistryDto>>>
    | undefined;

  public processSearchRequest(): void {
    if (this.nextRequest) {
      this.loading = true;
      this.nextRequest.subscribe({
        next: (res) => {
          if (res.success && res.data) {
            if (res.data.items)
              res.data.items.forEach((i: any) => {
                i.registerGroup = (i.leaderId ?? '0') + i.registerRole;
              });
            this.registers = res.data.items ?? [];
            this.totalRecords = res.data.totalRecords;
          }
        },
        complete: () => {
          this.processSearchRequest();
          this.loading = false;
        },
      });
      this.nextRequest = undefined;
    }
  }

  public add() {
    this.selectedRegister = undefined;
    this.formVisible = true;
    this.editingForm = true;
  }

  public edit(dto: EventRegistryDto) {
    this.editingForm = true;
    this.selectedRegister = dto;
    this.formVisible = true;
  }

  public showDetail(dto: EventRegistryDto) {
    this.editingForm = false;
    this.selectedRegister = dto;
    this.formVisible = true;
  }

  public showPreviewDialog: boolean = false;
  public previewRegisters: EventRegistryDto[] = [];
  public previewErrors: CellInfo[] = [];
  public selectedExcel: File | undefined;
  public loadingImport = false;
  public previewExcel(files: FileList | null, e?: any) {
    if (files?.length && this.selectedEvent) {
      this.selectedExcel = files[0];
      e.target.value = '';
      this.loadingImport = true;
      this.eventRegistryService
        .previewExcel(this.selectedEvent.id, this.selectedExcel)
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.previewErrors = res.data?.errors ?? [];
              this.previewRegisters = res.data?.items ?? [];
              this.showPreviewDialog = true;
              this.loadingImport = false;
            }
          },
        });
    }
  }

  public import() {
    if (this.selectedExcel && this.selectedEvent) {
      this.loadingImport = true;
      this.eventRegistryService
        .importExcel(this.selectedEvent.id, this.selectedExcel)
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({
                detail: `Đã cập nhật ${res.data} đăng ký mới`,
                severity: 'success',
              });
              this.showPreviewDialog = false;
              this.refresh();
            } else {
              this.messageService.add({
                detail: `Nhập dữ liệu từ tệp thất bại`,
                severity: 'error',
              });
            }
            this.loadingImport = false;
          },
        });
    }
  }

  public openAssignPopup() {
    if (!this.selectedRegisters?.length) {
      return this.warnNoSelectedRegister();
    }
    this.showAssignPopup = true;
  }

  warnNoSelectedRegister() {
    return this.customMessageServiceService.error(
      'Xin hãy chọn ít nhất một người'
    );
  }

  public exportExcel() {
    const payload = this.computeSearchPayload(
      this.table.createLazyLoadMetadata()
    );
    payload.pageIndex = 1;
    payload.pageSize = this.totalRecords;
    this.eventRegistryService.exportExcel(payload).subscribe((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.download = 'Danh sách đăng ký đại lễ.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  public downloadExcelTemplate() {
    const payload: EventRegistryLookUpDto = {};
    payload.pageIndex = 1;
    payload.pageSize = 0;
    this.eventRegistryService.exportExcel(payload).subscribe((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.download = 'Danh sách đăng ký đại lễ.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  protected computeSearchPayload(e: any) {
    const notAssignYet = this.assignStatus === StatusType.NotAssignYet;
    const payload: EventRegistryLookUpDto = {
      eventId: this.selectedEvent?.id,
      pageSize: e.rows || 10,
      pageIndex: e ? e.first / e.rows + 1 : 1,
      includeMember: true,
      includeLeader: true,
      groupId: this.filterGroup?.id,
      areaId: this.filterArea?.id,
      departmentDetailId: notAssignYet ? 0 : this.filterDepartmentDetail?.id,
      moveType: this.filterMoveType,
      registerRole: this.filterRegisterRole,
      registerType: this.filterRegisterType,
      includeArea: true,
      includeDepartmnetDetail: true,
      includeGroup: true,
      printStatus: this.filterPrintStatus,
      receivedCard: this.filterReceiveCardStatus,
      receiveClothStatus: this.filterReceiveCloth,
      assignStatus: notAssignYet ? undefined : this.assignStatus,
    };
    payload.memberName = e.globalFilter;
    const columns = e.multiSortMeta as { field: string; order: number }[];
    if (columns) {
      console.log(
        '🚀 ~ file: register-list.component.ts:650 ~ RegisterListComponent ~ computeSearchPayload ~ columns',
        columns
      );

      payload.sortBy = columns.map((c) => {
        if (c.field === 'departmentDetailId,areaId,groupId') {
          return `departmentDetailId ${
            c.order === 1 ? 'asc' : 'desc'
          },areaId,groupId`;
        }
        if (c.field === 'member.gender,member.fullName') {
          return `member.gender ${
            c.order === 1 ? 'asc' : 'desc'
          },member.fullName`;
        }
        if (c.field === `registerType,leaderId,registerRole DESC`) {
          return `registerType ${
            c.order === 1 ? 'asc' : 'desc'
          },leaderId,registerRole DESC`;
        }
        return `${c.field} ${c.order === 1 ? 'asc' : 'desc'}`;
      });
    }
    return payload;
  }

  // toggleFilterPanel() {
  //   this.filterPanel.nativeElement.click();
  // }
}
