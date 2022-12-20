import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadCrumbService {
  private pageTitleSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('TT Phật Quang | Đăng ký đại lễ');
  public $pageTitle: Observable<string> = this.pageTitleSubject
    .asObservable()
    .pipe(distinctUntilChanged());
  constructor() {}

  public setPageTitle(title: string) {
    if (this.pageTitleSubject) {
      this.pageTitleSubject.next(title);
    }
  }
}
