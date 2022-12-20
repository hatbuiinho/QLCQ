import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { Observable, lastValueFrom } from 'rxjs';
import { BreadCrumbService } from 'src/app/Shared/Services/client/bread-crumb.service';
import { ServiceResponse } from 'src/app/Shared/dtos/ServiceResponse.model';
import { SkillForRegisterDto } from 'src/app/Shared/dtos/SkillForRegisters/SkillForRegisterDto.model';
import { UpSertSkillForRegisterDto } from 'src/app/Shared/dtos/SkillForRegisters/UpSertSkillForRegisterDto.model';
import { SkillForRegistersService } from 'src/app/Shared/Services/http/SkillForRegisters.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css'],
})
export class SkillListComponent implements OnInit {
  public btnItems: MenuItem[];
  public skills: SkillForRegisterDto[] = [];
  public selectedSkills: SkillForRegisterDto[] = [];
  public selectedSkill?: SkillForRegisterDto;

  public loading = false;

  public form: FormGroup;
  public formVisible: boolean = false;
  public formEditing: boolean = false;

  constructor(
    private breadCrumb: BreadCrumbService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private skillService: SkillForRegistersService,
    private dom: DomSanitizer
  ) {
    this.breadCrumb.setPageTitle('Quản lý danh sách kỹ năng');
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      note: new FormControl(''),
      description: new FormControl(''),
      isActive: new FormControl(true, [Validators.required]),
    });

    this.btnItems = [
      {
        label: 'Kích hoạt',
        icon: 'fa-regular fa-circle-check',
        command: () => {
          this.updateStatus(true);
        },
      },
      {
        label: 'Vô hiệu hóa',
        icon: 'fa-regular fa-eye-slash',
        command: () => {
          this.updateStatus(false);
        },
      },
      {
        label: 'Xóa kỹ năng',
        icon: 'fa-regular fa-trash-can',
        command: () => {},
      },
    ];
  }
  ngOnInit(): void {
    this.loadSkills();
  }

  public loadSkills() {
    this.loading = true;
    this.skillService.getall().subscribe((res) => {
      if (res.success && res.data) {
        this.skills = res.data;
      }
      this.loading = false;
    });
  }

  public add() {
    this.formEditing = true;
    this.form.reset();
    this.formVisible = true;
  }

  public edit(skill: SkillForRegisterDto) {
    this.formEditing = true;
    this.form.reset();
    this.form.patchValue(skill);
    this.selectedSkill = skill;
    this.formVisible = true;
  }

  public save() {
    if (this.form.valid) {
      let request: Observable<ServiceResponse<SkillForRegisterDto>>;
      const id = this.selectedSkill?.id;
      const dto: UpSertSkillForRegisterDto = this.form.value;
      if (id) {
        request = this.skillService.update(id, dto);
      } else {
        request = this.skillService.create(dto);
      }
      request.subscribe((res) => {
        if (res.success && res.data) {
          if (id) {
            this.skills.splice(
              this.skills.findIndex((d) => d.id === id),
              1
            );
            this.messageService.add({
              detail: `Đã cập nhập kỹ năng ${res.data.name}`,
              severity: 'success',
              summary: 'Thông báo',
            });
          } else {
            this.messageService.add({
              detail: `Đã thêm kỹ năng ${res.data.name}`,
              severity: 'success',
              summary: 'Thông báo',
            });
          }
          this.skills.push(res.data);
        }
        this.formVisible = false;
      });
    }
  }

  public async updateStatus(isActive: boolean) {
    if (this.selectedSkills.length) {
      this.loading = true;
      for (const skill of this.selectedSkills) {
        await lastValueFrom(
          this.skillService.update(skill.id, { ...skill, isActive: isActive })
        ).then((res) => {
          if (res.success) {
            skill.isActive = isActive;
          }
        });
      }
      this.loading = false;
      this.messageService.add({
        detail: `Đã cập nhật ${this.selectedSkills.length} kỹ năng`,
        severity: 'success',
      });
    }
  }

  public showDetail(skill: SkillForRegisterDto) {
    this.form.patchValue(skill);
    this.selectedSkill = skill;
    this.formEditing = false;
    this.formVisible = true;
  }
}
