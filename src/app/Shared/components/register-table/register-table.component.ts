import { EventExp } from './../../dtos/Enums/EventExp.enum';
import { MoveType } from './../../dtos/Enums/MoveType.enum';
import { EventRegistryDto } from './../../dtos/EventRegistries/EventRegistryDto.model';
import { Component, Input, OnInit } from '@angular/core';
import { Gender } from '../../dtos/Enums/Gender.enum';

@Component({
  selector: 'app-register-table',
  templateUrl: './register-table.component.html',
  styleUrls: ['./register-table.component.css'],
})
export class RegisterTableComponent implements OnInit {
  @Input('registers') registers: EventRegistryDto[] = [];

  public Gender = Gender;
  public MoveType = MoveType;
  public EventExp = EventExp;

  constructor() {}

  ngOnInit(): void {}
}
