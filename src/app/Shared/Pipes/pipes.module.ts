import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizerPipe } from './sanitizer.pipe';
import { SrcPipe } from './src.pipe';
import { UrlPipe } from './url.pipe';

@NgModule({
  declarations: [SanitizerPipe, SrcPipe, UrlPipe],
  imports: [CommonModule],
  exports: [SanitizerPipe, SrcPipe, UrlPipe],
})
export class PipesModule {}
