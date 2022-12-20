import { UpSertAddressDto } from './../../dtos/UpSertAddressDto.model';
import { CustomMessageServiceService } from 'src/app/Shared/Services/custom-message-service.service';
import { SkillForRegisterDto } from 'src/app/Shared/dtos/SkillForRegisters/SkillForRegisterDto.model';
import { DepartmentDto } from 'src/app/Shared/dtos/Departments/DepartmentDto.model';
import { UpSertMemberDto } from './../../dtos/Members/UpSertMemberDto.model';
import { RegisterType } from './../../dtos/Enums/RegisterType.enum';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { AddressDto } from '../../dtos/AddressDto.model';
import { ContactStatusType } from '../../dtos/Enums/ContactStatusType.enum';
import { Gender } from '../../dtos/Enums/Gender.enum';
import { EventDto } from '../../dtos/EventDto.model';
import { EventRegistryDto } from '../../dtos/EventRegistries/EventRegistryDto.model';
import { MemberDto } from '../../dtos/Members/MemberDto.model';
import { AddressService } from '../../Services/http/Address.service';
import { EventService } from '../../Services/http/Event.service';
import { EventRegistryService } from '../../Services/http/EventRegistry.service';
import { MemberService } from '../../Services/http/Member.service';
import { MessageService } from 'primeng/api';
import { BlobStorageService } from '../../Services/blob-storage.service';
import { FileStorageService } from '../../Services/file-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillForRegistersService } from '../../Services/http/SkillForRegisters.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent implements OnInit, OnDestroy {
  @Input('register') register: EventRegistryDto | undefined;
  @Output('registerChange') registerChange =
    new EventEmitter<EventRegistryDto>();
  @Input('skills') skills: SkillForRegisterDto[] = [];
  @Input('departments') departments: DepartmentDto[] = [];
  @Input('member')
  public set member(value: MemberDto | undefined) {
    if (value) {
      if (value.dateOfBirth) value.dateOfBirth = new Date(value.dateOfBirth);
      const member = value;
      if (member.permanentProvince) {
        this.provinces = [member.permanentProvince];
        member.permanentProvinceId = member.permanentProvince.id;
      }
      if (
        member.temporaryProvince &&
        this.provinces.findIndex((p) => p.id === member.temporaryProvince?.id)
      ) {
        this.provinces.push(member.temporaryProvince);
        member.temporaryProvinceId = member.temporaryProvince.id;
      }

      if (member.permanentDistrict) {
        this.districts = [member.permanentDistrict];
        member.permanentDistrictId = member.permanentDistrict.id;
      }

      if (member.permanentWard) {
        this.wards = [member.permanentWard];
        member.permanentWardId = member.permanentWard.id;
      }

      if (member.temporaryDistrict) {
        this.tempDistricts = [member.temporaryDistrict];
        member.temporaryDistrictId = member.temporaryDistrict.id;
      }
      if (member.temporaryWard) {
        this.tempWards = [member.temporaryWard];
        member.temporaryWardId = member.temporaryWard.id;
      }
      this.form.patchValue(value);
      this.addressForm.patchValue(value);
      this.skills = member.strongPoints;
      this.strongPoints = member.strongPoints?.map((s) => s.id) ?? [];
      this._member = member;
    } else {
      this.member = {} as any;
      this.form.reset();
      this.addressForm.reset();
    }
  }
  private _member: MemberDto | undefined;
  public get member(): MemberDto | undefined {
    return this._member;
  }

  @Input('events') events: EventDto[] = [];

  public _event: EventDto | undefined;

  @Input('event')
  public set selectedEvent(value: EventDto | undefined) {
    this._event = value;
    this.loadRegister();
  }

  public get selectedEvent(): EventDto | undefined {
    return this._event;
  }

  @Output('memberChange') memberChange = new EventEmitter<MemberDto>();

  @Input('readonly')
  public set readonly(value: boolean) {
    this._readonly = value;
    if (value) {
      this.form.disable();
      this.addressForm.disable();
    } else {
      this.form.enable();
      this.addressForm.enable();
    }
  }
  private _readonly: boolean = true;
  public get readonly(): boolean {
    return this._readonly;
  }

  provinces: AddressDto[] = [];
  public currentProvinceId: number | undefined;
  public currentTempProvinceId: number | undefined;

  districts: AddressDto[] = [];
  public currentDistrictId: number | undefined;

  wards: AddressDto[] = [];

  tempDistricts: AddressDto[] = [];
  public currentTempDistrictId: number | undefined;

  tempWards: AddressDto[] = [];

  public Gender = Gender;
  public ContactStatusType = ContactStatusType;
  public RegisterType = RegisterType;

  public form: FormGroup;
  public addressForm: FormGroup;
  constructor(
    private addressService: AddressService,
    private eventService: EventService,
    private eventRegistryService: EventRegistryService,
    private memberService: MemberService,
    private messageService: MessageService,
    private customMessageServiceService: CustomMessageServiceService,
    private blobService: BlobStorageService,
    private fileStorageSerivce: FileStorageService,
    private skillService: SkillForRegistersService,
    formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      work: [''],
      email: [
        '',
        [Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)],
      ],
      gender: [2, [Validators.required]],
      fullName: ['', [Validators.required]],
      avatarPath: [''],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[+]*[(]{0,1}[0-9]{0,4}[)]{0,1}([-\s\./0-9]{9})$/
          ),
        ],
      ],
      identityCard: ['', [Validators.required, Validators.minLength(9)]],
      religiousName: [''],
      facebookAddress: [''],
      exps: [''],
      ctnType: [''],
      dateOfBirth: [''],
      organizationStructureId: [''],
    });
    this.addressForm = formBuilder.group({
      permanentWardId: [''],
      permanentDistrictId: [''],
      permanentProvinceId: [''],
      permanentAddress: [''],
      temporaryWardId: [''],
      temporaryDistrictId: [''],
      temporaryProvinceId: [''],
      temporaryAddress: [''],
    });
  }
  public changed = false;
  public strongPoints: number[] = [];
  ngOnDestroy(): void {
    if (this.changed) {
      this.registerChange.emit(this.register);
    }
  }
  ngOnInit(): void {}

  public loadSkills(): void {
    this.skillService.getall().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.skills = res.data;
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

  public loadTempDistricts(provinceId: number | undefined): void {
    if (provinceId && provinceId != this.currentTempProvinceId) {
      this.currentTempProvinceId = provinceId;
      this.addressService.dsHuyen(provinceId).subscribe((res) => {
        if (res) {
          this.tempDistricts = res;
        }
      });
    } else if (!provinceId) {
      this.tempDistricts = [];
    }
  }

  public loadTempWards(districtId: number | undefined): void {
    if (districtId && this.currentTempDistrictId != districtId) {
      this.currentTempDistrictId = districtId;
      this.addressService.dsXa(districtId).subscribe((res) => {
        if (res) {
          this.tempWards = res;
        }
      });
    } else if (!districtId) {
      this.tempWards = [];
    }
  }

  public loadEvents() {
    if (!this.events?.length || this.events.length < 2)
      this.eventService.getAll().subscribe((res) => {
        if (res.success && res.data) {
          this.events = res.data;
        }
      });
  }

  public loadRegister() {
    if (this.member) {
      this.register = undefined;
      if (this.selectedEvent?.id && this.member.id) {
        this.eventRegistryService
          .member(this.selectedEvent.id, this.member.id)
          .subscribe({
            next: (res) => {
              if (res.success && res.data) {
                this.register = res.data;
                this.member = this.register.member;
                if (this.member) this.member.register = this.register;
              }
            },
            error: (err) => {
              if (err instanceof HttpErrorResponse) {
                console.log(err.message);
              }
            },
          });
      }
    }
  }

  public fieldChanges: string[] = [];

  public fieldChange(...fields: string[]) {
    if (fields.length) {
      const member = this.member as any;
      fields.forEach((field) => {
        if (
          (!this.fieldChanges.includes(field) &&
            this.form.value[field] != member[field] &&
            this.addressForm.value[field] != member[field] &&
            this.readonly == false) ||
          field === 'strongPointIds'
        ) {
          this.fieldChanges.push(field);
        }
      });
    }
  }

  public cancelEdit() {
    if (this.member) {
      this.form.patchValue(this.member);
      this.addressForm.patchValue(this.member);
    } else {
      this.form.reset();
      this.addressForm.reset();
    }
    this.fieldChanges = [];
    this.readonly = true;
  }

  public update(fieldChanges: string[]) {
    if (this.form.valid && this.member) {
      console.log(fieldChanges);
      if (this.fieldChanges.length == 0) {
        this.messageService.add({
          detail: 'Không có gì thay đổi',
          severity: 'success',
        });
        this.readonly = true;
        return;
      }
      const payload: {
        [index: string]: any;
      } = {};
      const member = {
        ...this.form.value,
        ...this.addressForm,
        strongPointIds: this.strongPoints,
      };
      fieldChanges.forEach((field) => {
        if (field) payload[field] = member[field];
      });

      this.memberService.patchUpdate(this.member.id, payload).subscribe({
        next: (res) => {
          if (res.success) {
            this.readonly = true;
            this.messageService.add({
              detail: 'Đã cập nhật thông tin thành viên',
              severity: 'success',
            });
            if (this.member) {
              const m = this.member as any;
              fieldChanges.forEach((field) => {
                if (field) m[field] = member[field];
              });
            }
            fieldChanges.splice(0);
            this.fieldChanges = [];
            this.changed = true;
          }
        },
      });
    } else {
      for (const key in this.form.controls) {
        this.form.controls[key].markAsDirty();
      }
    }
  }

  public add() {
    if (this.form.valid) {
      const payload: UpSertMemberDto = {
        ...this.form.value,
        permanentAddress: {
          provinceId: this.addressForm.value.permanentProvinceId,
          wardId: this.addressForm.value.permanentWardId,
          districtId: this.addressForm.value.permanentDistrictId,
          address: this.addressForm.value.permanentAddress,
        },
        temporaryAddress: {
          provinceId: this.addressForm.value.temporaryProvinceId,
          wardId: this.addressForm.value.temporaryWardId,
          districtId: this.addressForm.value.temporaryDistrictId,
          address: this.addressForm.value.temporaryAddress,
        },
      };
      this.memberService.add(payload).subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.member = res.data;
            this.messageService.add({
              detail: `Lưu thông tin thành viên thành công`,
              severity: 'success',
            });
            this.readonly = true;
            this.changed = true;
          } else {
            this.messageService.add({
              detail: `Lưu thông tin thành viên thất bại`,
              severity: 'error',
            });
          }
        },
      });
    } else {
      for (const key in this.form.controls) {
        this.form.controls[key].markAsDirty();
      }
    }
  }

  public registerUpdated(register: EventRegistryDto) {
    this.changed = true;
    this.register = register;
  }

  public upload(file: File | Blob) {
    this.fileStorageSerivce
      .upload(
        [file],
        `avatar_${this.member?.identityCard}.${file.type.slice(
          file.type.indexOf('/') + 1
        )}`,
        {
          folder: 'dkdl_avatar',
        }
      )
      .subscribe({
        next: (res) => {
          if (res.code == 1 && res.data.length) {
            if (this.member) {
              this.member.avatarPath = res.data[0].fileUrl;
              this.memberService
                .patchUpdate(this.member.id, {
                  avatarPath: this.member.avatarPath,
                })
                .subscribe({
                  error: (e) => {
                    this.fileStorageSerivce.remove(res.data[0].storedFileName);
                  },
                });
            }
          }
        },
      });
  }
  onCopySuccess() {
    this.customMessageServiceService.success('Đã copy');
  }

  public uploadIdentities(e: any) {
    this.fileStorageSerivce
      .upload(e.files, `CCCD_${this.member?.identityCard}.jpg`, {
        folder: 'dkdl_avatar',
      })
      .subscribe({
        next: (res) => {
          if (res.data.length) {
            if (this.member) {
              this.memberService
                .patchUpdate(this.member.id, {
                  identityCardImagePaths: res.data.map((x) => x.fileUrl),
                })
                .subscribe({
                  next: (r) => {
                    if (r.success && this.member) {
                      this.member.identityCardImagePaths = res.data.map(
                        (x) => x.fileUrl
                      );
                      this.messageService.add({
                        detail: 'Cập nhật ảnh CCCD thành công',
                        severity: 'success',
                      });
                    }
                  },
                });
            }
          }
        },
      });
  }

  showingUpload(e: Event) {
    if (!this.member?.id) {
      e.preventDefault();
      this.messageService.add({
        detail:
          'Huynh đệ vui lòng tạo thông tin thành viên trước khi tải ảnh lên ạ!',
        severity: 'warn',
      });
    }
  }
}
