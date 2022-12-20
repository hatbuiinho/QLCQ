import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ScopeType } from '../../dtos/Enums/ScopeType.enum';
import { EventDto } from '../../dtos/EventDto.model';
import { EventRegistryPageDto } from '../../dtos/EventRegistryPages/EventRegistryPageDto.model';
import { BreadCrumbService } from '../../Services/client/bread-crumb.service';
import { EventService } from '../../Services/http/Event.service';
import { EventRegistryService } from '../../Services/http/EventRegistry.service';
import { EventRegistryPagesService } from '../../Services/http/EventRegistryPages.service';

@Component({
  selector: 'app-event-dropdown',
  templateUrl: './event-dropdown.component.html',
  styleUrls: ['./event-dropdown.component.css'],
})
export class EventDropdownComponent implements OnInit {
  @Input('options') public events: EventDto[] = [];
  @Input('appendTo') appendTo: any;
  @Input('showClear') showClear: boolean = false;
  // Selected event
  private _selectedEvent: EventDto | undefined;
  public get selectedEvent(): EventDto | undefined {
    return this._selectedEvent;
  }
  @Input('value') public set selectedEvent(value: EventDto | undefined) {
    if (this.selectedEvent !== value) {
      if (value) {
        this.eventService.setDefault(value);
      }
      this._selectedEvent = value;
      this.onValueChange.emit(value);
    }
  }
  @Input('autoLoad') autoLoad = true;
  @Output('valueChange') public onValueChange = new EventEmitter<
    EventDto | undefined
  >();

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    if (!this.events.length && this.autoLoad) {
      this.loadEvents();
    }
  }

  public loadEvents(): void {
    this.eventService.getAll().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.events = res.data;
          if (!this.selectedEvent)
            this.selectedEvent = this.eventService.getDefault(this.events);
        }
      },
    });
  }
}
