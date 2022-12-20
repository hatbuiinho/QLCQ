import { BreadCrumbService } from './../../Services/client/bread-crumb.service';
import { AreasService } from './../../Services/http/Areas.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentDetailDto } from '../../dtos/DepartmentDetails/DepartmentDetailDto.model';
import { GroupDto } from '../../dtos/Groups/GroupDto.model';
import { UpSertGroupDto } from '../../dtos/Groups/UpSertGroupDto.model';
import { AreaDto } from './../../dtos/Areas/AreaDto.model';
import { AreaLookUpDto } from '../../dtos/Areas/AreaLookUpDto.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit, OnChanges {
  @Input('value')
  public set group(value: GroupDto | undefined) {
    this._group = value;
    if (value) this.form.patchValue(value);
    else this.form.reset();
  }
  private _group: GroupDto | undefined;
  public get group(): GroupDto | undefined {
    return this._group;
  }
  @Input('area') public set area(value: number | undefined) {
    this.form.controls['areaId'].setValue(value);
  }

  @Input('selectedArea') selectedArea?: AreaDto;
  @Input('departments') departmentDetails: DepartmentDetailDto[] = [];
  @Input('departmentDetailId')
  public set departmentDetailId(value: number | undefined) {
    this._departmentDetailId = value;
    this.loadAreas();
  }
  private _departmentDetailId: number | undefined;
  public get departmentDetailId(): number | undefined {
    return this._departmentDetailId;
  }
  @Output('onSubmit') submit = new EventEmitter<UpSertGroupDto>();

  public areas: AreaDto[] = [];
  public form: FormGroup;

  constructor(private areaService: AreasService) {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      note: new FormControl('', [Validators.maxLength(200)]),
      code: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.maxLength(500)]),
      areaId: new FormControl('', [Validators.required]),
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.form.patchValue({
      areaId: this.selectedArea?.id,
    });
  }

  ngOnInit(): void {}

  public loadAreas() {
    if (this.departmentDetailId) {
      const payload: AreaLookUpDto = {
        pageIndex: 1,
        pageSize: 999999,
        departmentDetailId: this.departmentDetailId,
      };
      this.areaService.search(payload).subscribe({
        next: (res) => {
          if (res.success && res.data?.items) {
            this.areas = res.data.items;
          }
        },
      });
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const payload: UpSertGroupDto = { ...this.form.value };
      this.submit.emit(payload);
    }
  }
}
