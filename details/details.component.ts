import { HousingLocation } from './../home/housing-location/housing-location';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo">
      <section class="Listing-Description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}</p>
      </section>
      <section class="listing-features">
      <h2 class="section-heading">About this housing location</h2>
      <ul>
        <li>Units available: {{housingLocation?.availableUnits}}</li>
        <li>Does This Location have Wifi: {{housingLocation?.wifi}}</li>
        <li>Does This Location has laundry 
          {{housingLocation?.laundry}}
        </li>
      </ul>
      </section>
    <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input  type="text" id="first-name" formControlName="firstName">

          <label id="last-name">Last Name</label>
          <input  type="text" id="last-name" formControlName="lastName">

          <label for="email">Email </label>
          <input  type="email" id="email" formControlName="email">

          <button type="submit" class="primary">Apply now</button>
        </form>
    </section>

  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute =inject(ActivatedRoute);
  housingService = inject (HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  }); 

  constructor(){
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getAllHousingLocations().then(locations => { 
      locations.forEach(location => {
        if (location.id === housingLocationId) {
          this.housingLocation = location;
        }
      })
      });
  }

  submitApplication(){
    this.housingService.submitApplication(
      this.applyForm.value.firstName ??'',
      this.applyForm.value.lastName ??'',
      this.applyForm.value.email ??''
    );
  }
}
