import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/components/landing-page.component';


const routes: Routes = [
    { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule)},
    { path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)},
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