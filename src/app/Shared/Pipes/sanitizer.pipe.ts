import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizer',
})
export class SanitizerPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(value?: string | null, ...args: unknown[]): unknown {
    if (!value) {
      return value;
    }
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }
}
