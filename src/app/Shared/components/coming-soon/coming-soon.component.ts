import { NavigationEnd, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css'],
})
export class ComingSoonComponent implements OnInit, OnDestroy {
  constructor() {}
  ngOnDestroy(): void {
  }

  ngOnInit(): void {}
}
