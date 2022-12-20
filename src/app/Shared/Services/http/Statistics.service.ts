import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServerService } from './http-service.service';
@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private httpService: HttpServerService) {}
}
