import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { EventInterface } from 'src/app/model/event';
import { DataService } from 'src/app/services/data.service';
import { GetEvent } from 'src/app/store/event.action';
import { EventState } from 'src/app/store/event.state';

@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.scss'],
})
export class EventListingComponent implements OnInit, OnDestroy {
  eventData: EventInterface[];
  searchText!: string;
  eventsSub!: Subscription;
  eventLoadedSub!: Subscription;

  @Select(EventState.getEventList) events$!: Observable<EventInterface[]>;
  @Select(EventState.eventLoaded) eventLoaded$!: Observable<EventInterface[]>;

  constructor(private store: Store) {
    this.eventData = [];
  }

  ngOnInit(): void {
    this.getEventData();
    this.eventsSub = this.events$.subscribe((res) => {
      this.eventData = res;
    });
  }

  getEventData() {
    this.eventLoadedSub = this.eventLoaded$.subscribe((eventsLoaded) => {
      if (!eventsLoaded) {
        this.store.dispatch(new GetEvent());
      }
    });
  }

  ngOnDestroy(): void {
    this.eventsSub.unsubscribe();
    this.eventLoadedSub.unsubscribe();
  }
}
