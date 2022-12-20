import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpSertAreaDto } from './../../dtos/Areas/UpSertAreaDto.model';
import { DepartmentDetailDto } from 'src/app/Shared/dtos/DepartmentDetails/DepartmentDetailDto.model';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AreaDto } from '../../dtos/Areas/AreaDto.model';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
})
export class AreaComponent implements OnInit, OnChanges {
  @Input('value')
  public set area(value: AreaDto | undefined) {
    this._area = value;
    console.log('area', value);

    if (value) {
      console.log('set value');

      this.form.patchValue(value);
    } else {
      console.log('reset');

      this.form.reset();
    }
  }
  private _area: AreaDto | undefined;
  public get area(): AreaDto | undefined {
    return this._area;
  }
  @Input('selectedDepartment') selectedDepartment?: DepartmentDetailDto;
  @Input('departments') departmentDetails: DepartmentDetailDto[] = [];
  @Output('onSubmit') submit = new EventEmitter<UpSertAreaDto>();

  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      departmentDetailId: new FormControl('', [Validators.required]),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      code: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      requiredQuantity: new FormControl('', [Validators.min(0)]),
      note: new FormControl('', [Validators.maxLength(200)]),
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.form.patchValue({ departmentDetailId: this.selectedDepartment?.id });
  }

  ngOnInit(): void {}

  public onSubmit(): void {
    if (this.form.valid) {
      const payload: UpSertAreaDto = { ...this.form.value };
      this.submit.emit(payload);
    }
  }
}
