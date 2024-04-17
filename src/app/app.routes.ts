import {Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {MainComponent} from "./features/main/main.component";
import {DetailComponent} from "./features/detail/detail.component";

export const routes: Routes = [{
  path: '',
  component: AppComponent,
  canActivate: [],
  children: [
    {path: '', component: MainComponent},
    {path: 'detail', component: DetailComponent}
  ],
}];
