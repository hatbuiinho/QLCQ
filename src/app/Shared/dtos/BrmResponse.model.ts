export class BrmResponse<T> {
  data!: T;
  message: string = '';
  status?: boolean;
}
