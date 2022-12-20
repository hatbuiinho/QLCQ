export enum PrintStatus {
  ChuaIn = 0,
  DaIn = 1,
}

export namespace PrintStatus {
  export function toString(type: PrintStatus): string {
    switch (type) {
      case PrintStatus.DaIn:
        return 'Đã in';
      default:
        return 'Chưa in';
    }
  }
  export function getList() {
    const types = Object.keys(PrintStatus)
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
