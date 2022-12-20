import { ServiceResponse } from 'src/app/Shared/dtos/ServiceResponse.model';
import { RegistryPageComponent } from './../../Shared/components/registry-page/registry-page.component';
import { environment } from 'src/environments/environment';
import { ScopeType } from 'src/app/Shared/dtos/Enums/ScopeType.enum';
import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DepartmentDetailDto } from 'src/app/Shared/dtos/DepartmentDetails/DepartmentDetailDto.model';
import { EventDto } from 'src/app/Shared/dtos/EventDto.model';
import { EventRegistryDto } from 'src/app/Shared/dtos/EventRegistries/EventRegistryDto.model';
import { BreadCrumbService } from 'src/app/Shared/Services/client/bread-crumb.service';
import { EventService } from 'src/app/Shared/Services/http/Event.service';
import { EventRegistryService } from 'src/app/Shared/Services/http/EventRegistry.service';
import { EventRegistryPagesService } from 'src/app/Shared/Services/http/EventRegistryPages.service';
import { EventRegistryPageDto } from 'src/app/Shared/dtos/EventRegistryPages/EventRegistryPageDto.model';
import { EventRegistryLookUpDto } from 'src/app/Shared/dtos/EventRegistries/EventRegistryLookUpDto.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registry-page-list',
  templateUrl: './registry-page-list.component.html',
  styleUrls: ['./registry-page-list.component.css'],
})
export class RegistryPageListComponent implements OnInit, AfterViewInit {
  @ViewChild(RegistryPageComponent) form!: RegistryPageComponent;
  @ViewChild(Table) table!: Table;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.tableOffsetTop = this.table.el.nativeElement.offsetTop;
  }

  // Component data variables
  public events: EventDto[] = [];
  public departmentDetails: DepartmentDetailDto[] = [];
  public pages: EventRegistryPageDto[] = [];

  // Selected event
  private _selectedEvent: EventDto | undefined;
  public get selectedEvent(): EventDto | undefined {
    return this._selectedEvent;
  }
  public set selectedEvent(value: EventDto | undefined) {
    if (value && this.selectedEvent?.id !== value.id) {
      this._selectedEvent = value;
      this.loadPages();
      this.eventService.setDefault(value);
    } else this._selectedEvent = value;
  }
  // Selected pages
  public selectedPages: EventRegistryPageDto[] = [];
  public selectedPage: EventRegistryPageDto | undefined;

  // Component type variables
  public ScopeType = ScopeType;

  // Component state variables
  public formEditing: boolean = false;
  public formVisible: boolean = false;
  public loading: boolean = false;
  public tableOffsetTop: number = 0;
  public btnItems: MenuItem[];

  constructor(
    bread: BreadCrumbService,
    private eventService: EventService,
    private eventRegistryService: EventRegistryService,
    private pageService: EventRegistryPagesService,
    private messageService: MessageService
  ) {
    bread.setPageTitle('Danh sách đăng ký đại lễ');
    this.btnItems = [];
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
        if (res.success && res.data?.length) {
          this.events = res.data;
          this.selectedEvent = this.eventService.getDefault(this.events);
        }
      },
      complete: () => (this.loading = false),
    });
  }

  public loadPages() {
    if (this.selectedEvent?.id) {
      this.loading = true;
      const payload: EventRegistryLookUpDto = {
        pageIndex: 1,
        pageSize: 999999,
        eventId: this.selectedEvent.id,
      };
      this.pageService.search(payload).subscribe({
        next: (res) => {
          if (res.success && res.data?.items) {
            res.data.items.forEach((t: any) => {
              t.scopeCtn = ScopeType.toString(t.type) + (t.ctnId ?? 0);
            });
            this.pages = res.data.items;
          }
        },
        complete: () => (this.loading = false),
      });
    }
  }

  ngOnInit(): void {
    // this.loadEvents();
  }

  public add() {
    this.form.resetForm();
    this.formVisible = true;
    this.selectedPage = undefined;
    this.formEditing = true;
  }

  public edit(dto: EventRegistryPageDto) {
    this.form.resetForm();
    this.formVisible = true;
    this.selectedPage = dto;
    this.formEditing = true;
  }

  public showDetail(dto: EventRegistryPageDto) {
    this.formVisible = true;
    this.selectedPage = undefined;
    this.formEditing = false;
  }

  public copyToClipboard(page: EventRegistryPageDto) {
    const registryPageUrl = this.getPageUrl(page.id);
    navigator.clipboard.writeText(registryPageUrl);
    var a = page as any;
    a.copied = true;
    setTimeout(() => {
      a.copied = false;
    }, 1000);
  }

  public getPageUrl(id: string) {
    const registryPageUrl = environment.REGISTRY_HOST + '/' + id;
    return registryPageUrl;
  }

  public submit() {
    const data = this.form.getUpSertDto();
    if (data) {
      const id = this.selectedPage?.id;
      let response: Observable<ServiceResponse<EventRegistryPageDto>>;
      if (id) {
        response = this.pageService.update(id, data);
      } else {
        response = this.pageService.create(data);
      }
      response.subscribe({
        next: (res) => {
          if (res.success && res.data) {
            if (id) {
              const index = this.pages.findIndex((p) => p.id == id);
              if (index >= 0) this.pages[index] = res.data;
              this.messageService.add({
                detail: `Đã cập nhập trang đăng ký ${res.data.name}`,
                severity: 'success',
                summary: 'Thông báo',
              });
            } else {
              this.pages.push(res.data);
              this.messageService.add({
                detail: `Đã thêm trang đăng ký ${res.data.name}`,
                severity: 'success',
                summary: 'Thông báo',
              });
            }
          } else {
            this.messageService.add({
              detail: `Đã tạo/chỉnh sửa trang đăng ký thất bại`,
              severity: 'error',
              summary: 'Thông báo',
            });
          }
        },
      });
    }
  }
}
