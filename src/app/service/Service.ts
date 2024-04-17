import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable(
  { providedIn: 'root' })
export class Service {

  constructor(private http: HttpClient) { }

  // Method to fetch countries
  getCountries(): Observable<any> {
    return this.http.get("https://countriesnow.space/api/v0.1/countries/positions");
  }

  // Method to fetch cities of a country
  getCities(countryName: any): Observable<any> {
    return this.http.post("https://countriesnow.space/api/v0.1/countries/cities", {"country": countryName});
  }

  // Method to fetch population by country
  getPopulationByCountry(name: any) {
    return this.http.post("https://countriesnow.space/api/v0.1/countries/population", {"country": name});
  }

  // Method to fetch population by city
  getPopulationByCity(name: any) {
    return this.http.post("https://countriesnow.space/api/v0.1/countries/population/cities", {"city": name});
  }

  // Method to fetch location coordinates by country
  getLocationByCountry(name: any) {
    return this.http.post("https://countriesnow.space/api/v0.1/countries/positions", {"country": name});
  }

  // Method to fetch capital by country
  getCapital(name: any) {
    return this.http.post("https://countriesnow.space/api/v0.1/countries/capital", {"country": name});
  }

  // Method to fetch currency by country
  getCurrency(name: any) {
    return this.http.post("https://countriesnow.space/api/v0.1/countries/currency", {"country": name});
  }
}