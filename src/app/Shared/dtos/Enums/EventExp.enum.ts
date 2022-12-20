export enum EventExp {
  ChuaTungThamGia = 0,
  Duoi3Lan = 1,
  Tren3Lan = 2,
}

export namespace EventExp {
  export function toString(type: EventExp): string {
    switch (type) {
      case EventExp.ChuaTungThamGia:
        return 'Chưa từng tham gia';
      case EventExp.Tren3Lan:
        return 'Trên 3 lần';
      case EventExp.Duoi3Lan:
        return 'Dưới 3 lần';
      default:
        return '';
    }
  }

  export function toList() {
    var types = Object.keys(EventExp)
      .map((k) => Number(k))
      .filter((i) => !isNaN(i));
    return types.map((i) => {
      return {
        value: i,
        label: EventExp.toString(i),
      };
    });
  }
}
