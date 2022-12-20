export enum ContactStatusType {
  ChuaLienHe = 0,
  ChuaChacChan = 1,
  ChacChan = 2,
  Huy = 3,
}
export namespace ContactStatusType {
  export function toString(type: ContactStatusType): string {
    switch (type) {
      case ContactStatusType.ChuaLienHe:
        return 'Chưa liên hệ';
      case ContactStatusType.ChacChan:
        return 'Chắc chắn';
      case ContactStatusType.ChuaChacChan:
        return 'Chưa chắc chắn';
      case ContactStatusType.Huy:
        return 'Hủy';
      default:
        return 'Chưa liên hệ';
    }
  }
  export function getList() {
    const types = Object.keys(ContactStatusType)
      .map((item) => Number(item))
      .filter((item) => {
        return !isNaN(item);
      });
    const result = types.map((i) => {
      return {
        value: i,
        label: toString(i),
      };
    });
    return result;
  }
}
