import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AddressDto } from '../../dtos/AddressDto.model';
import { EventDto } from '../../dtos/EventDto.model';
import { UpSertReceiveCardAddressDto } from '../../dtos/ReceiveCardLocations/UpSertReceiveCardAddressDto.model';
import { AddressService } from '../../Services/http/Address.service';
import { EventService } from '../../Services/http/Event.service';
import { EventRegistryService } from '../../Services/http/EventRegistry.service';
import { ReceiveCardAddressDto } from './../../dtos/ReceiveCardLocations/ReceiveCardAddressDto.model';

@Component({
  selector: 'app-receive-card-address',
  templateUrl: './receive-card-address.component.html',
  styleUrls: ['./receive-card-address.component.css'],
})
export class ReceiveCardAddressComponent {
  @Input('value')
  public set startAddress(value: ReceiveCardAddressDto | undefined) {
    if (value) {
      this.form.patchValue(value);
      this.form.patchValue({
        provinceId: value.province?.id,
        districtId: value.district?.id,
        wardId: value.ward?.id,
      });
      if (value.province) this.provinces = [value.province];
      if (value.district) this.districts = [value.district];
      if (value.ward) this.wards = [value.ward];
    } else {
      value = {} as any;
      this.form.reset();
    }
    this._startAddress = value;
  }
  private _startAddress: ReceiveCardAddressDto | undefined;
  public get startAddress(): ReceiveCardAddressDto | undefined {
    return this._startAddress;
  }

  @Input('eventId') selectedEvent: number | undefined;

  @Output('validSubmit') onSubmit =
    new EventEmitter<UpSertReceiveCardAddressDto>();

  provinces: AddressDto[] = [];
  public currentProvinceId: number | undefined;
  public currentTempProvinceId: number | undefined;

  districts: AddressDto[] = [];
  public currentDistrictId: number | undefined;

  wards: AddressDto[] = [];

  public events: EventDto[] = [];

  form: FormGroup;

  constructor(
    private addressService: AddressService,
    private eventService: EventService,
    private eventRegistryService: EventRegistryService,
    private messageService: MessageService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      provinceId: new FormControl('', [Validators.required, Validators.min(1)]),
      districtId: new FormControl('', [Validators.required, Validators.min(1)]),
      wardId: new FormControl('', [Validators.required, Validators.min(1)]),
      address: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  public loadEvents() {
    this.eventService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          this.events = res.data ?? [];
        }
      },
    });
  }

  public loadProvinces(): void {
    if (!this.provinces || this.provinces.length < 5) {
      this.addressService.dsTinh().subscribe((res) => {
        if (res) {
          this.provinces = this.provinces.concat(res);
        }
      });
    }
  }

  public loadDistricts(provinceId: number | undefined): void {
    if (provinceId && provinceId != this.currentProvinceId) {
      this.currentProvinceId = provinceId;
      this.addressService.dsHuyen(provinceId).subscribe((res) => {
        if (res) {
          this.districts = res;
        }
      });
    } else if (!provinceId) {
      this.districts = [];
    }
  }

  public loadWards(districtId: number | undefined): void {
    if (districtId && this.currentDistrictId != districtId) {
      this.currentDistrictId = districtId;
      this.addressService.dsXa(districtId).subscribe((res) => {
        if (res) {
          this.wards = res;
        }
      });
    } else if (!districtId) {
      this.wards = [];
    }
  }

  public submit() {
    if (this.form.valid && this.selectedEvent) {
      const upsert: UpSertReceiveCardAddressDto = {
        name: this.form.value.name,
        description: this.form.value.description,
        address: {
          provinceId: this.form.value.provinceId,
          districtId: this.form.value.districtId,
          wardId: this.form.value.wardId,
          address: this.form.value.address,
        },
        eventId: this.selectedEvent,
      };
      this.onSubmit.emit(upsert);
    } else {
      for (const control in this.form.controls) {
        this.form.controls[control].markAsDirty();
      }
      this.messageService.add({
        detail: 'Thông tin không hợp lệ',
        severity: 'error',
      });
    }
  }
}
