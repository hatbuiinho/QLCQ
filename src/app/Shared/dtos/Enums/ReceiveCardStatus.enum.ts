export enum ReceiveCardStatus {
  ChuaNhan = 0,
  DaNhan = 1,
}

export namespace ReceiveCardStatus {
  export function toString(type: ReceiveCardStatus): string {
    switch (type) {
      case ReceiveCardStatus.DaNhan:
        return 'Đã nhận';
      default:
        return 'Chưa nhận';
    }
  }
  export function getList() {
    const types = Object.keys(ReceiveCardStatus)
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
