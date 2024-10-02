import { Injectable } from '@angular/core';
import { HousingLocation } from './home/housing-location/housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = 'http://localhost:3000/locations';   //property within the class of HousingService (API endpoint)

  constructor() {

  }  // this method is used to construct an object andassign values to the objects members.

  async getAllHousingLocations() : Promise<HousingLocation[]> { // asynchronous operations like API requests
    const data = await fetch(this.url);                         //HTTP Get Request to API 
    return await data.json() ?? [];                              //This provides a fallback in case the API returns no data, preventing potential errors caused by trying to use null or undefined values
  }

  async getHousingLocationById(id: Number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);               // get data by usin Id 
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}


