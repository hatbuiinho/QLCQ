import { HttpStatusCode } from "./Enums/HttpStatusCode.enum";

export class SearchResponse<T> {
	data : T | ;
	matchs : string |  = "";
	message : string |  = "";
	success : boolean = false;
	code : HttpStatusCode = HttpStatusCode.;
}
