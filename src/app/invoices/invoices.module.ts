import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewInvoiceComponent } from './components/new-invoice/new-invoice.component';
import { invoicesRoutingModule } from './invoices-routing.module';
import { SearchInvoiceComponent } from './components/search-invoice/search-invoice.component';
import { NewInvoiceItemComponent } from './components/new-invoice-item/new-invoice-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceDisplayComponent } from './components/invoice-display/invoice-display.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';


@NgModule({
  declarations: [
    NewInvoiceComponent,
    SearchInvoiceComponent,
    NewInvoiceItemComponent,
    InvoiceDisplayComponent,
    InvoiceListComponent
  ],
  imports: [
    CommonModule,
    invoicesRoutingModule,
    ReactiveFormsModule, // pour les formulaires reactifs (FormGroup, FormBuilder)
    FormsModule // pour les formulaires simples
  ], 
  exports: [
    NewInvoiceComponent,
    SearchInvoiceComponent,
    NewInvoiceItemComponent,
    InvoiceDisplayComponent,
    InvoiceListComponent
  ]
})
export class InvoicesModule { }
