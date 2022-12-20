import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { BreadCrumbService } from '../../Services/client/bread-crumb.service';
import { MemberDto } from '../../dtos/Members/MemberDto.model';
import { AuthDataService } from '../../Services/http/auth-data.service';

declare var initLayout: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent
  implements OnInit, AfterViewInit, AfterContentInit
{
  public title: string | undefined;

  public member?: MemberDto;

  constructor(
    private breadCrumb: BreadCrumbService,
    private authData: AuthDataService
  ) {}

  public first = true;

  ngAfterContentInit() {}

  ngAfterViewInit(): void {
    initLayout();
  }

  ngOnInit(): void {
    this.breadCrumb.$pageTitle.subscribe((t) => {
      this.title = t;
    });
    this.authData.member().subscribe((res) => {
      if (res.success && res.data) {
        this.member = res.data;
      }
    });
  }
}
