import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { LoadingComponent } from './loading.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [LoadingComponent, SpinnerComponent],
  imports: [CommonModule, ProgressSpinnerModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  exports: [LoadingComponent],
})
export class LoadingModule {}
