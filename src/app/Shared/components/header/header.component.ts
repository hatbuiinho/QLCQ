import { Component, OnInit, Input } from '@angular/core';
import { MemberDto } from '../../dtos/Members/MemberDto.model';
import { AuthDataService } from '../../Services/http/auth-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input('member') member?: MemberDto;

  constructor(private authData: AuthDataService) {}

  ngOnInit(): void {}

  public logout() {
    this.authData.logout();
  }
}
