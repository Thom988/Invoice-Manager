import { Injectable } from "@angular/core";
import { InvoiceItem } from "../models/invoice-item.model";
import { Invoice } from "../models/invoice.model";
import { DateService } from "./date.service";
import { ClientsService } from "./clients.service";
import { Client } from "../models/client.model";

@Injectable({ providedIn: "root" })

export class InvoicesService {

  constructor(private dateService: DateService,
    private clientsService: ClientsService) {}
  
  invoicesSearchList: Invoice[] = [];
  invoices: Invoice[] = [
    { 
      id: 1,
      numero: "202310-001",
      idClient: 1,
      invoiceItems: [
        {
          nom: "changement robinet",
          quantite: 1,
          prix: 100,
          tva: 20,
          mntTVA: 20,
          total: 120,
          id: 1,
        },
      ],
      dateEmission: new Date(2023, 9, 30),
      dateEcheance: new Date(2023, 10, 30),
      totalHT: 100,
      total: 120,
    },
    {
      id: 2,
      numero: "202310-002",
      idClient: 1,
      invoiceItems: [
        {
          nom: "changement bac douche",
          quantite: 1,
          prix: 2000,
          tva: 20,
          mntTVA: 400,
          total: 2400,
          id: 1,
        },
      ],
      dateEmission: new Date(2023, 9, 30),
      dateEcheance: new Date(2023, 10, 30),
      totalHT: 2000,
      total: 2400,
    },
  ];

  getInvoicesMaxId(): number {
    return this.invoices.reduce( (acc, currVal) => acc.id > currVal.id ? acc : currVal).id;
  }

  addNewInvoice(invoice: Invoice) {
    this.invoices.push(invoice);
    this.clientsService.addInvoiceToClient(invoice);
  }


  getAllInvoices(): Invoice[] {
    return this.invoices;
  }

  getInvoiceById(id: number): Invoice | undefined {
    let invoice = this.invoices.find((i) => i.id === id);
    return invoice;
  }


  getNewInvoiceNumber(): string {
    let currentDate: string = this.getFormatedCurrentDate();
    let monthInvoices: Invoice[] = this.invoices.filter(
      (inv) => inv.numero.substring(0, 6) === currentDate
    );
    let nextMonthId: number = monthInvoices.length + 1;
    let invNumber: string = "00" + nextMonthId;
    invNumber = invNumber.slice(-3);
    return currentDate + "-" + invNumber;
  }

  getFormatedCurrentDate(): string {
    let currentDate = new Date();
    let year = currentDate.getFullYear().toString();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    return year + month;
  }

  searchInvoices(
    isDatesVisible: boolean,
    invoiceNumber: string,
    clientName: string,
    issueDateMin: Date,
    issueDateMax: Date
  ): Invoice[] {
    let sortedInvoices: Invoice[];
    const client = this.clientsService.getClientByName(clientName);
    if (!isDatesVisible) {
      if (invoiceNumber === "" && client) {
          sortedInvoices = this.invoices.filter(
            (inv) => client.id === inv.idClient
          );
      } else if (invoiceNumber !== "" && clientName === "") {
        sortedInvoices = this.invoices.filter(
          (inv) => inv.numero === invoiceNumber
        );
      } else if (invoiceNumber !== "" && client) {
        sortedInvoices = this.invoices.filter(
          (inv) =>
            inv.numero === invoiceNumber &&
            inv.idClient === client.id
        );
      } else {
        sortedInvoices = [];
      }
    } else if (isDatesVisible) {
      if (issueDateMin && issueDateMax) {
        sortedInvoices = this.invoices.filter(
          (inv) =>
            inv.dateEmission >= issueDateMin && inv.dateEmission <= issueDateMax
        );
      } else if (!issueDateMin && issueDateMax) {
        sortedInvoices = this.invoices.filter(
          (inv) => inv.dateEmission <= issueDateMax
        );
      } else if (!issueDateMax && issueDateMin) {
        sortedInvoices = this.invoices.filter(
          (inv) => inv.dateEmission >= issueDateMin
        );
      } else {
        sortedInvoices = [];
      }
    } else {
      sortedInvoices = [];
    }
    this.invoicesSearchList = sortedInvoices;
    return this.invoicesSearchList;
  }


}
