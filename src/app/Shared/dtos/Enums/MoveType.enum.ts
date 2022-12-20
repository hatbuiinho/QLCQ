export enum MoveType {
  WithCTN = 0,
  ByPlane = 1,
  Other = 2,
}
export namespace MoveType {
  export function toString(type: MoveType): string {
    switch (type) {
      case MoveType.WithCTN:
        return 'Đi cùng CTN';
      case MoveType.ByPlane:
        return 'Máy bay';
      default:
        return 'Tự túc';
    }
  }

  export function toList() {
    var types = Object.keys(MoveType)
      .map((k) => Number(k))
      .filter((i) => !isNaN(i));
    return types.map((i) => {
      return {
        value: i,
        label: MoveType.toString(i),
      };
    });
  }
}
