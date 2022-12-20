import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-croppable-image-input',
  templateUrl: './croppable-image-input.component.html',
  styleUrls: ['./croppable-image-input.component.css'],
  host: { '(click)': 'onClick()' },
})
export class CroppableImageInputComponent implements OnInit {
  @Input('styleClass') styleClass: string | undefined;
  @Input('style') style: any;
  @Input('ratio') ratio: number = 0;
  @Input('inputId') inputId: string = 'croppable-image-input';
  @Output('save') input = new EventEmitter<File>();
  // @HostListener('click') onClick() {}
  public visible: boolean = false;

  constructor() {}

  ngOnInit(): void {}
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.visible = true;
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log(event);
    this.croppedImage = event.base64;
  }
  imageLoaded(image: LoadedImage) {
    console.log(image);
    // show cropper
  }
  cropperReady() {
    console.log('ready');
    // cropper ready
  }
  loadImageFailed() {
    console.log('failed');
    // show message
  }
  public save() {
    const buffer = Buffer.from(
      this.croppedImage.slice(this.croppedImage.indexOf('base64,') + 7),
      'base64'
    );
    const file = this.imageChangedEvent.target.files[0];
    const blob = new Blob([buffer], {
      type: file.type,
    });
    var b: any = blob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = file.name;

    //Cast to a File() type
    this.input.emit(<File>blob);
    this.visible = false;
  }

  public onClick() {
    const input = document.getElementById(this.inputId) as HTMLInputElement;
    if (input) {
      input.value = '';
      input.click();
    }
  }
}
