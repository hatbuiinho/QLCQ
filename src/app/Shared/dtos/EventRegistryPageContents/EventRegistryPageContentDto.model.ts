import { EventDto } from "../EventDto.model";

export interface EventRegistryPageContentDto {
	id: number;
	eventId: number;
	image?: string ;
	header?: string ;
	content?: string ;
	shortContent?: string ;
	isDefault: boolean;
	event?: EventDto ;
	images?: any ;
}