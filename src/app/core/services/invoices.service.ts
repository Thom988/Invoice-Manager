import { Injectable } from "@angular/core";
import { invoicesRoutingModule } from "src/app/invoices/invoices-routing.module";
import { InvoiceItem } from "../models/invoice-item.model";
import { Invoice } from "../models/invoice.model";
import { DateService } from "./date.service";
@Injectable({ providedIn: "root" })
export class InvoicesService {
  constructor(private dateService: DateService) {}

  invoices: Invoice[] = [
    {
      numero: "202310-001",
      numRM: "FR07787567888",
      client: {
        nom: "QUILLET Thomas",
        email: "t.quillet@hotmail.fr",
        adresse: "3 chemin des Poilus",
        codePostal: 30400,
        ville: "Villeneuve Les Avignon",
        pays: "France",
        tel: "0763007916",
        siren_siret: "76567890",
      },
      invoiceItems: [
        {
          nom: "changement robinet",
          quantite: 1,
          prix: 100,
          TVA: 20,
          mntTVA: 20,
          total: 120,
          id: 1,
        },
      ],
      dateEmission: new Date(2023, 9, 30),
      dateEcheance: new Date(2023, 10, 30),
      totalHT: 100,
      total: 120,
      id: 1,
    },
    {
      numero: "202310-002",
      numRM: "FR07687567898",
      client: {
        nom: "QUILLET Laurent",
        email: "mlquillet@mls.nc",
        adresse: "26 rue bourgine Mont Coffyn",
        codePostal: 98846,
        ville: "Noumea",
        pays: "France",
        tel: "0763007916",
        siren_siret: "076555890",
      },
      invoiceItems: [
        {
          nom: "changement bac douche",
          quantite: 1,
          prix: 2000,
          TVA: 20,
          mntTVA: 400,
          total: 2400,
          id: 1,
        },
      ],
      dateEmission: new Date(2023, 9, 30),
      dateEcheance: new Date(2023, 10, 30),
      totalHT: 2000,
      total: 2400,
      id: 2,
    },
  ];

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
      dateEmission: string;
      dateEcheance: string;
    },
    invoiceItems: InvoiceItem[]
  ): void {
    const numRM = "FR0044347940244";
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
      dateEmission: this.dateService.toDateFormat(detailsForm.dateEmission),
      dateEcheance: this.dateService.toDateFormat(detailsForm.dateEcheance),
      totalHT: invoiceItems
        .map((invItems) => invItems.total - invItems.mntTVA)
        .reduce((acc, numb) => acc + numb, 0),
      total: invoiceItems
        .map((invItems) => invItems.total)
        .reduce((acc, numb) => acc + numb, 0),
      id: this.getNewInvoiceId(),
    };
    this.invoices.push(invoice);
    console.log(this.invoices);
  }

  getAllInvoices(): Invoice[] {
    return this.invoices;
  }

  getInvoiceById(id: number): Invoice | null {
    let invoice = this.invoices.find((i) => i.id === id);
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
    issueDateMin: Date | null,
    issueDateMax: Date | null
  ): Invoice[] {
    let sortedInvoices: Invoice[];
    if (!isDatesVisible) {
      if (invoiceNumber === "" && clientName !== "") {
        sortedInvoices = this.invoices.filter(
          (inv) => inv.client.nom.toUpperCase() === clientName.toUpperCase()
        );
      } else if (invoiceNumber !== "" && clientName === "") {
        sortedInvoices = this.invoices.filter(
          (inv) => inv.numero === invoiceNumber
        );
      } else if (invoiceNumber !== "" && clientName !== "") {
        sortedInvoices = this.invoices.filter(
          (inv) =>
            inv.numero === invoiceNumber &&
            inv.client.nom.toUpperCase() === clientName.toUpperCase()
        );
      } else {
        sortedInvoices = [];
      }
    } else if (isDatesVisible) {
      if (issueDateMin !== null && issueDateMax !== null) {
        sortedInvoices = this.invoices.filter(
          (inv) =>
            inv.dateEmission >= issueDateMin && inv.dateEmission <= issueDateMax
        );
      } else if (issueDateMin === null && issueDateMax !== null) {
        sortedInvoices = this.invoices.filter(
          (inv) => inv.dateEmission <= issueDateMax
        );
      } else if (issueDateMax === null && issueDateMin !== null) {
        sortedInvoices = this.invoices.filter(
          (inv) => inv.dateEmission >= issueDateMin
        );
      } else {
        sortedInvoices = [];
      }
    } else {
      sortedInvoices = [];
    }
    return sortedInvoices;
  }

}
