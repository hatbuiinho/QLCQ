import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Keys } from '../../constants/constants.module';
import { BrmDaiLeResponse } from '../../dtos/BRM/BrmDaiLeResponse.model';
import { EventDto } from '../../dtos/EventDto.model';
import { ServiceResponse } from '../../dtos/ServiceResponse.model';
import { HttpServerService } from './http-service.service';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private httpService: HttpServerService) {}
  public getDefault(events: EventDto[]): EventDto {
    const savedId = localStorage.getItem(Keys.EVENT_KEY);
    if (savedId) {
      const id = Number(savedId);
      if (!isNaN(id)) {
        const event = events.find((e) => e.id === id);
        if (event) {
          return event;
        }
      }
    }
    return events.reduce((pre, item) => {
      if (pre.id > item.id) {
        return pre;
      } else {
        return item;
      }
    });
  }
  public setDefault(event: EventDto | number) {
    if (event instanceof Object) {
      event = event.id;
    }
    localStorage.setItem(Keys.EVENT_KEY, String(event));
  }

  public events: EventDto[] | undefined;
  getAll(): Observable<ServiceResponse<EventDto[]>> {
    if (this.events) {
      return new Observable<ServiceResponse<EventDto[]>>((sub) => {
        sub.next({
          success: true,
          data: this.events,
        });
      });
    }
    const url = `event/get-all`;
    return this.httpService.post<ServiceResponse<EventDto[]>>(url).pipe(
      tap((res) => {
        if (res.success) {
          this.events = res.data;
        }
      })
    );
  }
  getById(ID: number): Observable<ServiceResponse<EventDto>> {
    const url = `event/get-by-id/${ID}`;
    return this.httpService.post<ServiceResponse<EventDto>>(url);
  }
  updateFromBrm(
    input: BrmDaiLeResponse[] | null
  ): Observable<ServiceResponse<boolean>> {
    const url = `event/update-from-brm`;
    return this.httpService.post<ServiceResponse<boolean>>(url, input);
  }
}
