import { HttpServerService } from './http/http-service.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../dtos/ServiceResponse.model';

@Injectable({
  providedIn: 'root',
})
export class BlobStorageService {
  constructor(private http: HttpServerService) {}

  public upload(file: File | Blob): Observable<ServiceResponse<string>> {
    const url = `BlobStorage/Upload`;
    const data = new FormData();
    if (file instanceof File) data.append(file.name, file);
    else data.append('file', file);
    return this.http.post<ServiceResponse<string>>(url, data);
  }
}
