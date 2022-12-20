import { ImageService } from './../../Services/image.service';
import { PrintService } from './../../Services/print-service.service';
import { firstValueFrom } from 'rxjs';
import { CustomMessageServiceService } from 'src/app/Shared/Services/custom-message-service.service';
import { CtnpqService } from './../../Services/ctnpq.service';
import { DepartmentShortName } from './../../dtos/Enums/DepartmentShortName.enum';
import { Component, Input, QueryList, ViewChild } from '@angular/core';
import { PositionType } from '../../dtos/Enums/PositionType.enum';
import { EventRegistryDto } from '../../dtos/EventRegistries/EventRegistryDto.model';
import { Page } from '../../dtos/Print/Page';
import { CardMemberDto } from '../../dtos/Print/CardMemberDto.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-print-card',
  templateUrl: './print-card.component.html',
  styleUrls: ['./print-card.component.css'],
})
export class PrintCardComponent {
  // @ViewChild(HTMLImageElement) images!: QueryList<HTMLImageElement>;
  @Input() public DepartmentShortName = DepartmentShortName;
  @Input() registers: EventRegistryDto[] = [];
  @Input() onPrintComplete: () => void = () => {};

  public recordsPerPage: number = 5;
  public pages: Page[] = [];
  public cards: CardMemberDto[] = [];
  public isShowDialog = false;

  /* Department card image */
  public ATN?: string;
  public BD?: string;
  public BDS?: string;
  public RC?: string;
  public BV?: string;
  public CD?: string;
  public CH?: string;
  public CT?: string;
  public HD?: string;
  public HD1?: string;
  public HD2?: string;
  public HDTN?: string;
  public HM?: string;
  public KSD?: string;
  public MT?: string;
  public NSDL?: string;
  public TGN?: string;
  public TGT?: string;
  public TK?: string;
  public TKY?: string;
  public TN?: string;
  public DPX?: string;
  public HTVN?: string;

  public constructor(
    private ctnpqService: CtnpqService,
    private messageService: CustomMessageServiceService,
    private printService: PrintService,
    private imageService: ImageService
  ) {}

  initDepartmentCardImage() {
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/ATN.png',
      (src) => {
        this.ATN = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/BD.png',
      (src) => {
        this.BD = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/BDS.png',
      (src) => {
        this.BDS = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/RC.png',
      (src) => {
        this.RC = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/BV.png',
      (src) => {
        this.BV = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/CD.png',
      (src) => {
        this.CD = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/CH.png',
      (src) => {
        this.CH = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/CT.png',
      (src) => {
        this.CT = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/HD.png',
      (src) => {
        this.HD = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/HD1.png',
      (src) => {
        this.HD1 = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/HD2.png',
      (src) => {
        this.HD2 = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/HDTN.png',
      (src) => {
        this.HDTN = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/HM.png',
      (src) => {
        this.HM = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/KSD.png',
      (src) => {
        this.KSD = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/MT.png',
      (src) => {
        this.MT = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/NSDL.png',
      (src) => {
        this.NSDL = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/TGN.png',
      (src) => {
        this.TGN = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/TGT.png',
      (src) => {
        this.TGT = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/TK.png',
      (src) => {
        this.TK = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/TKY.png',
      (src) => {
        this.TKY = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/TN.png',
      (src) => {
        this.TN = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/DPX.png',
      (src) => {
        this.DPX = src;
      }
    );
    this.imageService.toDataUrl(
      '/assets/img/QR_card_template/HTVN.png',
      (src) => {
        this.HTVN = src;
      }
    );
  }

  public ngOnInit(): void {
    this.initDepartmentCardImage();
  }

  public ngOnChanges() {
    // this.getCardsPrinting();
  }

  public async getCardsPrinting() {
    let cardTemp: CardMemberDto[] = [];
    for (let item of this.registers) {
      const { member, departmentDetail, eventRegistryPageId, id, code } = item;
      if (!departmentDetail) {
        continue; // ignore when not assign department yet
      }
      const ctnId = member?.organizationStructureId;
      let ctnName;
      const res = await firstValueFrom(this.ctnpqService.searchCTN(ctnId));
      ctnName = res.data.find((ctn) => ctn.id === ctnId)?.name || '';
      const card: CardMemberDto = {
        id: member?.id,
        fullName: member?.fullName,
        religiousName: member?.religiousName,
        registerCode: code,
        organzationStuctureName: ctnName,
        avatarPath: member?.avatarPath,
        departmentCode: departmentDetail.department?.code,
        positionType: PositionType.toString(
          item.position || PositionType.Member
        ),
        qrCodeLink: `${environment.REGISTRY_HOST}/${eventRegistryPageId}/register-info/${id}`,
      };
      cardTemp.push(card);
    }

    return cardTemp;
  }

  public async print() {
    if (!this.registers.length) {
      return this.messageService.error('Hãy chọn ít nhất 1 người ạ');
    }
    const selectedRegisterDepartments = this.registers.map(
      (r) => r.departmentDetail
    );
    if (!selectedRegisterDepartments.length) {
      return this.messageService.error('Hãy phân ban trước khi in thẻ ạ');
    }
    const cardInfos = await this.getCardsPrinting();
    const pagingResult = this.paging(cardInfos, this.recordsPerPage);
    this.pages = pagingResult;
    window.scroll(0, 0);
    this.isShowDialog = true;
    this.printService.statusSubject.next(true);
    // this.images.forEach((image) => {
    //   image.onload = () => {
    //     if (this.images.find(i => i.sta))
    //   };
    // });
    setTimeout(() => {
      window.print();
      this.printService.statusSubject.next(false);
    }, 1000);

    window.onafterprint = () => {
      if (this.onPrintComplete) {
        this.onPrintComplete();
      }
    };
  }

  paging(records: any[], recordsPerPage: number): any[] {
    let pages: any[] = [];
    const totalPages = Math.ceil(records.length / recordsPerPage);

    for (let pageNo = 0; pageNo < totalPages; pageNo++) {
      let range: any[] = this.getRecordsPerPage(
        pageNo,
        records,
        recordsPerPage
      );

      pages.push({ pageNo: pageNo + 1, pageContent: [...range] });
    }

    return pages;
  }
  getRecordsPerPage(
    page: number = 0,
    records: any[],
    recordsPerPage: number = 1
  ): any[] {
    let range: any[] = [];
    let startIndex: number = recordsPerPage * page;
    let endIndex: number = startIndex + recordsPerPage;

    for (let index = startIndex; index < endIndex; index++) {
      if (records[index]) {
        range.push(records[index]);
      }
    }

    return range;
  }
}
