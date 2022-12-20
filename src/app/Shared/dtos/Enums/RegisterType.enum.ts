export enum RegisterType {
  Single = 0,
  Group = 1,
}

export namespace RegisterType {
  export function toString(type: RegisterType): string {
    switch (type) {
      case RegisterType.Single:
        return 'Cá nhân';
      case RegisterType.Group:
        return 'Theo đoàn';
      default:
        return 'Cá nhân';
    }
  }

  export function toList() {
    var types = Object.keys(RegisterType)
      .map((k) => Number(k))
      .filter((i) => !isNaN(i));
    return types.map((i) => {
      return {
        value: i,
        label: RegisterType.toString(i),
      };
    });
  }
}
