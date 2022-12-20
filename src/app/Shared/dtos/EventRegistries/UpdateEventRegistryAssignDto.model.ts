import { PositionType } from "../Enums/PositionType.enum";

export interface UpdateEventRegistryAssignDto {
	registries?: string[];
  id : number;
	position: PositionType;
}
