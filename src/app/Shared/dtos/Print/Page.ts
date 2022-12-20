import { CardMemberDto } from './CardMemberDto.model';

export interface Page {
    pageNo: number;
    pageContent: CardMemberDto[];
}
