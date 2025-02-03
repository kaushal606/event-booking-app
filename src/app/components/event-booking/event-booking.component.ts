import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { SetSelectedEvent, UpdateEvent } from 'src/app/store/event.action';
import { EventState } from 'src/app/store/event.state';
import { Observable } from 'rxjs';
import { EventInterface } from 'src/app/model/event';

@Component({
  selector: 'app-event-booking',
  templateUrl: './event-booking.component.html',
  styleUrls: ['./event-booking.component.scss'],
})
export class EventBookingComponent implements OnInit {
  @ViewChild('myElem') MyProp!: ElementRef;
  eventBookingForm!: FormGroup;
  namePattern = /^[a-zA-Z\s]*$/;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  attendeeVali = false;
  eventId;
  event!: EventInterface;

  @Select(EventState.selectedEvent) selectedEvent$!: Observable<EventInterface>;
  ticketsBooked: boolean = false;

  constructor(
    private Fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private store: Store
  ) {
    this.eventId = Number(this.route.snapshot.queryParamMap.get('id'));
  }

  ngOnInit() {
    this.eventBookingForm = this.Fb.group({
      name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      mobile: ['', [Validators.required]],
      noOfSeats: ['', [Validators.required]],
      attendees: this.Fb.array([]),
    });

    this.getEventById(this.eventId);
    this.addNewAttendie();
  }

  get attendees() {
    return this.eventBookingForm.get('attendees') as FormArray;
  }

  addNewAttendie() {
    const add = this.eventBookingForm.get('attendees') as FormArray;
    add.push(
      this.Fb.group({
        attendee: ['', Validators.required],
      })
    );
  }

  goBack() {
    this.location.back();
  }

  getEventById(id: number) {
    this.store.dispatch(new SetSelectedEvent(id));
    this.selectedEvent$.subscribe((res) => {
      this.event = res;
      this.eventBookingForm
        .get('noOfSeats')
        ?.addValidators(Validators.max(this.event.availableTickets));
    });
  }

  onFormSubmit() {
    console.log(this.eventBookingForm.value);
    if (this.eventBookingForm.status == 'VALID') {
      this.ticketsBooked = true;

      let bookedEvenData: EventInterface = {
        ...this.event,
        availableTickets:
          this.event.availableTickets - this.eventBookingForm.value.noOfSeats,
      };
      this.store.dispatch(new UpdateEvent(bookedEvenData));

      setTimeout(() => {
        this.router.navigate(['']);
      }, 2000);
      this.MyProp.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}
