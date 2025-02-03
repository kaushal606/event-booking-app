import { EventInterface } from '../model/event';

export class GetEvent {
  static readonly type = '[Event] Get';
}

export class SetSelectedEvent {
  static readonly type = '[Event] Set';

  constructor(public id: number) {}
}

export class UpdateEvent {
  static readonly type = '[Event] Update';

  constructor(public payload: EventInterface) {}
}
