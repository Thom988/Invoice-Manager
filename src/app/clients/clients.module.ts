import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientPageComponent } from './components/client-page/client-page.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { SearchClientComponent } from './components/search-client/search-client.component';
import { NewClientComponent } from './components/new-client/new-client.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { ClientCardComponent } from './components/client-card/client-card.component';

@NgModule({
  declarations: [
    ClientPageComponent,
    SearchClientComponent,
    NewClientComponent,
    ClientCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule 
  ],
  exports: [
   
  ]
})

export class ClientsModule { }
