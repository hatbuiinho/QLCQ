export enum PhanLoaiThanhNien {
  NongCot = 1,
  ThuongXuyen = 2,
  KhongThuongXuyen = 3,
  ChuaTuTap = 4,
}

export namespace PhanLoaiThanhNien {
  export function toString(value: PhanLoaiThanhNien): string {
    switch (value) {
      case PhanLoaiThanhNien.NongCot:
        return 'Nòng cốt';
      case PhanLoaiThanhNien.ThuongXuyen:
        return 'Thường xuyên';
      case PhanLoaiThanhNien.KhongThuongXuyen:
        return 'Không thường xuyên';
      case PhanLoaiThanhNien.ChuaTuTap:
        return 'Chưa tu tập';
      default:
        return '';
    }
  }
}
