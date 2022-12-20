import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'url'
})
export class UrlPipe implements PipeTransform {

  transform(value: string | null, ...args: unknown[]): string | null {
    if (value)
    {
      if (!value.startsWith('http'))
      {
        while (value.indexOf('/') === 0) {
          value = value.slice(1);
        }
        value = 'http://' + value;
      }
    }
    return value;
  }

}
