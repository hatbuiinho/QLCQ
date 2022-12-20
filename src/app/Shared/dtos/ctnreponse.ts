export interface CTNReponse<T> {
  data: T;
  total?: number;
  code: number;
  message: string;
}
