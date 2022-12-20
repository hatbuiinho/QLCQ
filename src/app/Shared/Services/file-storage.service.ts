import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CTNReponse } from '../dtos/ctnreponse';
import { UploadResponse } from '../dtos/upload-response';

@Injectable({
  providedIn: 'root',
})
export class FileStorageService {
  host: string = environment.CTN_APIS;
  constructor(private http: HttpClient) {}

  public remove(key: string) {
    const url = `${this.host}/photo/remove`;
    return this.http.get(url, {
      params: { key: key },
    });
  }

  public upload(
    files: (File | Blob)[],
    fileName?: string,
    options?:
      | { folder?: string; maxsize?: number; Istemp?: boolean }
      | undefined
  ) {
    const url = `${this.host}photo/upload`;
    const data = new FormData();
    files.forEach((file) => {
      if (file instanceof File)
        data.append('files', file, fileName ?? file.name);
      else {
        if (!fileName) {
          throw new Error('Filename is required to upload');
        }

        data.append('files', file, fileName);
      }
    });
    return this.http
      .post<CTNReponse<UploadResponse[]>>(url, data, {
        params: options,
      })
      .pipe(
        map((res) => {
          if (res.code == 1 && res.data.length) {
            res.data.forEach((d) => {
              d.fileUrl = `${this.host}photo?key=${d.storedFileName}`;
            });
          }
          return res;
        })
      );
  }
}
