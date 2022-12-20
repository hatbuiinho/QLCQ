import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TT Phật Quang | Đăng ký đại lễ';
  constructor(private primengConfig: PrimeNGConfig, title: Title) {
    title.setTitle(this.title);
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
