export enum PositionType {
  Manager = 1,
  ViceManager = 2,
  Supporter = 3,
  Trainee = 4,
  AreaLeader = 5,
  AreaSubLeader = 6,
  GroupLeader = 7,
  GroupSubLeader = 8,
  Member = 9,
  Secretary = 10,
}

export namespace PositionType {
  export function toString(type: PositionType): string {
    switch (type) {
      case PositionType.Manager:
        return 'Trưởng ban';
      case PositionType.ViceManager:
        return 'Phó ban';
      case PositionType.Supporter:
        return 'Hỗ trợ';
      case PositionType.Trainee:
        return 'Học việc';
      case PositionType.AreaLeader:
        return 'Trưởng khu vực';
      case PositionType.AreaSubLeader:
        return 'Phó khu vực';
      case PositionType.GroupLeader:
        return 'Trưởng nhóm';
      case PositionType.GroupSubLeader:
        return 'Phó nhóm';
      case PositionType.Member:
        return 'Thành viên';
      case PositionType.Secretary:
        return 'Thư ký';
      default:
        return '';
    }
  }
  export function toList() {
    var types = Object.keys(PositionType)
      .map((k) => Number(k))
      .filter((i) => !isNaN(i));
    return types.map((i) => {
      return {
        value: i,
        label: PositionType.toString(i),
      };
    });
  }
}
