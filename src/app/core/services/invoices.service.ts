import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { InvoiceItem } from '../models/invoice-item.model';
import { Invoice } from '../models/invoice.model';

@Injectable({ providedIn: 'root' })
export class InvoicesService {
  constructor() {}

  invoices: Invoice[] = [];

  addNewInvoice(
    client: Client,
    detailsForm: {
      dateEmission: Date;
      dateEcheance: Date;
      totalHT: number;
      totalMntTVA: number;
    },
    invoiceItems: InvoiceItem[]
  ): void {
    const numRM = 'FR0044347940244';
    let invoice: Invoice = new Invoice()
    invoice = {
      numero: this.getNewInvoiceNumber(),
      numRM : numRM,
      client: client,
      dateEmission: detailsForm.dateEmission,
      dateEcheance: detailsForm.dateEcheance,
      totalHT: detailsForm.totalHT,
      totalMntTVA: detailsForm.totalMntTVA,
      invoiceItems: invoiceItems,
      id: this.getNewInvoiceId()
    };
    this.invoices.push(invoice);
    console.log(this.invoices);
  }

  getAllInvoices(): Invoice[] {
    return this.invoices;
  }

  getInvoiceById(id: number): Invoice | null {
    const invoice = this.invoices.find((i) => i.id === id);
    return invoice || null;
  }

  getNewInvoiceId(): number{
    let invoiceId = this.invoices.length + 1;
    return (invoiceId)
  }

  getNewInvoiceNumber(): string {
    const currentDate = this.getFormatedCurrentDate();
    let monthInvoices = this.invoices.filter(inv => inv.numero.substring(0,7) === currentDate); 
    let nextMonthId = monthInvoices.length + 1;
    let invNumber: string = '000' + nextMonthId;
    invNumber = invNumber.substring(-4);
    return(`${currentDate}-${invNumber}`);
  }

  getFormatedCurrentDate(): string {
    let currentDate = new Date();
    let year = currentDate.getFullYear().toString();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    return(year + month);
  }

}
