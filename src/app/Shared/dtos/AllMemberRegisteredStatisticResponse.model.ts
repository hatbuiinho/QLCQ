import { ContactStatusType } from "./Enums/ContactStatusType.enum";

export class AllMemberRegisteredStatisticResponse {
	all : number = 0;
	ctn : number = 0;
	contactStatusCount : {[index:number] : number} = {};
}