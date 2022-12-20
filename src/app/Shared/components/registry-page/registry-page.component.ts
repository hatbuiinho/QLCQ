import { ReceiveCardAddressesService } from './../../Services/http/ReceiveCardAddresses.service';
import { ReceiveCardAddressDto } from 'src/app/Shared/dtos/ReceiveCardLocations/ReceiveCardAddressDto.model';
import { DepartmentDetailsService } from 'src/app/Shared/Services/http/DepartmentDetails.service';
import { DepartmentDto } from 'src/app/Shared/dtos/Departments/DepartmentDto.model';
import { StartAddressDto } from 'src/app/Shared/dtos/StartAddresses/StartAddressDto.model';
import { EventRegistryPagesService } from 'src/app/Shared/Services/http/EventRegistryPages.service';
import { StartAddressesService } from './../../Services/http/StartAddresses.service';
import { StartTimeDto } from './../../dtos/StartTimes/StartTimeDto.model';
import { UpSertEventRegistryPageDto } from './../../dtos/EventRegistryPages/UpSertEventRegistryPageDto.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ScopeType } from 'src/app/Shared/dtos/Enums/ScopeType.enum';
import { CtnpqService } from './../../Services/ctnpq.service';
import { ChungThanhNienDto } from './../../dtos/BRM/ChungThanhNienDto.model';
import { EventRegistryPageDto } from 'src/app/Shared/dtos/EventRegistryPages/EventRegistryPageDto.model';
import { EventDto } from 'src/app/Shared/dtos/EventDto.model';
import { Component, Input, OnInit } from '@angular/core';
import { DepartmentDetailDto } from '../../dtos/DepartmentDetails/DepartmentDetailDto.model';
import { StatusType } from '../../dtos/Enums/StatusType.enum';
import { MessageService } from 'primeng/api';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-registry-page',
  templateUrl: './registry-page.component.html',
  styleUrls: ['./registry-page.component.css'],
})
export class RegistryPageComponent implements OnInit {
  // Component input variables
  @Input('departments') departments: DepartmentDetailDto[] = [];
  @Input('data') public set data(value: EventRegistryPageDto | undefined) {
    if (value) {
      this._data = undefined;
      this.registryPageService.getbyid(value.id).subscribe({
        next: (res) => {
          if (res.success && res.data) {
            res.data.start = new Date(res.data.start);
            res.data.end = new Date(res.data.end);
            this._data = res.data;
            this.selectedDepartments = this.departments.filter(
              (d) =>
                d.departmentId &&
                this.data?.departmentIds.includes(d.departmentId)
            );
            this.selectedStartAddresses = this.data?.startAddresses ?? [];
            this.selectedReceiveCardAddresses =
              this.data?.receiveCardAddresses ?? [];
            this.form.patchValue(res.data);
          }
        },
      });
    } else {
      this.resetForm();
    }
  }
  private _data!: EventRegistryPageDto | undefined;
  public get data(): EventRegistryPageDto | undefined {
    return this._data;
  }
  @Input('events') events: EventDto[] = [];
  @Input('selectedEvent')
  public set selectedEvent(value: EventDto | undefined) {
    if (value != this._selectedEvent) {
      this._selectedEvent = value;
      this.loadStartAddresses();
      this.loadDepartmentDetails();
      this.loadrRceiveCardAddresses();
    }
  }
  private _selectedEvent: EventDto | undefined;
  public get selectedEvent(): EventDto | undefined {
    return this._selectedEvent;
  }

  public receiveCardAddresses: ReceiveCardAddressDto[] = [];
  public selectedDepartments: DepartmentDetailDto[] = [];

  // Component output variables

  // Component data variables
  public ctns: ChungThanhNienDto[] = [];
  public scopeTypes: any[];
  public startTimes: StartTimeDto[] = [];

  public form: FormGroup;

  public StatusType = StatusType;
  public ScopeType = ScopeType;

  constructor(
    private ctnService: CtnpqService,
    private startAddressService: StartAddressesService,
    private registryPageService: EventRegistryPagesService,
    private departmentDetailService: DepartmentDetailsService,
    private messageService: MessageService,
    private receiveCardAddressesService: ReceiveCardAddressesService
  ) {
    this.scopeTypes = ScopeType.toList();
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.maxLength(200),
        Validators.required,
      ]),
      end: new FormControl('', Validators.required),
      start: new FormControl('', Validators.required),
      type: new FormControl(0, Validators.required),
      ctnId: new FormControl(),
    });
  }

  ngOnInit(): void {
    if (!this.ctns.length) {
      this.loadCTN();
    }
  }

  public loadCTN() {
    this.ctnService.searchCTN().subscribe((res) => {
      if (res.data) {
        this.ctns = res.data;
      }
    });
  }

  public startAddresses: StartAddressDto[] = [];
  public selectedAddress: StartAddressDto | undefined;
  public selectedTime: StartTimeDto | undefined;
  public loadStartAddresses() {
    if (this.selectedEvent) {
      this.startAddressService.event(this.selectedEvent.id).subscribe({
        next: (res) => {
          if (res.success) {
            this.startAddresses = res.data ?? [];
          }
        },
      });
    }
  }

  public selectedStartAddresses: StartAddressDto[] = [];
  public addTime() {
    if (this.selectedAddress && this.selectedTime) {
      let address = this.selectedStartAddresses.find(
        (a) => a.id == this.selectedTime?.addressId
      );
      if (address) {
      } else {
        address = { ...this.selectedAddress, times: [] };
        this.selectedStartAddresses.push(address);
      }
      if (
        address.times.findIndex((t) => t.id == this.selectedTime?.id) === -1
      ) {
        address.times.push(this.selectedTime);
      } else {
        this.messageService.add({
          detail: 'Điểm xuất phát này đã được thêm vào trang trước đó.',
          severity: 'warn',
          summary: 'Thông báo',
        });
      }
    }
  }

  public removeTime(address: StartAddressDto, id: number) {
    if (this.data) {
      const index = address.times.findIndex((t) => t.id === id);
      if (index >= 0) {
        address.times.splice(index, 1);
        if (address.times.length === 0) {
          this.selectedStartAddresses.splice(
            this.selectedStartAddresses.findIndex((a) => a.id === address.id),
            1
          );
        }
      }
    }
  }

  public getUpSertDto(): UpSertEventRegistryPageDto | undefined {
    if (this.form.valid) {
      const payload: UpSertEventRegistryPageDto = {
        ...this.form.value,
        eventId: this.selectedEvent?.id,
        startTimeIds: this.selectedStartAddresses.reduce(
          (pre: number[], value) => {
            pre = pre.concat(value.times.map((t) => t.id));
            return pre;
          },
          []
        ),
        departmentIds: this.selectedDepartments.map((d) => d.departmentId),
        exactReceiveCardAddressIds: this.selectedReceiveCardAddresses.map(
          (a) => a.id
        ),
      };
      return payload;
    }
    return undefined;
  }

  public resetForm() {
    this.form.reset();
    this.form.controls['type'].setValue(0);
    this.selectedStartAddresses = [];
    this.departmentIds = [];
  }

  public departmentIds: number[] = [];
  public loadDepartmentDetails() {
    this.departmentDetailService
      .search({
        pageIndex: 1,
        pageSize: 1000,
        eventId: this.selectedEvent?.id,
      })
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.departments =
              res.data?.items?.filter(
                (d) => d.department?.name?.toLowerCase() !== 'không chọn'
              ) ?? [];
            if (this.data) {
              this.selectedDepartments = this.departments.filter(
                (d) =>
                  d.departmentId && this.departmentIds.includes(d.departmentId)
              );
            }
          }
        },
      });
  }

  public selectedReceiveCardAddresses: ReceiveCardAddressDto[] = [];
  public selectedReceiveCardAddressIds: number[] = [];
  public loadrRceiveCardAddresses() {
    if (this.selectedEvent) {
      this.receiveCardAddressesService.event(this.selectedEvent.id).subscribe({
        next: (res) => {
          if (res.success) {
            this.receiveCardAddresses = res.data ?? [];
            if (this.data) {
              this.selectedReceiveCardAddresses =
                this.receiveCardAddresses.filter(
                  (d) =>
                    d.id && this.selectedReceiveCardAddressIds.includes(d.id)
                );
            }
          }
        },
      });
    }
  }
}
