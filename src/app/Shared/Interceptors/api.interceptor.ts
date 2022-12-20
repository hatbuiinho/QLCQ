import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Keys } from '../constants/constants.module';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private dateRegex =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})[.]\d+(([+|-]\d{2}:\d{2})|Z)$/;

  constructor(messageService: MessageService, router: Router) {
    ApiInterceptor.messageService = messageService;
    ApiInterceptor.router = router;
  }

  static messageService: MessageService;
  static nextMessageAt: Date = new Date();
  static processingUnauthorized: boolean = false;
  static router: Router;
  handleError(error: HttpErrorResponse) {
    console.log('this', this);
    console.log('error', error);
    if (!environment.production)
      switch (error.status) {
        case 500:
          if (new Date() >= ApiInterceptor.nextMessageAt) {
            ApiInterceptor.nextMessageAt = new Date(Date.now() + 2000);
            ApiInterceptor.messageService.add({
              severity: 'error',
              summary: 'Thông báo',
              detail: error.error.message,
            });
          }
          break;
        case 401:
          ApiInterceptor.router.navigate(['auth', 'login']);
          break;
        case 403:
          console;
          alert('Bạn không có quyền truy cập chức năng này');
          ApiInterceptor.router.navigate(['auth', 'login']);
          break;
        case 400: {
          ApiInterceptor.messageService.add({
            severity: 'error',
            summary: 'Thông báo',
            detail: error.error.message,
          });
          break;
        }
        default:
          break;
      }
    return throwError(() => error);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(this.handleError),
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.convertDates(event.body);
        }
      })
    );
  }

  private convertDates(object: any) {
    if (!object || !(object instanceof Object)) {
      return;
    }

    if (object instanceof Array) {
      for (const item of object) {
        this.convertDates(item);
      }
    }

    for (const key of Object.keys(object)) {
      const value = object[key];

      if (value instanceof Array) {
        for (const item of value) {
          this.convertDates(item);
        }
      }

      if (value instanceof Object) {
        this.convertDates(value);
      }

      if (typeof value === 'string' && this.dateRegex.test(value)) {
        object[key] = new Date(value);
      }
    }
  }
}
