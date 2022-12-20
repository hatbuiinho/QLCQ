import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpContext,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ChungThanhNienDto } from '../dtos/BRM/ChungThanhNienDto.model';
import { BrmResponse } from './../dtos/BrmResponse.model';

@Injectable({
  providedIn: 'root',
})
export class CtnpqService {
  constructor(private http: HttpClient) {}
  private cache: { [ctnId: number]: BrmResponse<ChungThanhNienDto[]> } = {};
  private allCTN: BrmResponse<ChungThanhNienDto[]> | undefined;
  public searchCTN(
    ctn?: number | null
  ): Observable<BrmResponse<ChungThanhNienDto[]>> {
    if (this.allCTN && !ctn) {
      return new Observable<BrmResponse<ChungThanhNienDto[]>>((s) =>
        s.next(this.allCTN)
      );
    }
    if (this.cache && ctn && ctn in this.cache) {
      return new Observable<BrmResponse<ChungThanhNienDto[]>>((s) =>
        s.next(this.cache[ctn])
      );
    }
    const url = `${environment.CTN_APIS}ctn/list`;
    let payload: HttpParams = new HttpParams();
    if (ctn) {
      payload = payload.append('ctnId', ctn);
    }
    return this.http
      .get<BrmResponse<ChungThanhNienDto[]>>(url, { params: payload })
      .pipe(
        map((res) => {
          if (res.data) {
            res.data.forEach((item, index, list) => {
              if (item.parentId) {
                var parent = list.find((i) => i.id === item.parentId);
                if (parent) {
                  item.name = `${item.name} - ${parent.name}`;
                }
              }
            });
            if (!ctn) {
              this.allCTN = res;
            } else {
              this.cache[ctn] = res;
            }
          }
          return res;
        })
      );
  }
}
