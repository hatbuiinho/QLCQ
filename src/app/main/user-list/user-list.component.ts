import { MemberService } from './../../Shared/Services/http/Member.service';
import { UserLookUpDto } from '../../Shared/dtos/Users/UserLookUpDto.model';
import { UsersService } from '../../Shared/Services/http/Users.service';
import { UserDto } from '../../Shared/dtos/Users/UserDto.model';
import { Component, HostListener, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Permissions } from '../../Shared/constants/permissions.const';
import { PhanLoaiThanhNien } from '../../Shared/dtos/Enums/PhanLoaiThanhNien.enum';
import { Gender } from '../../Shared/dtos/Enums/Gender.enum';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScrollerOptions } from 'primeng/scroller';
import { MemberLookUpDto } from 'src/app/Shared/dtos/Members/MemberLookUpDto.model';
import { MemberDto } from 'src/app/Shared/dtos/Members/MemberDto.model';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  @ViewChild(Table) table!: Table;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.tableOffsetTop = this.table.el.nativeElement.offsetTop;
  }

  public showEditDialog = true;

  public tableOffsetTop = 0;
  public loading = true;
  public users: UserDto[] = [];
  public totalRecords: number = 0;

  public selectedUsers: UserDto[] = [];

  public Permissions = Permissions;
  public PhanLoaiThanhNien = PhanLoaiThanhNien;
  public Gender = Gender;

  public btnItems: MenuItem[];

  public form: FormGroup;
  public scrollOptions: ScrollerOptions;
  constructor(
    private userService: UsersService,
    private memberService: MemberService
  ) {
    this.scrollOptions = {
      autoSize: true,
      lazy: true,
    };
    this.btnItems = [
      { label: 'Vô hiệu hóa', icon: 'fa-solid fa-user-lock' },
      { label: 'Mở khóa', icon: 'pi pi-unlock' },
    ];
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      active: new FormControl(true, [Validators.required]),
    });
  }

  public loadingMember: boolean = false;
  public members : MemberDto[] = [];
  public lazyMember(e: any) {
    console.log(e);
    const payload: MemberLookUpDto = {
      pageIndex: 1,
      pageSize: 20,
    };
    // this.memberService.search();
  }

  public refresh() {
    this.onLazyLoad(this.table.createLazyLoadMetadata());
  }

  public onLazyLoad(e: any) {
    const payload: UserLookUpDto = {
      pageSize: e.rows,
      pageIndex: e.first / e.rows + 1,
      includeMember: true,
      includeRoles: true,
    };
    const columns = e.multiSortMeta as { field: string; order: number }[];
    if (columns) {
      payload.sortBy = columns.map((c) => {
        return `${c.field} ${c.order === 1 ? 'asc' : 'desc'}`;
      });
    }
    this.loading = true;
    this.userService.search(payload).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.users = res.data?.items ?? [];
          this.totalRecords = res.data.totalRecords;
        }
      },
      error: () => {
        this.users = [];
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }
}
