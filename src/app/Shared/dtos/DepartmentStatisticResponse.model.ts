import { StatusType } from "./Enums/StatusType.enum";
import { DepartmentDto } from "./Departments/DepartmentDto.model";
import { EventDto } from "./EventDto.model";
import { AreaDto } from "./Areas/AreaDto.model";
import { GroupDto } from "./Groups/GroupDto.model";
import { MemberDto } from "./Members/MemberDto.model";

export class DepartmentStatisticResponse {
	id : number = 0;
	eventId : number = 0;
	maleCount : number = 0;
	femaleCount : number = 0;
	actualQuantity : number = 0;
	note : string |  = "";
	description : string |  = "";
	event : EventDto |  = ;
	statusId : StatusType = StatusType.;
	departmentId : number |  = ;
	requiredQuantity : number |  = ;
	areas : AreaDto[] |  = [];
	groups : GroupDto[] |  = [];
	members : MemberDto[] |  = [];
	department : DepartmentDto |  = ;
}
