import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewInvoiceComponent } from './components/new-invoice/new-invoice.component';
import { invoicesRoutingModule } from './invoices-routing.module';
import { SearchInvoiceComponent } from './components/search-invoice/search-invoice.component';
import { NewInvoiceItemComponent } from './components/new-invoice-item/new-invoice-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceDisplayComponent } from './components/invoice-display/invoice-display.component';


@NgModule({
  declarations: [
    NewInvoiceComponent,
    SearchInvoiceComponent,
    NewInvoiceItemComponent,
    InvoiceDisplayComponent
  ],
  imports: [
    CommonModule,
    invoicesRoutingModule,
    ReactiveFormsModule
  ], 
  exports: [
    SearchInvoiceComponent, 
    NewInvoiceComponent,
    NewInvoiceItemComponent
  ]
})
export class InvoicesModule { }
