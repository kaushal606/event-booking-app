import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { EventBookingComponent } from './event-booking/event-booking.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventListingComponent } from './event-listing/event-listing.component';
import { FilterPipe } from '../pipes/filter.pipe';

@NgModule({
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    CardComponent,
    HeaderComponent,
    EventBookingComponent,
    ButtonComponent,
    EventListingComponent,
    FilterPipe,
  ],
  exports: [
    CardComponent,
    HeaderComponent,
    EventBookingComponent,
    EventListingComponent,
    ButtonComponent,
  ],
})
export class ComponentsModule {}
