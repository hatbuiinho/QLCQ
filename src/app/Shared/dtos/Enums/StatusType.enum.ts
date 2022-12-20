export enum StatusType {
  NotAssignYet = 0,
  ChuaDuyet = 1,
  DaDuyet = 2,
  TuChoi = 3,
  ChuyenBan = 4,
  ChuyenNhom = 5,
}

export namespace StatusType {
  export function toString(value: StatusType) {
    switch (value) {
      case StatusType.ChuaDuyet:
        return 'Chưa duyệt';
      case StatusType.DaDuyet:
        return 'Đã duyệt';
      case StatusType.TuChoi:
        return 'Từ chối';
      case StatusType.ChuyenBan:
        return 'Chuyển ban';
      case StatusType.ChuyenNhom:
        return 'Chuyển nhóm';
      default:
        return 'Chưa duyệt';
    }
  }

  export function all() {
    const keys = Object.keys(StatusType);
    const result = keys
      .map((key) => Number(key))
      .filter((key) => {
        return !isNaN(key);
      })
      .map((key) => {
        const value = {
          value: key,
          name: StatusType.toString(key),
        };
        return value;
      });
    return result;
  }

  export function toTag(status: StatusType) {
    switch (status) {
      case StatusType.ChuaDuyet:
        return { icon: 'pi pi-hourglass', severity: 'warning' };
      case StatusType.DaDuyet:
        return { icon: 'pi pi-verified', severity: 'success' };
      case StatusType.TuChoi:
        return { icon: 'pi pi-times-circle', severity: 'danger' };
      case StatusType.ChuyenBan:
        return { icon: 'pi pi-arrows-h', severity: '' };
      case StatusType.ChuyenNhom:
        return { icon: 'pi pi-arrows-h', severity: '' };
      default:
        return { icon: '', severity: '' };
    }
  }
}
