import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  public statusSubject: BehaviorSubject<boolean>;
  public $status: Observable<boolean>;

  constructor() {
    this.statusSubject = new BehaviorSubject(false);
    this.$status = this.statusSubject
      .asObservable()
      .pipe(distinctUntilChanged());
  }
}
