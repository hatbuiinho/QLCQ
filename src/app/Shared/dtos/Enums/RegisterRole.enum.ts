export enum RegisterRole {
  Member = 0,
  Leader = 1,
}

export namespace RegisterRole {
  export function toString(role: RegisterRole): string {
    switch (role) {
      case RegisterRole.Member:
        return 'Thành viên';
      case RegisterRole.Leader:
        return 'Trưởng nhóm';
      default:
        return 'Cá nhân';
    }
  }
  export function toList() {
    var types = Object.keys(RegisterRole)
      .map((k) => Number(k))
      .filter((i) => !isNaN(i));
    return types.map((i) => {
      return {
        value: i,
        label: RegisterRole.toString(i),
      };
    });
  }
}
