import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadCrumbService } from 'src/app/Shared/Services/client/bread-crumb.service';
import { Gender } from 'src/app/Shared/dtos/Enums/Gender.enum';
import { PhanLoaiThanhNien } from 'src/app/Shared/dtos/Enums/PhanLoaiThanhNien.enum';
import { MemberDto } from 'src/app/Shared/dtos/Members/MemberDto.model';
import { DepartmentService } from 'src/app/Shared/Services/http/Department.service';
import { DepartmentDetailsService } from 'src/app/Shared/Services/http/DepartmentDetails.service';
import { EventService } from 'src/app/Shared/Services/http/Event.service';
import { MemberService } from 'src/app/Shared/Services/http/Member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit, AfterViewInit {
  @ViewChild(Table) table!: Table;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.tableOffsetTop = this.table.el.nativeElement.offsetTop;
  }

  public members: MemberDto[] = [];
  public selectedMembers: MemberDto[] = [];
  public selectedMember?: MemberDto;

  public btnItems: MenuItem[];
  public loading: boolean = false;
  public tableOffsetTop: number = 0;

  public form: FormGroup;
  public formVisible: boolean = false;
  public Gender = Gender;
  public PhanLoaiThanhNien = PhanLoaiThanhNien;

  constructor(
    private breadCrumb: BreadCrumbService,
    private eventService: EventService,
    private departmentService: DepartmentService,
    private departmentDetailService: DepartmentDetailsService,
    private memberService: MemberService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.breadCrumb.setPageTitle('Danh sách phật tử');
    this.btnItems = [{ label: 'Xóa đã chọn', icon: 'fa-regular fa-trash-can' }];
    this.form = new FormGroup({});
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tableOffsetTop = this.table.el.nativeElement.offsetTop;
    }, 300);
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  public loadMembers(): void {
    this.loading = true;

    this.memberService.getAll().subscribe((res) => {
      if (res.success && res.data) {
        this.members = res.data;
      }
      this.loading = false;
    });
  }

  public showDetail(member: MemberDto): void {}

  public add() {}

  public edit(member: MemberDto) {
    this.selectedMember = member;
    this.formVisible = true;
  }
}
