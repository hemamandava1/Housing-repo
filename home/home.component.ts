import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from './housing-location/housing-location.component';
import { HousingLocation } from './housing-location/housing-location';
import { HousingService } from '../housing.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
      <section>
        <form>
          <input type="text" placeholder="Filter by city" #filter>
          <button class="primary" type="button"(click)="filterResults(filter.value)">Search</button>
        </form>
      </section>
      <section class="results">
      <app-housing-location *ngFor="let housingLocation of filterdLocationList" [housingLocation]="housingLocation"></app-housing-location>
      </section>   
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  public housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filterdLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filterdLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) this.filterdLocationList = this.housingLocationList; // this allows user to clear and search box and get all housing location listx

    this.filterdLocationList = this.housingLocationList.filter(housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
