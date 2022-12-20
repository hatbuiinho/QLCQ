import { PrintService as PrintService } from './../Shared/Services/print-service.service';
import { AuthDataService } from 'src/app/Shared/Services/http/auth-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public isPrinting = false;
  constructor(
    private authData: AuthDataService,
    private printService: PrintService
  ) {}

  ngOnInit(): void {
    this.authData.loadPermission();
    this.printService.$status.subscribe((res) => {
      this.isPrinting = res;
    });
  }
}
