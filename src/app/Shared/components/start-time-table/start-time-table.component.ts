import { StartAddressDto } from './../../dtos/StartAddresses/StartAddressDto.model';
import { EventDto } from 'src/app/Shared/dtos/EventDto.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UpSertStartTimeDto } from './../../dtos/StartTimes/UpSertStartTimeDto.model';
import { StartTimesService } from './../../Services/http/StartTimes.service';
import { StartTimeDto } from './../../dtos/StartTimes/StartTimeDto.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-start-time-table',
  templateUrl: './start-time-table.component.html',
  styleUrls: ['./start-time-table.component.css'],
})
export class StartTimeTableComponent implements OnInit {
  @Input('value')
  public set startTimes(value: StartTimeDto[] | undefined) {
    if (!value) value = [];
    value.forEach((t) => {
      t.time = new Date(t.time);
    });
    this._startTimes = value;
  }
  public get startTimes(): StartTimeDto[] {
    return this._startTimes;
  }
  private _startTimes: StartTimeDto[] = [];
  @Output('valueChange') valueChange = new EventEmitter<StartTimeDto[]>();

  @Input('showAddress') showAddress: boolean = true;
  @Input('showEvent') showEvent: boolean = true;
  @Input('event') public selectedEvent: EventDto | undefined;
  @Input('address') startAddress: StartAddressDto | undefined;
  @Input('overrideDelete') overrideDelete: boolean = false;
  @Output('onDelete') onDelete = new EventEmitter<number>();
  clonedTimes: { [s: string]: StartTimeDto } = {};

  public newStartTime: any = {};
  public loading: boolean = false;

  constructor(
    private StartTimesService: StartTimesService,
    private messageService: MessageService,
    private confirmService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  onRowEditInit(item: StartTimeDto) {
    this.clonedTimes[item.id] = { ...item };
  }

  add() {
    if (
      this.newStartTime?.name &&
      this.newStartTime.time &&
      this.selectedEvent &&
      this.startAddress
    ) {
      this.loading = true;
      const payload: UpSertStartTimeDto = {
        ...this.newStartTime,
        eventId: this.selectedEvent?.id,
        addressId: this.startAddress?.id,
      };
      if (this.startAddress.id) {
        this.StartTimesService.create(payload).subscribe({
          next: (res) => {
            if (res.success && res.data) {
              this.startTimes = [...this.startTimes, res.data];
              this.messageService.add({
                severity: 'success',
                detail: 'Đã thêm thời gian khởi hành',
                summary: 'Thông báo',
              });
            }
            this.loading = false;
          },
        });
      } else {
        const newStartTime: StartTimeDto = {
          id: this.tempId++,
          event: this.selectedEvent,
          address: this.startAddress,
          ...payload,
        };
        this.startTimes = [...this.startTimes, newStartTime];
        this.loading = false;
        this.valueChange.emit(this.startTimes);
      }
    }
  }

  private tempId: number = 1;

  onRowEditSave(item: StartTimeDto) {
    if (item.name && item.time) {
      const payload: UpSertStartTimeDto = {
        ...item,
        name: item.name,
      };
      if (!item.addressId) {
        const index = this.startTimes.findIndex((t) => t.id === item.id);
        this.startTimes[index] = this.clonedTimes[item.id];
        delete this.clonedTimes[item.id];
      } else {
        this.StartTimesService.update(item.id, payload).subscribe({
          next: (res) => {
            if (!res.success) {
              const index = this.startTimes.findIndex((t) => t.id === item.id);
              this.startTimes[index] = this.clonedTimes[item.id];
              this.messageService.add({
                severity: 'error',
                detail: 'Chỉnh sửa thời gian khởi hành thất bại',
                summary: 'Thông báo',
              });
            } else {
              this.valueChange.emit(this.startTimes);
            }
            delete this.clonedTimes[item.id];
          },
        });
      }
    }
  }

  onRowEditCancel(item: StartTimeDto, index: number) {
    this.startTimes[index] = this.clonedTimes[item.id];
    delete this.clonedTimes[item.id];
  }

  public delete(id: number) {
    if (id && this.startAddress?.id) {
      if (this.overrideDelete) {
        this.onDelete.emit(id);
        if (this.startTimes.length) this.startTimes = [...this.startTimes];
        else this.startTimes = [];
      } else {
        this.confirmService.confirm({
          message: 'Bạn có chắc chắn muốn xóa gian gian khởi hành này?',
          acceptLabel: 'Có',
          rejectLabel: 'Không',
          accept: () => {
            this.loading = true;
            this.StartTimesService.delete(id).subscribe({
              next: (res) => {
                if (res.success) {
                  this.startTimes.splice(
                    this.startTimes.findIndex((i) => i.id === id),
                    1
                  );
                  this.valueChange.emit(this.startTimes);
                  this.startTimes = [...this.startTimes];
                  this.loading = false;
                  this.messageService.add({
                    severity: 'success',
                    detail: 'Đã xóa thời gian khởi hành',
                    summary: 'Thông báo',
                  });
                } else {
                  this.messageService.add({
                    severity: 'error',
                    detail: 'Xóa thời gian khởi hành thất bại',
                    summary: 'Thông báo',
                  });
                }
              },
            });
          },
        });
      }
    } else {
      this.startTimes.splice(
        this.startTimes.findIndex((i) => i.id === id),
        1
      );
      this.valueChange.emit(this.startTimes);
      this.loading = false;
    }
  }
}
