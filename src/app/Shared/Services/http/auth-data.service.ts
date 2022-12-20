import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  firstValueFrom,
  map,
  Observable,
  Subscriber,
  timer,
} from 'rxjs';
import { UserLoginDto } from 'src/app/Shared/dtos/Users/UserLoginDto.model';
import { Keys } from '../../constants/constants.module';
import { LoginResponse } from '../../dtos/LoginResponse.model';
import { AuthService } from './Auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  tokenKey = Keys.TOKEN_KEY;
  tokenExpireKey = Keys.EXPIRES_KEY;
  private _permissions: string[] | null = null;
  public get permissions(): string[] | null {
    return this._permissions;
  }
  public set permissions(value: string[] | null) {
    this._permissions = value;
    this.permissionSub.next(value);
  }

  private permissionSub: BehaviorSubject<string[] | null> = new BehaviorSubject<
    string[] | null
  >(null);
  public $permissions = this.permissionSub
    .asObservable()
    .pipe(distinctUntilChanged());
  public remember: boolean = true;

  constructor(private authService: AuthService) {}

  public login(request: UserLoginDto) {
    return this.authService.login(request).pipe(
      map((res) => {
        if (res.success && res.data) {
          this.setToken(res.data, request.remember);
          return true;
        }
        return false;
      })
    );
  }

  logout() {
    this.setToken(null);
  }

  public user() {
    return this.authService.user();
  }

  public member() {
    return this.authService.member();
  }

  public getToken(): string | null {
    const storage = this.remember ? localStorage : sessionStorage;
    var strExpires = storage.getItem(this.tokenExpireKey);
    if (strExpires) {
      var expires = JSON.parse(strExpires) as number;
      if (expires > new Date().getTime()) {
        return storage.getItem(this.tokenKey);
      }
    }
    return null;
  }

  public setToken(data: LoginResponse | null, remember?: boolean) {
    if (remember !== undefined) {
      this.remember = remember;
    }
    const storage = this.remember ? localStorage : sessionStorage;
    if (data) {
      if (data.token) {
        storage.setItem(
          this.tokenExpireKey,
          JSON.stringify(data.expires.getTime())
        );
        storage.setItem(this.tokenKey, data.token);
        this.permissions = data.permissions ?? [];
      }
    } else {
      storage.removeItem(this.tokenExpireKey);
      storage.removeItem(this.tokenKey);
    }
  }

  public async loadPermission() {
    await firstValueFrom(this.authService.permission()).then((response) => {
      if (response.success && response.data) {
        this.permissions = response.data;
      } else {
        this.permissions = [];
      }
    });
  }

  public async hasPermission(keys: string[]): Promise<boolean> {
    if (this.permissions === null) {
      await this.loadPermission();
    }
    if (this.permissions?.length) {
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if (this.permissions.findIndex((u) => u == key) === -1) return false;
      }
      return true;
    }
    return false;
  }

  public isLoggedIn(): boolean {
    return this.getToken() != null;
  }
}
