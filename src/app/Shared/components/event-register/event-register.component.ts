import { ReceiveCardStatus } from './../../dtos/Enums/ReceiveCardStatus.enum';
import { ReceiveClothStatus } from './../../dtos/Enums/ReceiveClothStatus.enum';
import { ClothingSize } from 'src/app/Shared/dtos/Enums/ClothingSize.enum';
import { StartAddressDto } from 'src/app/Shared/dtos/StartAddresses/StartAddressDto.model';
import { DepartmentService } from 'src/app/Shared/Services/http/Department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoveType } from './../../dtos/Enums/MoveType.enum';
import { EventRegistryDto } from 'src/app/Shared/dtos/EventRegistries/EventRegistryDto.model';
import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ContactStatusType } from '../../dtos/Enums/ContactStatusType.enum';
import { Gender } from '../../dtos/Enums/Gender.enum';
import { RegisterType } from '../../dtos/Enums/RegisterType.enum';
import { EventDto } from '../../dtos/EventDto.model';
import { EventRegistryService } from '../../Services/http/EventRegistry.service';
import { MessageService } from 'primeng/api';
import { DepartmentDto } from '../../dtos/Departments/DepartmentDto.model';
import { StartAddressesService } from '../../Services/http/StartAddresses.service';
import { PrintStatus } from '../../dtos/Enums/PrintStatus.enum';

@Component({
  selector: 'app-event-register',
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.css'],
})
export class EventRegisterComponent implements OnInit {
  @Input('event') selectedEvent!: EventDto;
  @Input('memberId') memberId: string | undefined;
  receiveCardStatuses: { value: number; label: string }[];
  clothingSizes: { value: number; label: string }[];
  receiveClothStatuses: { value: number; label: string }[];
  printStatuses: { value: number; label: string }[];
  @Input('register')
  public set register(value: EventRegistryDto | undefined) {
    this._register = value;
    if (value) {
      this.refreshStartAddress();
    }
    this.expsDepartments = this._register?.expDepartments ?? [];
  }
  private _register: EventRegistryDto | undefined;
  public get register(): EventRegistryDto | undefined {
    return this._register;
  }
  @Input('departments') departments: DepartmentDto[] = [];
  @Output('registerChange') registerChange =
    new EventEmitter<EventRegistryDto>();

  public expsDepartments: DepartmentDto[] = [];

  public Gender = Gender;
  public ContactStatusType = ContactStatusType;
  public RegisterType = RegisterType;
  public MoveType = MoveType;
  public ClothingSize = ClothingSize;
  public ReceiveClothStatus = ReceiveClothStatus;
  public ReceiveCardStatus = ReceiveCardStatus;
  public startAddresses: StartAddressDto[] = [];
  public selectedStartAdress: StartAddressDto | undefined;
  public contactTypes: {
    value: number;
    label: string;
  }[];
  public registerTypes: any[];
  public form: FormGroup;
  public moveTypes: any[];
  constructor(
    private eventRegistryService: EventRegistryService,
    private messageService: MessageService,
    private departmentService: DepartmentService,
    private startAddressesService: StartAddressesService,
    formBuilder: FormBuilder
  ) {
    this.moveTypes = MoveType.toList();
    this.contactTypes = ContactStatusType.getList();
    this.registerTypes = RegisterType.toList();
    this.receiveCardStatuses = ReceiveCardStatus.getList();
    this.clothingSizes = ClothingSize.getList();
    this.receiveClothStatuses = ReceiveClothStatus.getList();
    this.printStatuses = PrintStatus.getList();
    this.form = formBuilder.group({
      note: [''],
      companyNameEN: [''],
      startPlaneCode: [''],
      companyNameVIE: [''],
      returnPlaneCode: [''],
      otherStartAddress: [''],
      otherLeaveAddress: [''],
      eventRegistryPageId: [''],
      certificateRegistry: ['', [Validators.required]],
      moveType: ['', [Validators.required]],
      position: [''],
      leaderId: [''],
      startTimeId: [''],
      leaveTimeId: [''],
      registerRole: [''],
      clothingSize: [''],
      otherStartTime: [''],
      otherLeaveTime: [''],
      carBookingType: [''],
      wishDepartmentId: [''],
      receiveCardAddressId: [''],
      registerType: [''],
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadStartAddresses();
  }

  public selectedStartAddress: StartAddressDto | undefined;
  public selectedStartTimeId: number | undefined;
  public loadStartAddresses() {
    if (!this.startAddresses.length)
      this.startAddressesService.event(this.selectedEvent.id).subscribe({
        next: (res) => {
          this.startAddresses = res.data ?? [];
          this.refreshStartAddress();
        },
      });
  }

  public refreshStartAddress() {
    if (this.register?.startTime?.addressId) {
      this.selectedStartAddress = this.startAddresses.find(
        (a) => a.id == this.register?.startTime?.addressId
      );
      this.selectedStartTimeId = this.register.startTimeId;
    }
  }

  public loadDepartments() {
    if (!this.departments.length) {
      this.departmentService.getAll().subscribe({
        next: (res) => {
          if (res.data) {
            this.departments = res.data;
          }
        },
      });
    }
  }

  public searchLeader(e: any) {
    this.eventRegistryService
      .search({
        memberName: e.filter,
      })
      .subscribe({});
  }

  public save(...fields: string[]) {
    if (fields.length && this.register) {
      this.register.leaderId = this.register.leader?.id;
      if (fields.indexOf('startTimeId'))
        this.register.startTimeId = this.selectedStartTimeId;
      const payload: { [index: string]: any } = {};
      const register = this.register as any;
      fields.forEach((field) => {
        if (field) payload[field] = register[field];
      });
      this.eventRegistryService
        .patchUpdate([this.register.id], payload)
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.registerChange.emit(this.register);
              this.messageService.add({
                detail: 'Đã cập nhật thông tin đăng ký',
                severity: 'success',
              });
            }
          },
        });
    }
  }

  public updateExpDepts() {
    if (this.register) {
      this.register.expDepartmentIds = this.expsDepartments?.map((d) => d.id);
      this.save('expDepartmentIds');
    }
  }

  public registersLoading = true;
  public onLazyLoad(e: any) {}

  public initModel() {
    if (this.memberId) {
      this.eventRegistryService
        .create({
          eventId: this.selectedEvent.id,
          memberId: this.memberId,
          moveType: MoveType.Other,
          registerType: RegisterType.Single,
          expDepartmentIds: [],
        })
        .subscribe({
          next: (res) => {
            if (res.data?.member) {
              res.data.member = this.register?.member;
            }
            this.register = res.data;
            this.registerChange.emit(this.register);
          },
        });
    }
  }
}
