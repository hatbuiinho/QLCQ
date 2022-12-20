import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputSwitch } from 'primeng/inputswitch';
import { DepartmentDetailDto } from '../../dtos/DepartmentDetails/DepartmentDetailDto.model';
import { UpSertDepartmentDetailDto } from '../../dtos/DepartmentDetails/UpSertDepartmentDetailDto.model';
import { DepartmentDto } from '../../dtos/Departments/DepartmentDto.model';
import { ScopeType } from '../../dtos/Enums/ScopeType.enum';

@Component({
  selector: 'app-department-detail-dialog',
  templateUrl: './department-detail-dialog.component.html',
  styleUrls: ['./department-detail-dialog.component.css'],
})
export class DepartmentDetailDialogComponent implements OnInit {
  @Input('value') value?: DepartmentDetailDto;
  @Input('visible') visible: boolean = false;
  @Output('visibleChange') visibleChange = new EventEmitter<boolean>();
  @Input('departments') departments: DepartmentDto[] = [];
  @Output('submit') onSubmit = new EventEmitter<UpSertDepartmentDetailDto>();

  public ScopeType = ScopeType;
  public form: FormGroup;
  public stateOptions: any[];

  constructor() {
    this.stateOptions = [
      { label: 'Hiển thị', value: true },
      { label: 'Ẩn', value: false },
    ];
    this.form = new FormGroup({
      departmentId: new FormControl(1, [
        Validators.required,
        Validators.min(2),
      ]),
      note: new FormControl('', [Validators.maxLength(200)]),
      description: new FormControl('', [Validators.maxLength(500)]),
      isVisible: new FormControl(true, [Validators.required]),
      type: new FormControl(ScopeType.Private),
      requiredQuantity: new FormControl(0),
    });
  }

  ngOnInit(): void {}

  public reset() {
    console.log('reset');

    this.form.reset();
    this.form.patchValue({
      isVisible: true,
      type: ScopeType.Private,
      requiredQuantity: 0,
    });
  }

  public setValue(value: any): void {
    console.log('set value', value);

    // this.form.reset();
    this.form.patchValue(value);
  }

  formSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.onSubmit.emit(this.form.value);
    this.visibleChange.emit(false);
  }

  onHide() {
    this.visibleChange.emit(this.visible);
  }
}
