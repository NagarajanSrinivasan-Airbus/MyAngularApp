import { Routes } from '@angular/router';
import { assessmentComponent} from './home/home.component'

import { ErrorComponent} from './error.component'

import {MsalGuard} from "@azure/msal-angular";

import {UserDataComponent} from "./user-data/user-data.component";

export const appRoutes: Routes = [
  { path: 'home', component: assessmentComponent  },
  
  { path: 'userProfile' ,component: UserDataComponent, canActivate : [MsalGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];




