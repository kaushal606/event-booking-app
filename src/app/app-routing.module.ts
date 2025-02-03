import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventBookingComponent } from './components/event-booking/event-booking.component';
import { EventListingComponent } from './components/event-listing/event-listing.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      { path: '', component: EventListingComponent },
      { path: 'event-booking', component: EventBookingComponent },
      { path: '**', redirectTo: '' },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
