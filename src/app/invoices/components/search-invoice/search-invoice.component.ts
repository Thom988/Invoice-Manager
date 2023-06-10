import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/core/models/invoice.model';
import { InvoicesService } from 'src/app/core/services/invoices.service';

@Component({
  selector: 'app-search-invoice',
  templateUrl: './search-invoice.component.html',
  styleUrls: ['./search-invoice.component.scss'],
})
export class SearchInvoiceComponent implements OnInit {
  invoices!: Invoice[];
  invoiceNumber: string = '';
  clientName: string = '';
  issueDateMin: Date | null = null;
  issueDateMax: Date | null = null;
  isDatesVisible: boolean = false;

  constructor(private invoiceService: InvoicesService) {}

  ngOnInit(): void {}

  onSubmitForm() {
    this.invoices = this.invoiceService.searchInvoices(this.isDatesVisible,this.invoiceNumber, this.clientName, this.issueDateMin, this.issueDateMax);
  }

  onCheckboxDate() {
    this.isDatesVisible = !this.isDatesVisible;
    this.issueDateMin = null;
    this.issueDateMax = null;
    this.invoiceNumber = '';
  }
}
