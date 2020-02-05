import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {assessmentComponent} from './home/home.component'

import {ErrorComponent} from './error.component'

import {appRoutes} from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MsalModule} from "@azure/msal-angular";
import { MsalInterceptor} from "@azure/msal-angular";

import {UserDataComponent} from "./user-data/user-data.component";
import { HttpServiceHelper } from './common/HttpServiceHelper';

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log("client logging" + message);
}


export const protectedResourceMap:[string, string[]][]=[ ['http://33ec902d.ngrok.io/api/v1/buildings',['api://63449795-e282-472a-b44f-b4da380d5f0c/user.read']] , ['https://graph.microsoft.com/v1.0/me', ['user.read']] ];

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

@NgModule({
  declarations: [
    AppComponent, assessmentComponent, ErrorComponent, UserDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,{useHash:true}) ,
    MsalModule.forRoot({
        clientID: '63449795-e282-472a-b44f-b4da380d5f0c',
        authority: "https://login.microsoftonline.com/987fbf3e-f163-461b-80bd-43ca3f3b8c3b",
        validateAuthority: true,
        redirectUri: "http://localhost:4200/assessment",
        cacheLocation : "localStorage",
        storeAuthStateInCookie: isIE, // set to true for IE 11
        postLogoutRedirectUri: "http://localhost:4200/",
        navigateToLoginRequestUrl: false,
        popUp: !isIE,
        consentScopes: [ "user.read", "openid", "profile", "api://63449795-e282-472a-b44f-b4da380d5f0c/user.read"],
        unprotectedResources: ["https://www.microsoft.com/en-us/"],
        protectedResourceMap: protectedResourceMap,
        logger: loggerCallback,
        correlationId: '1234',
        piiLoggingEnabled: true
      }
    ),
  ],
  providers: [HttpServiceHelper,
     {provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
