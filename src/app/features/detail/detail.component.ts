import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Service} from "../../service/Service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-detail',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  country: any;
  city: any;
  population: any;
  currency: any;
  location: any;
  capital: any;
  loading: boolean = false; // Flag to indicate loading state
  countryName: any;
  cityName: any;
  constructor(private service: Service, private router: Router) {
    // Initialize country and city properties with values from localStorage
    this.country = localStorage.getItem("country");
    this.city = localStorage.getItem("city");
  }

  ngOnInit() {
    this.loading = true; // Set loading flag to true
    // When component initializes, fetch population, location, capital, and currency information
    this.getPopulation();
    this.getLocation();
    this.getCapital();
    this.getCurrency();

  }

  // Method to fetch population based on country or city
  getPopulation() {
    debugger
    this.countryName = this.country;
    if (this.city == null || this.city == "null") { // If city is not specified, get population by country
      this.service.getPopulationByCountry(this.country).subscribe((data: any) => {
        this.countryName = "";
        // Calculate total population
        const populationCounts = data.data.populationCounts;
        this.population = 0; // Initialize population count
        // for (let i = 0; i < populationCounts.length; i++) {
        //   this.population += parseInt(populationCounts[i].value);
        // }
        this.countryName = this.country +" (" + populationCounts[populationCounts.length-1].year +")";
        this.population += parseInt(populationCounts[populationCounts.length-1].value);
      });
    } else { // If city is specified, get population by city
      this.cityName = " ("+this.city+")";
      this.service.getPopulationByCity(this.city).subscribe((data: any) => {
        // Calculate total population
        const populationCounts = data.data.populationCounts;
        this.population = 0; // Initialize population count
        // for (let i = 0; i < populationCounts.length; i++) {
        //   this.population += parseInt(populationCounts[i].value);
        // }
        this.population += parseInt(populationCounts[populationCounts.length-1].value);
      }, error => {
        this.population = "Not Found"
      });
    }
  }

  // Method to fetch location coordinates of the country
  getLocation() {
    this.service.getLocationByCountry(this.country).subscribe((data: any) => {
      // Set location coordinates
      this.location = "Long: " + data.data.long + " Lat: " + data.data.lat;
    });
  }

  // Method to fetch capital of the country
  getCapital() {
    this.service.getCapital(this.country).subscribe((data: any) => {
      // Set capital
      this.capital = data.data.capital;
    });
  }

  // Method to fetch currency of the country
  getCurrency() {
    this.service.getCurrency(this.country).subscribe((data: any) => {
      // Set currency
      this.currency = data.data.currency;
      this.loading = false; // Set loading flag to false
    });
  }

  onClick(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
