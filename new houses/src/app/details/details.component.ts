import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingApiService } from '../housing-api.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo"
        alt="Exterior photo of {{housingLocation?.name}}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi ? 'Yes' : 'No'}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry ? 'Yes' : 'No'}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName">

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName">

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {

  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private housingApiService: HousingApiService
  ) {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingApiService.getHousingLocationById(housingLocationId).subscribe(location => {
      console.log('Received housing location:', location);
      this.housingLocation = location;
    });
  }

  submitApplication() {
    const firstName = this.applyForm.value.firstName ?? '';
    const lastName = this.applyForm.value.lastName ?? '';
    const email = this.applyForm.value.email ?? '';
    this.housingApiService.submitApplication(firstName, lastName, email).subscribe(() => {
      console.log('Application submitted successfully.');
      this.applyForm.reset();
    }, error => {
      console.error('Failed to submit application:', error);
    });
  }
  
}