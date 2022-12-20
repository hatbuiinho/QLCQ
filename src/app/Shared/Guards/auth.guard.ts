import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  NavigationEnd,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { Keys } from '../constants/keys.const';
import { ContantKeys } from '../Enums/symbol-keys';
import { AuthDataService } from '../Services/http/auth-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  count = 0;
  constructor(private authData: AuthDataService, private router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((e) => e as NavigationEnd)
      )
      .subscribe({
        next: (event) => {
          this.count++;
        },
      });
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const requiredPermissions = childRoute.data[Keys.ROUTE_REQUIRED];
    if (requiredPermissions) {
      return this.authData.hasPermission(requiredPermissions);
    }
    return true;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const routeRequired = route.data[ContantKeys.RouteRequired] as string[];

    if (this.authData.isLoggedIn()) {
      if (routeRequired) {
        return this.authData.hasPermission(routeRequired);
      }
      return true;
    } else {
      this.router.navigate(['auth', 'login']);
      return false;
    }
  }
}
