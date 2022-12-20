import { CellInfo } from './../../dtos/cell-info';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-excel-error-table',
  templateUrl: './excel-error-table.component.html',
  styleUrls: ['./excel-error-table.component.css'],
})
export class ExcelErrorTableComponent implements OnInit {
  @Input('errors') errors: CellInfo[] = [];
  constructor() {}

  ngOnInit(): void {}
}
