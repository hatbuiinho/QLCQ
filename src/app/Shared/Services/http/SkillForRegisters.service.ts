import { Injectable } from '@angular/core';
import { Observable, EMPTY, startWith, tap } from 'rxjs';
import { ServiceResponse } from '../../dtos/ServiceResponse.model';
import { SkillForRegisterDto } from '../../dtos/SkillForRegisters/SkillForRegisterDto.model';
import { UpSertSkillForRegisterDto } from '../../dtos/SkillForRegisters/UpSertSkillForRegisterDto.model';
import { HttpServerService } from './http-service.service';
@Injectable({
  providedIn: 'root',
})
export class SkillForRegistersService {
  constructor(private httpService: HttpServerService) {}
  public skills: SkillForRegisterDto[] | undefined;
  getall(): Observable<ServiceResponse<SkillForRegisterDto[]>> {
    if (this.skills?.length) {
      return EMPTY.pipe(
        startWith({
          data: this.skills,
          success: true,
        })
      );
    }
    const url = `skillforregisters/GetAll`;
    return this.httpService
      .get<ServiceResponse<SkillForRegisterDto[]>>(url)
      .pipe(
        tap((res) => {
          if (res.success) {
            this.skills = res.data;
          }
        })
      );
  }
  create(
    request: UpSertSkillForRegisterDto | null
  ): Observable<ServiceResponse<SkillForRegisterDto>> {
    this.skills = undefined;
    const url = `skillforregisters/Create`;
    return this.httpService.post<ServiceResponse<SkillForRegisterDto>>(
      url,
      request
    );
  }
  update(
    id: number,
    request: UpSertSkillForRegisterDto | null
  ): Observable<ServiceResponse<SkillForRegisterDto>> {
    this.skills = undefined;
    const url = `skillforregisters/Update/${id}`;
    return this.httpService.put<ServiceResponse<SkillForRegisterDto>>(
      url,
      request
    );
  }
  delete(id: number): Observable<ServiceResponse<boolean>> {
    this.skills = undefined;
    const url = `skillforregisters/Delete/${id}`;
    return this.httpService.delete<ServiceResponse<boolean>>(url);
  }
  getbyid(id: number): Observable<ServiceResponse<SkillForRegisterDto>> {
    const url = `skillforregisters/GetById/${id}`;
    return this.httpService.get<ServiceResponse<SkillForRegisterDto>>(url);
  }
}
