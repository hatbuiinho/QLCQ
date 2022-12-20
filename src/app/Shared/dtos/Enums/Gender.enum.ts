export enum Gender {
  Male = 0,
  Female = 1,
  Unknown = 2,
}

export namespace Gender {
  export function toString(gender: Gender): string {
    switch (gender) {
      case Gender.Male:
        return 'Nam';
      case Gender.Female:
        return 'Nữ';
      default:
        return 'Không rõ';
    }
  }
}
