import { StartTimeStatisticResponse } from "./StartTimeStatisticResponse.model";

export class StartPointStatisticResponse {
	count : number = 0;
	address : string |  = "";
	startTimes : StartTimeStatisticResponse[] |  = [];
}
