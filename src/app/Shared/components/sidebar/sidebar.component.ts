import { MemberDto } from './../../dtos/Members/MemberDto.model';
import { Component, Input, OnInit } from '@angular/core';
import { AuthDataService } from '../../Services/http/auth-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input('member') member: MemberDto | undefined;
  constructor(private authData: AuthDataService) {}

  ngOnInit(): void {}
  public logout() {
    this.authData.logout();
  }
}
