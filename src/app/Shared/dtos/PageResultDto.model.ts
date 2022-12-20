
export class PageResultDto<TData> {
	totalRecords : number = 0;
	items?: TData[]  = [];
}
