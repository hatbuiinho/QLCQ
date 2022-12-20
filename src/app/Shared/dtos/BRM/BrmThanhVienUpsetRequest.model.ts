import { BrmThanhVienResponse } from "../BRM/BrmThanhVienResponse.model";

export interface BrmThanhVienUpsetRequest {
	idDaiLe: number;
	token?: string ;
	members: BrmThanhVienResponse[] ;
}