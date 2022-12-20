import { UpSertStartAddressDto } from './../../dtos/StartAddresses/UpSertStartAddressDto.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StartAddressDto } from './../../dtos/StartAddresses/StartAddressDto.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddressDto } from '../../dtos/AddressDto.model';
import { ContactStatusType } from '../../dtos/Enums/ContactStatusType.enum';
import { AddressService } from '../../Services/http/Address.service';
import { EventService } from '../../Services/http/Event.service';
import { EventRegistryService } from '../../Services/http/EventRegistry.service';
import { UpSertStartTimeDto } from '../../dtos/StartTimes/UpSertStartTimeDto.model';
import { UpSertAddressDto } from '../../dtos/UpSertAddressDto.model';
import { EventDto } from '../../dtos/EventDto.model';

@Component({
  selector: 'app-start-address',
  templateUrl: './start-address.component.html',
  styleUrls: ['./start-address.component.css'],
})
export class StartAddressComponent implements OnInit {
  @Input('value')
  public set startAddress(value: StartAddressDto | undefined) {
    if (value) {
      this.form.patchValue(value);
      if (value.province) this.provinces = [value.province];
      if (value.district) this.districts = [value.district];
      if (value.ward) this.wards = [value.ward];
    } else {
      value = {
        id: 0,
        wardId: 0,
        provinceId: 0,
        districtId: 0,
        address: '',
        times: [],
      };
      this.form.reset();
    }
    this._startAddress = value;
  }
  private _startAddress: StartAddressDto | undefined;
  public get startAddress(): StartAddressDto | undefined {
    return this._startAddress;
  }

  @Input('event') selectedEvent: EventDto | undefined;

  @Output('validSubmit') onSubmit = new EventEmitter<UpSertStartAddressDto>();

  provinces: AddressDto[] = [];
  public currentProvinceId: number | undefined;
  public currentTempProvinceId: number | undefined;

  districts: AddressDto[] = [];
  public currentDistrictId: number | undefined;

  wards: AddressDto[] = [];

  form: FormGroup;

  constructor(
    private addressService: AddressService,
    private eventService: EventService,
    private eventRegistryService: EventRegistryService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      provinceId: new FormControl('', [Validators.required, Validators.min(0)]),
      districtId: new FormControl('', [Validators.required, Validators.min(0)]),
      wardId: new FormControl('', [Validators.required, Validators.min(0)]),
      address: new FormControl(''),
    });
  }

  ngOnInit(): void {}

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
    if (this.form.valid) {
      const upsert: UpSertStartAddressDto = {
        name: this.form.value.name,
        description: this.form.value.description,
        address: {
          provinceId: this.form.value.provinceId,
          districtId: this.form.value.districtId,
          wardId: this.form.value.wardId,
          address: this.form.value.address,
        },
      };
      if (!this.startAddress?.id && this.startAddress?.times) {
        upsert.times = this.startAddress.times.map((s) => {
          const upsert: UpSertStartTimeDto = {
            time: s.time,
            eventId: s.event?.id ?? s.eventId,
            note: s.note,
            name: s.name ?? '',
            addressId: 0,
          };
          return upsert;
        });
      }
      this.onSubmit.emit(upsert);
    }
  }
}
