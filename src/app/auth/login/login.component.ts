import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginDto } from 'src/app/Shared/dtos/Users/UserLoginDto.model';
import { AuthDataService } from 'src/app/Shared/Services/http/auth-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public userLogin: UserLoginDto;
  public time: Date = new Date();
  public timer: any;
  constructor(private router: Router, private authData: AuthDataService) {
    this.userLogin = {
      username: '',
      password: 'AdminTest@123',
      remember: true,
    };
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  ngOnInit(): void {}

  public login() {
    if (this.userLogin.username && this.userLogin.password) {
      this.authData.login(this.userLogin).subscribe((res) => {
        if (res) {
          this.router.navigateByUrl('/');
        }
      });
    }
  }
}
