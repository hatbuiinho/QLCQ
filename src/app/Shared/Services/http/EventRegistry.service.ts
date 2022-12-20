import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CellInfo } from '../../dtos/cell-info';
import { StatusType } from '../../dtos/Enums/StatusType.enum';
import { EventRegistryDto } from '../../dtos/EventRegistries/EventRegistryDto.model';
import { EventRegistryLookUpDto } from '../../dtos/EventRegistries/EventRegistryLookUpDto.model';
import { PatchUpdateEventRegistryDto } from '../../dtos/EventRegistries/PatchUpdateEventRegistryDto.model';
import { SearchRegisterDto } from '../../dtos/EventRegistries/SearchRegisterDto.model';
import { ShortRegisterDto } from '../../dtos/EventRegistries/ShortRegisterDto.model';
import { UpdateEventRegistryAssignDto } from '../../dtos/EventRegistries/UpdateEventRegistryAssignDto.model';
import { UpdateEventRegistryStatusDto } from '../../dtos/EventRegistries/UpdateEventRegistryStatusDto.model';
import { UpSertEventRegistryDto } from '../../dtos/EventRegistries/UpSertEventRegistryDto.model';
import { PageResultDto } from '../../dtos/PageResultDto.model';
import { ServiceResponse } from '../../dtos/ServiceResponse.model';
import { HttpServerService } from './http-service.service';
@Injectable({
  providedIn: 'root',
})
export class EventRegistryService {
  constructor(private httpService: HttpServerService) {}
  search(
    request: EventRegistryLookUpDto | null
  ): Observable<ServiceResponse<PageResultDto<EventRegistryDto>>> {
    const url = `eventregistry/search`;
    return this.httpService.post<
      ServiceResponse<PageResultDto<EventRegistryDto>>
    >(url, request);
  }
  event(id: number): Observable<ServiceResponse<EventRegistryDto>> {
    const url = `eventregistry/event/${id}`;
    return this.httpService.get<ServiceResponse<EventRegistryDto>>(url);
  }
  member(
    id: number,
    memberId: string
  ): Observable<ServiceResponse<EventRegistryDto>> {
    const url = `eventregistry/member/${id}`;
    return this.httpService.get<ServiceResponse<EventRegistryDto>>(url, {
      memberId: memberId,
    });
  }
  update(
    id: string,
    request: UpSertEventRegistryDto | null
  ): Observable<ServiceResponse<EventRegistryDto>> {
    const url = `eventregistry/Update/${id}`;
    return this.httpService.put<ServiceResponse<EventRegistryDto>>(
      url,
      request
    );
  }
  getbyid(id: string): Observable<ServiceResponse<EventRegistryDto>> {
    const url = `eventregistry/GetById/${id}`;
    return this.httpService.get<ServiceResponse<EventRegistryDto>>(url);
  }
  updateStatus(
    id: string,
    input: UpdateEventRegistryStatusDto | null
  ): Observable<ServiceResponse<boolean>> {
    const url = `eventregistry/update-status/${id}`;
    return this.httpService.put<ServiceResponse<boolean>>(url, input);
  }
  updateAssignStatus(
    status: StatusType,
    input: string[]
  ): Observable<ServiceResponse<number>> {
    const url = `eventregistry/update-assign-status`;
    return this.httpService.put<ServiceResponse<number>>(url, input, {
      params: {
        status: status,
      },
    });
  }
  departmentAssign(
    input: UpdateEventRegistryAssignDto | null
  ): Observable<ServiceResponse<never>> {
    const url = `eventregistry/department-assign`;
    return this.httpService.put<ServiceResponse<never>>(url, input);
  }
  areaAssign(
    input: UpdateEventRegistryAssignDto | null
  ): Observable<ServiceResponse<never>> {
    const url = `eventregistry/area-assign`;
    return this.httpService.put<ServiceResponse<never>>(url, input);
  }
  groupAssign(
    input: UpdateEventRegistryAssignDto | null
  ): Observable<ServiceResponse<never>> {
    const url = `eventregistry/group-assign`;
    return this.httpService.put<ServiceResponse<never>>(url, input);
  }
  searchLeader(
    input: SearchRegisterDto | null
  ): Observable<ServiceResponse<ShortRegisterDto>> {
    const url = `eventregistry/search-leader`;
    return this.httpService.post<ServiceResponse<ShortRegisterDto>>(url, input);
  }
  group(id: string): Observable<ServiceResponse<ShortRegisterDto[]>> {
    const url = `eventregistry/group/${id}`;
    return this.httpService.post<ServiceResponse<ShortRegisterDto[]>>(url);
  }
  markasarrived(eventId: number): Observable<ServiceResponse<never>> {
    const url = `eventregistry/MarkAsArrived/${eventId}`;
    return this.httpService.post<ServiceResponse<never>>(url);
  }
  previewExcel(
    id: number,
    file: File
  ): Observable<
    ServiceResponse<{
      errors: CellInfo[];
      items: EventRegistryDto[];
    }>
  > {
    const url = `eventregistry/import/preview/${id}`;
    const data = new FormData();
    data.append('file', file, file.name);
    return this.httpService.post<
      ServiceResponse<{
        errors: CellInfo[];
        items: any[];
      }>
    >(url, data);
  }

  importExcel(id: number, file: File): Observable<ServiceResponse<number>> {
    const url = `eventregistry/import/${id}`;
    const data = new FormData();
    data.append('file', file, file.name);
    return this.httpService.post<ServiceResponse<number>>(url, data);
  }

  public exportExcel(payload: EventRegistryLookUpDto): Observable<Blob> {
    const url = `eventregistry/export/excel`;
    return this.httpService.get<Blob>(url, payload, {
      responseType: 'blob' as 'json',
    });
  }
  arrived(id: string): Observable<ServiceResponse<never>> {
    const url = `eventregistry/arrived/${id}`;
    return this.httpService.post<ServiceResponse<never>>(url);
  }
  patchUpdate(
    id: string[],
    values: PatchUpdateEventRegistryDto
  ): Observable<ServiceResponse<never>> {
    values.registers = id;
    const url = `eventregistry/update`;
    return this.httpService.patch<ServiceResponse<never>>(url, values);
  }
  create(
    request: UpSertEventRegistryDto | null
  ): Observable<ServiceResponse<EventRegistryDto>> {
    const url = `eventregistry/Create`;
    return this.httpService.post<ServiceResponse<EventRegistryDto>>(
      url,
      request
    );
  }
  delete(id: string): Observable<ServiceResponse<boolean>> {
    const url = `eventregistry/Delete/${id}`;
    return this.httpService.delete<ServiceResponse<boolean>>(url);
  }
  getall(): Observable<ServiceResponse<EventRegistryDto[]>> {
    const url = `eventregistry/GetAll`;
    return this.httpService.get<ServiceResponse<EventRegistryDto[]>>(url);
  }
  deleteMany(ids: string[]): Observable<ServiceResponse<number>> {
    const url = `eventregistry/delete`;
    return this.httpService.post<ServiceResponse<number>>(url, ids);
  }

  patchFields(
    registers: EventRegistryDto[],
    fields: string[],
    onSuccess?: (res: ServiceResponse<any>) => void,
    onError?: (err: any) => void,
    onComplete?: () => void
  ) {
    if (fields.length && registers.length) {
      registers = registers.map((reg) => {
        reg.leaderId = reg.leader?.id;
        return reg;
      });

      const payload: { [index: string]: any } = {};
      const tempRegisters = registers as any[];
      fields.forEach((field) => {
        if (field) {
          tempRegisters.forEach((reg) => {
            payload[field] = reg[field];
          });
        }
      });
      debugger;
      this.patchUpdate(
        registers.map((r) => r.id),
        payload
      ).subscribe({
        next: (res) => {
          if (res.success) {
            onSuccess?.(res);
          }
        },
        error: (err) => {
          onError?.(err);
        },
        complete: () => {
          onComplete?.();
        },
      });
    }
  }
}
