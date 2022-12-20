import { GroupService } from './../../Services/http/Group.service';
import { GroupLookUpDto } from './../../dtos/Groups/GroupLookUpDto.model';
import { DepartmentDetailsService } from './../../Services/http/DepartmentDetails.service';
import { ServiceResponse } from './../../dtos/ServiceResponse.model';
import { from, Observable, Subscription } from 'rxjs';
import { ContactStatusType } from './../../dtos/Enums/ContactStatusType.enum';
import { ClothingSize } from 'src/app/Shared/dtos/Enums/ClothingSize.enum';
import { CustomMessageServiceService } from 'src/app/Shared/Services/custom-message-service.service';
import { AreasService } from 'src/app/Shared/Services/http/Areas.service';
import { GroupDto } from 'src/app/Shared/dtos/Groups/GroupDto.model';
import { AreaDto } from 'src/app/Shared/dtos/Areas/AreaDto.model';
import { UpdateEventRegistryAssignDto } from 'src/app/Shared/dtos/EventRegistries/UpdateEventRegistryAssignDto.model';
import { AssignType } from 'src/app/Shared/dtos/Enums/AssignType.enum';
import { StatusType } from 'src/app/Shared/dtos/Enums/StatusType.enum';
import { PositionType } from 'src/app/Shared/dtos/Enums/PositionType.enum';
import { Toolbar } from 'primeng/toolbar';
import { EventRegistryLookUpDto } from 'src/app/Shared/dtos/EventRegistries/EventRegistryLookUpDto.model';
import { EventRegistryService } from 'src/app/Shared/Services/http/EventRegistry.service';
import { DepartmentDetailDto } from 'src/app/Shared/dtos/DepartmentDetails/DepartmentDetailDto.model';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { EventRegistryDto } from '../../dtos/EventRegistries/EventRegistryDto.model';
import { Table } from 'primeng/table';
import { FilterMatchMode, MenuItem, ConfirmationService } from 'primeng/api';
import { EventDto } from '../../dtos/EventDto.model';
import { Dialog } from 'primeng/dialog';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Inplace } from 'primeng/inplace';

@Component({
  selector: 'app-department-assign-dialog',
  templateUrl: './department-assign-dialog.component.html',
  styleUrls: ['./department-assign-dialog.component.css'],
})
export class DepartmentAssignDialogComponent implements OnInit, OnChanges {
  @Input()
  fromRegisterList = false;

  @Input()
  registerList: EventRegistryDto[] = [];

  @Input()
  isViewOnly: boolean = false;

  @Input()
  isPropose?: boolean;

  @Input()
  assignType!: AssignType;

  @Input()
  event!: EventDto | undefined;

  @Input()
  group?: GroupDto;

  @Input()
  area?: AreaDto;

  @Input()
  department!: DepartmentDetailDto | undefined;

  @Input()
  departments!: (DepartmentDetailDto | undefined)[];

  @Output('departmentChange')
  changeDepartment = new EventEmitter<DepartmentDetailDto | undefined>();

  private _isVisible = false;
  @Input('visible')
  public set isVisible(value: boolean) {
    this._isVisible = value;
    if (value && this.fromRegisterList) {
      setTimeout(() => {
        this.changeDepartmentButton.nativeElement.click();
      }, 300);
    }
  }
  public get isVisible() {
    return this._isVisible;
  }

  @Output('visibleChange')
  visibleChange = new EventEmitter<boolean>();

  @ViewChild('toolbar') toolbar!: Toolbar;
  @ViewChild('registerTable') registerTable!: Table;
  @ViewChild('dialog', { static: true }) dialog!: Dialog;
  @ViewChild('assignPanel') assignPanel!: OverlayPanel;
  @ViewChild('changeDepartment', { read: ElementRef })
  changeDepartmentButton!: ElementRef;

  private _registers: EventRegistryDto[] = [];

  isDepartment: boolean = false;
  isArea: boolean = false;
  isGroup: boolean = false;

  public ContactStatusType = ContactStatusType;
  public contactStatuses = ContactStatusType.getList();
  public ClothingSize = ClothingSize;
  public FilterMatchMode = FilterMatchMode;
  public StatusType = StatusType;
  public PositionType = PositionType;
  public AssignType = AssignType;
  public tableOffsetTop: number = 0;
  public loading: boolean = false;
  public registers: EventRegistryDto[] = [];
  public positionOptions: MenuItem[] = [];
  public positions = PositionType.toList();
  public approveOptions: MenuItem[] = [];
  public position: PositionType = PositionType.Manager;
  public wishDepartmentId: number | undefined;
  public memberFilter: string | undefined;
  public selectedRegister: EventRegistryDto | undefined;
  public isOpenMemberDetail: boolean = false;
  public severities: string[] = ['primary', 'success', 'info'];
  public totalRecords: number = 0;

  public areas: AreaDto[] = [];
  public groups: GroupDto[] = [];

  public filterDepartment?: number;
  public filterArea?: number;
  public filterGroup?: number;
  public headerTitle!: string;
  public targetLabel!: string;
  public positionFilter = null;
  public loadRegisterSubcription?: Subscription;

  public set selectedRegisters(dto: EventRegistryDto[]) {
    this._registers = dto;
  }
  public get selectedRegisters() {
    return this._registers;
  }
  public get assignLabel() {
    return this.isPropose && this.assignType === AssignType.DEPARTMENT
      ? 'Đề xuất'
      : 'Phân';
  }
  public assignStatus: StatusType = StatusType.NotAssignYet;
  public showFilter: boolean = true;
  public wishDepartments: (DepartmentDetailDto | undefined)[] = [];
  public assignStatusOptions: any[] = [];
  public isOpenChangeDepartment = false;
  public isApprove = this.assignStatus === StatusType.DaDuyet;

  constructor(
    private eventRegistryService: EventRegistryService,
    private messageService: CustomMessageServiceService,
    private areaService: AreasService,
    private confirmationService: ConfirmationService,
    private departmentDetailsService: DepartmentDetailsService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.refresh();
    this.isDepartment = this.assignType === AssignType.DEPARTMENT;
    this.isArea = this.assignType === AssignType.AREA;
    this.isGroup = this.assignType === AssignType.GROUP;

    // this.assignStatusOptions = [
    //   { value: StatusType.NotAssignYet, label: notAssignYetLabel },
    //   { value: StatusType.ChuaDuyet, label: 'Chờ duyệt' },
    //   { value: StatusType.DaDuyet, label: assignedLabel },
    // ];
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.renderStatusOption();
    if (this.fromRegisterList) {
      this.registers = this.registerList;
      this.selectedRegisters = this.registerList;
      this.headerTitle = 'Phân ban';
      this.loadDepartmentDetails();
      const isGroupAssign =
        this.filterDepartment && this.filterArea && this.filterGroup;
      const isAreaAssign = this.filterDepartment && this.filterArea;
      if (isGroupAssign) {
        this.targetLabel = 'nhóm';
      } else if (isAreaAssign) {
        this.targetLabel = 'khu vực';
      } else {
        this.targetLabel = 'ban';
      }
    }

    this.approveOptions = [
      {
        label: 'Xóa khỏi ' + this.targetLabel,
        icon: 'pi pi-eraser text-red-500',
        command: () => {
          // ConfirmationService.
          this.confirmationService.confirm({
            header: 'Cảnh báo',
            icon: 'pi pi-exclamation-triangle text-red-500',
            message: 'Huynh đệ chắc chắn muốn xóa ạ',
            acceptLabel: 'Xóa',
            acceptIcon: 'pi pi-exclamation-triangle',
            rejectLabel: 'Hủy',
            acceptButtonStyleClass: 'background: white',
            accept: () => this.removeAssign(),
          });
        },
      },
    ];

    if (this.isVisible && !this.fromRegisterList) {
      this.isDepartment = this.assignType === AssignType.DEPARTMENT;
      this.isArea = this.assignType === AssignType.AREA;
      this.isGroup = this.assignType === AssignType.GROUP;
      this.wishDepartments = this.departments.slice();
      this.wishDepartments.unshift({
        department: { id: 0, name: 'Tùy CTN sắp xếp' },
      } as DepartmentDetailDto);

      const areaTitleExtra = this.area?.name
        ? ` khu vực [${this.area.name}]`
        : '';
      const groupTitleExtra = this.group?.name
        ? ` nhóm [${this.group.name}]`
        : '';
      this.headerTitle = `${
        this.isViewOnly ? 'Danh sách' : 'Đề xuất vị trí trong'
      } ban [${
        this.department?.department?.name
      }]${areaTitleExtra}${groupTitleExtra}`;
      this.wishDepartmentId = this.department?.department?.id;
      this.refresh();
    }
  }

  renderStatusOption() {
    this.assignStatusOptions = [];
    this.assignStatusOptions.push({
      value: StatusType.ChuaDuyet,
      label: 'Chờ duyệt',
    });
    if (this.isViewOnly) {
      this.assignStatus = StatusType.DaDuyet;
    }
    switch (this.assignType) {
      case AssignType.DEPARTMENT:
        this.targetLabel = 'ban';
        if (!this.isViewOnly) {
          this.assignStatusOptions.unshift({
            value: StatusType.NotAssignYet,
            label: 'Chưa phân ban',
          });
        }

        this.assignStatusOptions.push({
          value: StatusType.DaDuyet,
          label: 'Đã vào ban',
        });
        return;
      case AssignType.AREA:
        this.targetLabel = 'khu vực';
        if (!this.isViewOnly) {
          this.assignStatusOptions.unshift({
            value: StatusType.NotAssignYet,
            label: 'Chưa phân khu vực',
          });
        }

        this.assignStatusOptions.push({
          value: StatusType.DaDuyet,
          label: 'Đã vào khu vực',
        });
        return;
      case AssignType.GROUP:
        this.targetLabel = 'nhóm';
        if (!this.isViewOnly) {
          this.assignStatusOptions.unshift({
            value: StatusType.NotAssignYet,
            label: 'Chưa phân nhóm',
          });
        }
        this.assignStatusOptions.push({
          value: StatusType.DaDuyet,
          label: 'Đã vào nhóm',
        });
        return;
      default:
    }
  }

  removeAssign() {
    this.proposeOrAssign(true);
  }

  openConfirmRemoveAssign() {
    this.confirmationService.confirm({
      header: 'Cảnh báo',
      icon: 'pi pi-exclamation-triangle text-red-500',
      message: 'Huynh đệ chắc chắn muốn xóa ạ',
      acceptLabel: 'Xóa',
      acceptIcon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Hủy',
      acceptButtonStyleClass: 'background: white',
      accept: () => this.removeAssign(),
    });
  }

  public proposeOrAssign(isRemove?: boolean) {
    const isGroupAssign =
      this.filterDepartment && this.filterArea && this.filterGroup;
    const isAreaAssign = this.filterDepartment && this.filterArea;

    if (!this.selectedRegisters.length) {
      return this.warnNoSelectedRegister();
    }
    let assignId: number = -1;
    if (isRemove) {
      assignId = 0;
      if (this.isArea) {
        this.position = PositionType.AreaLeader;
      }
      if (this.isGroup) {
        this.position = PositionType.GroupLeader;
      }
    } else if (this.fromRegisterList || this.isOpenChangeDepartment) {
      if (this.filterDepartment && this.filterArea && this.filterGroup) {
        assignId = this.filterGroup;
      } else if (this.filterDepartment && this.filterArea) {
        assignId = this.filterArea;
      } else if (this.filterDepartment) {
        assignId = this.filterDepartment;
      }
    } else {
      if (this.isDepartment) {
        assignId = this.department?.id || -1;
      }
      if (this.isArea) {
        assignId = this.area?.id || -1;
      }
      if (this.isGroup) {
        assignId = this.group?.id || -1;
      }
    }

    const body: UpdateEventRegistryAssignDto = {
      id: assignId,
      position: this.position,
      registries: this.selectedRegisters?.map((r) => r.id) || [],
    };
    let request: Observable<ServiceResponse<any>>;
    if (this.isGroup || isGroupAssign) {
      request = this.eventRegistryService.groupAssign(body);
    } else if (this.isArea || isAreaAssign) {
      request = this.eventRegistryService.areaAssign(body);
    } else {
      request = this.eventRegistryService.departmentAssign(body);
    }
    const action = isRemove
      ? `Xóa khỏi ${this.targetLabel}`
      : `Phân vào ${this.targetLabel}`;
    request.subscribe({
      next: () => {
        this.messageService.success(`${action} thành công`, 'Thành công');
        this.refresh();
      },
      error: ({ error }) => {
        this.messageService.error(error.message || '', `${action} lỗi`);
      },
      complete: () => {
        this.changeDepartmentButton.nativeElement.click(); // toggle overlay panel
        this.resetData();
        if (this.isOpenChangeDepartment) {
          this.isOpenChangeDepartment = false;
        }
      },
    });
  }

  public refresh() {
    if (this.registerTable) {
      this.loadRegisters(this.registerTable.createLazyLoadMetadata());
    }
  }
  public onFilterDepartmentChange() {
    if (!this.fromRegisterList && !this.isOpenChangeDepartment) {
      this.refresh();
    }
  }

  public loadRegisters(e: any) {
    if (this.loadRegisterSubcription) {
      this.loadRegisterSubcription.unsubscribe();
    }
    if ((this.department && this.isVisible) || this.fromRegisterList) {
      this.loading = true;
      this.isApprove = this.assignStatus === StatusType.DaDuyet;
      const payload: EventRegistryLookUpDto = {};
      const selectedRegisterIds = this.selectedRegisters?.map((r) => r.id);
      payload.eventId = this.department?.eventId;
      payload.includeDepartmnetDetail = true;

      payload.pageSize = e.rows;
      payload.pageIndex = e.first / e.rows + 1;
      payload.includeMember = true;
      payload.groupId = this.group?.id;
      payload.areaId = this.area?.id;
      payload.includeDepartmnetDetail = true;
      payload.includeArea = true;
      payload.includeGroup = true;

      if (this.isDepartment || this.isArea || this.isGroup) {
        if (this.isViewOnly) {
          payload.departmentDetailId = this.department?.id;
        }
        // payload.assignStatus = StatusType.DaDuyet;
        if (this.assignStatus) {
          payload.assignStatus = this.assignStatus;
          if (this.isArea) {
            payload.areaId = this.area?.id;
          }
          if (this.isGroup) {
            payload.groupId = this.group?.id;
          }
        } else if (this.assignStatus === StatusType.NotAssignYet) {
          if (this.isDepartment) {
            payload.departmentDetailId = 0;
          }
          if (this.isArea) {
            payload.areaId = 0;
          }
          if (this.isGroup) {
            payload.groupId = 0;
          }
          payload.assignStatus = undefined;
        }
      }
      if (this.isArea || this.isGroup || this.isApprove) {
        payload.departmentDetailId = this.department?.id;
      }
      if (this.isGroup) {
        payload.areaId = this.area?.id;
      }

      if (
        this.isDepartment &&
        this.wishDepartmentId &&
        !this.isViewOnly &&
        !this.isApprove
      ) {
        payload.wishDepartment = this.wishDepartmentId;
      }
      if (this.fromRegisterList) {
        // add id list to payload
        payload.registers = this.selectedRegisters.map((r) => r.id);
      }

      payload.memberName = this.memberFilter;
      const columns = e.multiSortMeta as { field: string; order: number }[];
      if (columns) {
        payload.sortBy = columns.map(
          (c) => `${c.field} ${c.order === 1 ? 'asc' : 'desc'}`
        );
      }

      this.loadRegisterSubcription = this.eventRegistryService
        .search(payload)
        .subscribe({
          next: (res) => {
            if (res.data?.items) {
              res.data?.items.forEach((i) => {
                i.registerGroup = (i.leaderId ?? '0') + i.registerRole;
              });
            }
            const responseRegisters = res.data?.items ?? [];
            let remainRegisters;
            if (this.fromRegisterList) {
              remainRegisters = this.registers.filter((reg) => {
                return !selectedRegisterIds?.includes(reg.id);
              });
            }
            console.log('this.registers', this.registers);

            this.registers = [
              // ...this.registers,
              ...responseRegisters,
              ...(remainRegisters || []),
            ];
            this.totalRecords = res.data?.totalRecords || 0;
          },
          complete: () => {
            this.loading = false;
            this.resetData();
          },
        });
    }
  }

  changeStatus(status: StatusType) {
    if (!this.selectedRegisters.length) {
      return this.warnNoSelectedRegister();
    }
    const registerIds = this.selectedRegisters.map((r) => r.id);
    this.eventRegistryService
      .updateAssignStatus(status, registerIds)
      .subscribe({
        next: () => {
          this.messageService.success('Duyệt thành công');
          this.refresh();
        },
        error: ({ error }) => {
          this.messageService.error(error.message || '', 'Duyệt lỗi');
        },
        complete: () => {
          // this.resetData();
        },
      });
  }

  loadAreas() {
    if (!this.areas.length && this.filterDepartment) {
      this.areaService
        .search({
          pageIndex: 1,
          pageSize: 9999,
          departmentDetailId: this.filterDepartment,
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

  // loadGroups() {
  //   if (this.event?.id) {
  //     const payload: GroupLookUpDto = {};
  //     payload.pageIndex = 1;
  //     payload.pageSize = 999999;
  //     payload.eventId = this.event?.id;
  //     if (this.filterArea) {
  //       payload.areaId = this.filterArea;
  //     }
  //     this.groupService.search(payload).subscribe({
  //       next: (res) => {
  //         if (res.success && res.data) {
  //           this.groups = res.data.items ?? [];
  //         }
  //       },
  //     });
  //   }
  // }

  resetData() {
    this.selectedRegisters = [];
    // this.wishDepartmentId = undefined;
    // this.memberFilter = undefined;
    // this.registerTable.reset();
  }

  onHide() {
    this.visibleChange.emit(this.isVisible);
    this.registerTable.reset();
    this.resetData();
  }

  openMemberDetail(dto: EventRegistryDto) {
    this.selectedRegister = dto;
    this.isOpenMemberDetail = true;
  }

  warnNoSelectedRegister() {
    return this.messageService.error('Xin hãy chọn ít nhất một người');
  }

  public loadDepartmentDetails() {
    this.departmentDetailsService
      .search({
        pageIndex: 1,
        pageSize: 9999,
        eventId: this.event?.id,
      })
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.departments = res.data?.items ?? [];
          }
        },
      });
  }

  public loadGroups() {
    if (this.event?.id && this.filterDepartment && this.filterArea) {
      const payload: GroupLookUpDto = {
        pageIndex: 1,
        pageSize: 9999,
        eventId: this.event.id,
      };

      payload.departmentId = this.filterDepartment;
      payload.areaId = this.filterArea;
      this.groupService.search(payload).subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.groups = res.data.items ?? [];
          }
        },
      });
    }
  }

  renderPositionOption(isQuick: boolean) {
    if (!this.selectedRegisters.length) {
      return this.warnNoSelectedRegister();
    }
    if (
      // this.fromRegisterList &&
      !isQuick &&
      !(this.filterDepartment || this.filterArea || this.filterGroup)
    ) {
      this.positionOptions = [];
      return this.messageService.error('Hãy chọn ban muốn phân ạ');
    }
    let options: typeof this.positions = [];
    if (this.fromRegisterList || this.isOpenChangeDepartment) {
      if (this.filterDepartment) {
        options = this.positions.filter((pos) => {
          return pos.label.match(
            /.*(ban|học việc|hỗ trợ|thư ký|thành viên).*/i
          );
        });
      }

      if (this.filterArea) {
        options = this.positions.filter((pos) => {
          return pos.label.match(/.*(khu vực|thành viên).*/i);
        });
      }

      if (this.filterGroup) {
        options = this.positions.filter((pos) => {
          return pos.label.match(/.*(nhóm|thành viên).*/i);
        });
      }
    } else {
      options = this.positions.filter((pos) => {
        switch (this.assignType) {
          case AssignType.DEPARTMENT:
            return pos.label.match(
              /.*(ban|học việc|hỗ trợ|thư ký|thành viên).*/i
            );
          case AssignType.AREA:
            return pos.label.match(/.*(khu vực|thành viên).*/i);
          case AssignType.GROUP:
            return pos.label.match(/.*(nhóm|thành viên).*/i);
          default:
            return pos.label.match(
              /.*(ban|học việc|hỗ trợ|thư ký|thành viên).*/i
            );
        }
      });
    }

    this.positionOptions = options
      .map(({ label, value }) => {
        let disabled = false;
        let labelValue;
        if (label.match(/.*(trưởng).*/i)) {
          if (this.selectedRegisters && this.selectedRegisters?.length > 1) {
            disabled = true;
          }
        }
        if (label.match(/.*(trưởng|phó) ban.*/i)) {
          labelValue = 'Đề xuất ' + label.toLowerCase();
        } else {
          labelValue = 'Phân ' + label.toLowerCase();
        }
        return {
          label: labelValue,
          command: () => {
            this.position = value;
            this.proposeOrAssign();
          },
          disabled,
        };
      })
      .filter((e) => !!e.label);
  }
  openChangeDepartment($event: MouseEvent) {
    if (!this.selectedRegisters.length) {
      return this.warnNoSelectedRegister();
    }
    this.assignPanel.toggle($event);
  }

  public save(
    register: EventRegistryDto,
    inplace: Inplace,
    ...fields: string[]
  ) {
    if (fields.length && register) {
      register.leaderId = register.leader?.id;
      const payload: { [index: string]: any } = {};
      const tempRegister = register as any;
      fields.forEach((field) => {
        if (field) {
          payload[field] = tempRegister[field];
        }
      });
      this.eventRegistryService.patchUpdate([register.id], payload).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.success('Đã cập nhật thông tin đăng ký');
          }
        },
        error: (err) => {
          this.messageService.error(
            err.response?.message || 'Đã có lỗi xảy ra khi cập nhật'
          );
        },
        complete: () => {
          inplace.deactivate();
        },
      });
    }
  }
}
