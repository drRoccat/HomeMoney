import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import { BaseApi } from '../../../shared/core/base-api';
import { LILEvent } from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  addEvent(event: LILEvent): Observable<LILEvent> {
    return this.post('events', event);
  }
  getEvents(): Observable<LILEvent[]> {
    return this.get('events');
  }
  getEventById(id: string): Observable<LILEvent> {
    return this.get(`events/${id}`);
  }
}
