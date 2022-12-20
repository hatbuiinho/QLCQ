import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  public async toDataUrl(
    src: string,
    callback: (url: string) => void,
    outputFormat?: string
  ) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;
    img.onload = function () {
      const canvas = document.createElement('CANVAS') as HTMLCanvasElement;
      const context = canvas.getContext('2d');
      canvas.height = img.height;
      canvas.width = img.width;
      if (context) {
        context.drawImage(img, 0, 0, img.width, img.height);
      }
      const urlData = canvas.toDataURL(outputFormat);
      callback(urlData);
    };
  }
}
