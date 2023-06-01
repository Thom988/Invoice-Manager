import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BillsPageComponent } from './bills-page/bills-page.component';
import { ClientsPageComponent } from './clients-page/clients-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    BillsPageComponent,
    ClientsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
