import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { EventInterface } from '../model/event';
import { DataService } from '../services/data.service';
import { GetEvent, SetSelectedEvent, UpdateEvent } from './event.action';

export class EventStateModel {
  events!: EventInterface[];
  selectedEvent!: EventInterface;
  eventsLoaded!: boolean;
}

@State<EventStateModel>({
  name: 'events',
  defaults: {
    events: [],
    selectedEvent: null as any,
    eventsLoaded: false,
  },
})
@Injectable()
export class EventState {
  constructor(private dataService: DataService) {}

  @Selector()
  static getEventList(state: EventStateModel) {
    return state.events;
  }

  @Selector()
  static selectedEvent(state: EventStateModel) {
    return state.selectedEvent;
  }

  @Selector()
  static eventLoaded(state: EventStateModel) {
    return state.eventsLoaded;
  }

  @Action(GetEvent)
  getEvents({ getState, setState }: StateContext<EventStateModel>) {
    console.log('State action');
    return this.dataService.getEvents().pipe(
      tap((res: any) => {
        const state = getState();
        setState({
          ...state,
          events: res,
          eventsLoaded: true,
        });
      })
    );
  }

  @Action(SetSelectedEvent)
  setSelectedEvent(
    { getState, setState }: StateContext<EventStateModel>,
    id: SetSelectedEvent
  ) {
    const state = getState();
    const eventList = state.events;
    const index = eventList.findIndex(function (item, i) {
      return item.id === id.id;
    });

    setState({
      ...state,
      selectedEvent: eventList[index],
    });
  }

  @Action(UpdateEvent)
  updateEvent(
    { getState, patchState }: StateContext<EventStateModel>,
    { payload }: UpdateEvent
  ) {
    console.log(payload);

    const state = getState();
    const eventList = state.events;
    const index = eventList.findIndex(function (item, i) {
      return item.id === payload.id;
    });

    eventList[index] = payload;

    console.log(eventList);

    patchState({
      events: eventList,
    });
  }
}
