import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Service} from "../../service/Service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  // Form Group to initialize form, Arrays and boolean type variable declared and initialized.
  form!: FormGroup; // Form group for managing form controls
  countries: string[] = []; // Array to store countries
  cities: string[] = []; // Array to store cities
  loading: boolean = false; // Flag to indicate loading state

  constructor(private formBuilder: FormBuilder, private service: Service, private router: Router) {}

  ngOnInit() {
    // Initialize the form group and subscribe to country changes
    this.form = this.formBuilder.group({
      country: [],
      city: []
    });
    this.getCountries(); // Fetch countries on component initialization
    this.onCountryChange(); // Subscribe to country changes
  }

  // Method to fetch countries from the service
  getCountries() {
    this.service.getCountries().subscribe(x => {
      // Push country names into the countries array
      x.data.forEach((country: any) => {
        this.countries.push(country.name);
      });
    });
  }

  // Method to subscribe to changes in the selected country
  onCountryChange() {
    this.form.controls['country'].valueChanges.subscribe({
      next: (data: any) => {
        this.getCities(data); // Fetch cities based on selected country
      }
    });
  }

  // Method to fetch cities based on selected country
  getCities(name: any) {
    this.loading = true; // Set loading flag to true
    this.service.getCities(name).subscribe((x) => {
      this.cities = []; // Clear existing cities
      // Push city names into the cities array
      x.data.forEach((city: any) => {
        this.cities.push(city);
      });
      this.loading = false; // Set loading flag to false after data is fetched
    });
  }

  // Method to handle form submission
  onSubmit() {
    if (this.form.controls["country"].value == null) {
      alert("Please select Country");
      return;
    }
    // Store selected country and city in localStorage and navigate to detail page
    localStorage.setItem("country", this.form.controls["country"].value);
    localStorage.setItem("city", this.form.controls["city"].value);
    this.router.navigate(['/detail']);
  }
}