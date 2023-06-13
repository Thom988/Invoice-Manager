import { Injectable } from '@angular/core';
import { InvoiceItem } from '../models/invoice-item.model';
import { Invoice } from '../models/invoice.model';

@Injectable({ providedIn: 'root' })
export class InvoicesService {
  constructor() {}

  invoices: Invoice[] = [];

  addNewInvoice(
    clientForm: {
      nomClient: string;
      emailClient: string;
      adresseClient: string;
      cpClient: number;
      villeClient: string;
      paysClient: string;
      telClient: string;
      siren_siretClient: string;
    },
    detailsForm: {
      dateEmission: Date;
      dateEcheance: Date;
      totalHT: number;
      totalMntTVA: number;
    },
    invoiceItems: InvoiceItem[]
  ): void {
    const numRM = 'FR0044347940244';
    let invoice: Invoice = new Invoice();
    invoice = {
      numero: this.getNewInvoiceNumber(),
      numRM: numRM,
      client: {
        nom: clientForm.nomClient,
        email: clientForm.emailClient,
        adresse: clientForm.adresseClient,
        codePostal: clientForm.cpClient,
        ville: clientForm.villeClient,
        pays: clientForm.paysClient,
        tel: clientForm.telClient,
        siren_siret: clientForm.siren_siretClient,
      },
      invoiceItems: invoiceItems,
      dateEmission: detailsForm.dateEmission,
      dateEcheance: detailsForm.dateEcheance,
      totalHT: detailsForm.totalHT,
      totalMntTVA: detailsForm.totalMntTVA,
      id: this.getNewInvoiceId(),
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

  getNewInvoiceId(): number {
    let invoiceId = this.invoices.length + 1;
    return invoiceId;
  }

  getNewInvoiceNumber(): string {
    let currentDate: string = this.getFormatedCurrentDate();
    let monthInvoices: Invoice[] = this.invoices.filter(
      (inv) => inv.numero.substring(0, 6) === currentDate
    );
    let nextMonthId: number = monthInvoices.length + 1;
    let invNumber: string = '00' + nextMonthId;
    invNumber = invNumber.slice(-3);
    return currentDate + '-' + invNumber;
  }

  getFormatedCurrentDate(): string {
    let currentDate = new Date();
    let year = currentDate.getFullYear().toString();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    return year + month;
  }

  searchInvoices(
    isDatesVisible: boolean,
    invoiceNumber: string,
    clientName: string,
    issueDateMin: Date | null,
    issueDateMax: Date | null
  ): Invoice[] {
    let sortedInvoices: Invoice[];
    if (!isDatesVisible) {
      if (invoiceNumber === '' && clientName != '') {
        sortedInvoices = this.invoices.filter(
          (inv) => inv.client.nom.toUpperCase === clientName.toUpperCase
        );
      } else if (invoiceNumber != '' && clientName === '') {
        sortedInvoices = this.invoices.filter(
          (inv) => inv.numero === invoiceNumber
        );
      } else if (invoiceNumber != '' && clientName != '') {
        sortedInvoices = this.invoices.filter(
          (inv) => inv.numero === invoiceNumber && inv.client.nom === clientName
        );
      } else {
        sortedInvoices = [];
      }
    } else {
      if (clientName === '') {
        sortedInvoices = this.invoices.filter(
          (inv) =>
            issueDateMin != null &&
            issueDateMax != null &&
            inv.dateEmission >= issueDateMin &&
            inv.dateEmission <= issueDateMax
        );
      } else if (clientName != '') {
        sortedInvoices = this.invoices.filter(
          (inv) =>
            issueDateMin != null &&
            issueDateMax != null &&
            inv.dateEmission >= issueDateMin &&
            inv.dateEmission <= issueDateMax &&
            inv.client.nom === clientName
        );
      } else {
        sortedInvoices = [];
      }
    }
    return sortedInvoices;
  }
}
