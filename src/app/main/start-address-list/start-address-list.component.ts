import { StartAddressesService } from '../../Shared/Services/http/StartAddresses.service';
import { EventDto } from 'src/app/Shared/dtos/EventDto.model';
import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Table } from 'primeng/table';
import { StartAddressDto } from 'src/app/Shared/dtos/StartAddresses/StartAddressDto.model';
import { lastValueFrom, Observable } from 'rxjs';
import { ServiceResponse } from 'src/app/Shared/dtos/ServiceResponse.model';
import { UpSertStartAddressDto } from 'src/app/Shared/dtos/StartAddresses/UpSertStartAddressDto.model';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BreadCrumbService } from 'src/app/Shared/Services/client/bread-crumb.service';

@Component({
  selector: 'app-start-address-list',
  templateUrl: './start-address-list.component.html',
  styleUrls: ['./start-address-list.component.css'],
})
export class StartAddressListComponent implements OnInit, AfterViewInit {
  @ViewChild(Table) table!: Table;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.tableOffsetTop = this.table.el.nativeElement.offsetTop;
  }

  // Component data variables
  private _selectedEvent: EventDto | undefined;
  public get selectedEvent(): EventDto | undefined {
    return this._selectedEvent;
  }
  public set selectedEvent(value: EventDto | undefined) {
    this._selectedEvent = value;
    this.loadAddresses();
  }
  public startAddreses: StartAddressDto[] = [];
  public selectedStartAddresses: StartAddressDto[] = [];
  public selectedStartAddress: StartAddressDto | undefined;

  // Component state variables
  public btnItems: MenuItem[];
  public loading: boolean = false;
  public tableOffsetTop: number = 0;
  public formVisible: boolean = false;

  constructor(
    private startAddressesService: StartAddressesService,
    private messageService: MessageService,
    private confirmService: ConfirmationService,
    private breadCrumbService: BreadCrumbService
  ) {
    breadCrumbService.setPageTitle('Quản lý địa điểm xuất phát');
    this.btnItems = [
      {
        label: 'Xóa đã chọn',
        icon: 'fa-regular fa-trash-can',
        command: () => {
          this.deleteSelected();
        },
      },
    ];
  }

  ngAfterViewInit(): void {
    setTimeout(
      () => (this.tableOffsetTop = this.table.el.nativeElement.offsetTop),
      300
    );
  }

  ngOnInit(): void {
    // this.loadAddresses();
  }

  public loadAddresses() {
    let response: Observable<ServiceResponse<StartAddressDto[]>>;
    if (this.selectedEvent) {
      response = this.startAddressesService.event(this.selectedEvent.id);
    } else {
      response = this.startAddressesService.getall();
    }
    response.subscribe({
      next: (res) => {
        if (res.data && res.success) {
          this.startAddreses = res.data;
        }
      },
    });
  }

  public add() {
    this.selectedStartAddress = undefined;
    this.formVisible = true;
  }

  public edit(item: StartAddressDto) {
    this.selectedStartAddress = item;
    this.formVisible = true;
  }

  public save(dto: UpSertStartAddressDto) {
    let request: Observable<ServiceResponse<StartAddressDto>>;
    this.loading = true;
    const id = this.selectedStartAddress?.id;
    if (id) {
      request = this.startAddressesService.update(id, dto);
    } else {
      request = this.startAddressesService.create(dto);
    }
    request.subscribe((res) => {
      if (res.success && res.data) {
        if (id) {
          const index = this.startAddreses.findIndex((d) => d.id === id);
          if (index >= 0) {
            this.startAddreses[index] = res.data;
          }
          this.messageService.add({
            detail: `Đã cập nhập địa điểm ${res.data.name}`,
            severity: 'success',
            summary: 'Thông báo',
          });
        } else {
          this.messageService.add({
            detail: `Đã thêm địa điểm ${res.data.name}`,
            severity: 'success',
            summary: 'Thông báo',
          });
          this.startAddreses = [...this.startAddreses, res.data];
        }
        this.formVisible = false;
      }
      this.loading = false;
    });
  }

  public deleteSelected() {
    if (this.selectedStartAddresses.length)
      this.confirmService.confirm({
        message: `Bạn có chắc chắn muốn xóa ${this.selectedStartAddresses.length} địa điểm?`,
        accept: async () => {
          this.loading = true;
          let success: number[] = [];
          for (
            let index = 0;
            index < this.selectedStartAddresses.length;
            index++
          ) {
            const item = this.selectedStartAddresses[index];
            await lastValueFrom(
              this.startAddressesService.delete(item.id)
            ).then((res) => {
              if (res.success) {
                success.push(item.id);
              }
            });
          }
          this.loading = false;
          this.selectedStartAddresses = [];
          this.startAddreses = this.startAddreses.filter(
            (i) => !success.includes(i.id)
          );
          if (success.length > 0) {
            this.messageService.add({
              detail: `Đã xóa ${success.length} địa điểm`,
              severity: 'success',
              summary: 'Thông báo',
            });
          }
        },
      });
  }
}
