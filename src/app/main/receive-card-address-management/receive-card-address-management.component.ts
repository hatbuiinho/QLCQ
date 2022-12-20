import { Component, HostListener, ViewChild } from '@angular/core';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, lastValueFrom } from 'rxjs';
import { EventDto } from 'src/app/Shared/dtos/EventDto.model';
import { ReceiveCardAddressDto } from 'src/app/Shared/dtos/ReceiveCardLocations/ReceiveCardAddressDto.model';
import { UpSertReceiveCardAddressDto } from 'src/app/Shared/dtos/ReceiveCardLocations/UpSertReceiveCardAddressDto.model';
import { ServiceResponse } from 'src/app/Shared/dtos/ServiceResponse.model';
import { BreadCrumbService } from 'src/app/Shared/Services/client/bread-crumb.service';
import { ReceiveCardAddressesService } from 'src/app/Shared/Services/http/ReceiveCardAddresses.service';

@Component({
  selector: 'app-receive-card-address-management',
  templateUrl: './receive-card-address-management.component.html',
  styleUrls: ['./receive-card-address-management.component.css'],
})
export class ReceiveCardAddressManagementComponent {
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
  public startAddreses: ReceiveCardAddressDto[] = [];
  public selectedItems: ReceiveCardAddressDto[] = [];
  public selectedStartAddress: ReceiveCardAddressDto | undefined;

  // Component state variables
  public btnItems: MenuItem[];
  public loading: boolean = false;
  public tableOffsetTop: number = 0;
  public formVisible: boolean = false;

  constructor(
    private receiveCardService: ReceiveCardAddressesService,
    private messageService: MessageService,
    private confirmService: ConfirmationService,
    breadCrumbService: BreadCrumbService
  ) {
    breadCrumbService.setPageTitle('Quản lý địa điểm nhận thẻ');
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
    let response: Observable<ServiceResponse<ReceiveCardAddressDto[]>>;
    if (this.selectedEvent) {
      response = this.receiveCardService.event(this.selectedEvent.id);
    } else {
      response = this.receiveCardService.getall();
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

  public edit(item: ReceiveCardAddressDto) {
    this.selectedStartAddress = item;
    this.formVisible = true;
  }

  public save(dto: UpSertReceiveCardAddressDto) {
    let request: Observable<ServiceResponse<ReceiveCardAddressDto>>;
    this.loading = true;
    const id = this.selectedStartAddress?.id;
    if (id) {
      request = this.receiveCardService.update(id, dto);
    } else {
      request = this.receiveCardService.create(dto);
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
    if (this.selectedItems.length)
      this.confirmService.confirm({
        message: `Bạn có chắc chắn muốn xóa ${this.selectedItems.length} địa điểm?`,
        accept: async () => {
          this.loading = true;
          let success: number[] = [];
          for (let index = 0; index < this.selectedItems.length; index++) {
            const item = this.selectedItems[index];
            await lastValueFrom(this.receiveCardService.delete(item.id)).then(
              (res) => {
                if (res.success) {
                  success.push(item.id);
                }
              }
            );
          }
          this.loading = false;
          this.selectedItems = [];
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
