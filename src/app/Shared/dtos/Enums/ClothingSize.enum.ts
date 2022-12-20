export enum ClothingSize {
  S = 0,
  M = 1,
  L = 2,
  XL = 3,
  XXL = 4,
  XXXL = 5,
}

export namespace ClothingSize {
  export function toString(type: ClothingSize): string {
    switch (type) {
      case ClothingSize.XXXL:
        return '3XL';
      default:
        return ClothingSize[type].toString();
    }
  }
  export function getList() {
    const types = Object.keys(ClothingSize)
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
