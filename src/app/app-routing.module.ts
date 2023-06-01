import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillsPageComponent } from './bills-page/bills-page.component';
import { ClientsPageComponent } from './clients-page/clients-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
    /*{path: 'facesnaps/:id', component: SingleFaceSnapComponent},*/
    { path: 'billspage', component: BillsPageComponent},
    { path: 'clientspage', component: ClientsPageComponent},
    /* la landing page s'affiche dès l'arrivée sur le site car rien
    n'est renseigné par défaut dans la balise <router-outlet> de app.component.html*/
    { path: '', component: LandingPageComponent}
  ];

  @NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })
export class AppRoutingModule {}