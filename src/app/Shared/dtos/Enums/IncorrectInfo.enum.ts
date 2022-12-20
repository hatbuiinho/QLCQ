export enum IncorrectInfo {
  INCORRECT_PHOTO,
}

export namespace IncorrectInfo {
  export function toString(status: number) {
    switch (status) {
      case IncorrectInfo.INCORRECT_PHOTO:
        return 'Sai ảnh';
      default:
        return '';
    }
  }
}
