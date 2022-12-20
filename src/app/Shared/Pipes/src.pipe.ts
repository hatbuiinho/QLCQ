import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'src',
})
export class SrcPipe implements PipeTransform {
  MEDIA_SERVER: string = environment.MEDIA_SERVER;
  transform(value: string | null | undefined, ...args: unknown[]): string {
    if (value) {
      if (!value.startsWith('http') && !value.startsWith('assets')) {
        while (value.indexOf('/') === 0) {
          value = value.slice(1);
        }
        value = this.MEDIA_SERVER + '/' + value;
      }
      return value;
    }
    return '';
  }
}
