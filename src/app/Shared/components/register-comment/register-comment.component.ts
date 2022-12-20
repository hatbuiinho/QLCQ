import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-register-comment',
  templateUrl: './register-comment.component.html',
  styleUrls: ['./register-comment.component.css'],
})
export class RegisterCommentComponent {
  @Input('value') value: any;
  @Input('position') position: string | undefined = 'left';
}
