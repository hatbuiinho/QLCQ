import { PrintStatus } from "../Enums/PrintStatus.enum";
import { ReceiveCardStatus } from "../Enums/ReceiveCardStatus.enum";
import { ContactStatusType } from "../Enums/ContactStatusType.enum";

export interface UpdateEventRegistryStatusDto {
	code?: string ;
	printStatus?: PrintStatus ;
	contactStatus?: ContactStatusType ;
	receiveCardStatus?: ReceiveCardStatus ;
}