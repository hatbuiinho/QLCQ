export enum CarBookingType {
  Go = 0,
  Return = 1,
  Both = 2,
}
export namespace CarBookingType {
  export function toString(type: CarBookingType): string {
    switch (type) {
      case CarBookingType.Go:
        return 'Chiều đi';
      case CarBookingType.Return:
        return 'Chiều về';
      case CarBookingType.Both:
        return 'Cả 2 chiều';
      default:
        return '';
    }
  }
  export function getList() {
    const types = Object.keys(CarBookingType)
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
