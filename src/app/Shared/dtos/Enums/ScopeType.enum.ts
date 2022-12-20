export enum ScopeType {
  Private = 0,
  Public = 1,
}

export namespace ScopeType {
  export function toString(type: ScopeType): string {
    switch (type) {
      case ScopeType.Private:
        return 'Nội bộ';
      case ScopeType.Public:
        return 'Công  khai';
      default:
        return '';
    }
  }
  export function toList() {
    var types = Object.keys(ScopeType)
      .map((k) => Number(k))
      .filter((i) => !isNaN(i));
    return types.map((i) => {
      return {
        value: i,
        label: ScopeType.toString(i),
      };
    });
  }
}
