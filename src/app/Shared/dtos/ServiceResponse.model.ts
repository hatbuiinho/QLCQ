import { HttpStatusCode } from './Enums/HttpStatusCode.enum';

export class ServiceResponse<T> {
  data?: T;
  message?: string = '';
  success: boolean = false;
  code?: HttpStatusCode;
}
