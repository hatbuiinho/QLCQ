export enum ReceiveClothStatus {
  NotReceived = 0,
  Received = 1,
  WrongSize = 2,
  Lost = 3,
}

export namespace ReceiveClothStatus {
  export function toString(type: ReceiveClothStatus): string {
    switch (type) {
      case ReceiveClothStatus.NotReceived:
        return 'Chưa nhận';
      case ReceiveClothStatus.Received:
        return 'Đã nhận';
      case ReceiveClothStatus.WrongSize:
        return 'Lệch size';
      case ReceiveClothStatus.Lost:
        return 'Làm mất';
      default:
        return 'Chưa nhận';
    }
  }
  export function getList() {
    const types = Object.keys(ReceiveClothStatus)
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
