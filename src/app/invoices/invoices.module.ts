import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NewInvoiceComponent } from './components/new-invoice/new-invoice.component';
import { invoicesRoutingModule } from './invoices-routing.module';
import { SearchInvoiceComponent } from './components/search-invoice/search-invoice.component';
import { NewInvoiceItemComponent } from './components/new-invoice-item/new-invoice-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceDisplayComponent } from './components/invoice-display/invoice-display.component';
import { InvoicePageComponent } from './components/invoice-page/invoice-page.component';
import { InvoicesListComponent } from './components/invoices-list/invoices-list.component';
import { InvoiceCardComponent } from './components/invoice-card/invoice-card.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NewInvoiceComponent,
    SearchInvoiceComponent,
    NewInvoiceItemComponent,
    InvoiceDisplayComponent,
    InvoicePageComponent,
    InvoicesListComponent,
    InvoiceCardComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    invoicesRoutingModule,
    ReactiveFormsModule, // pour les formulaires reactifs (FormGroup, FormBuilder)
    FormsModule, // pour les formulaires simples

  ], 
  exports: [
    NewInvoiceComponent,
    SearchInvoiceComponent,
    NewInvoiceItemComponent,
    InvoiceDisplayComponent
  ],
  providers: [
    DatePipe
  ]
})
export class InvoicesModule { }
