import { Client } from "./client.model";
import { InvoiceItem } from "./invoice-item.model";

export class Invoice {
    numero!: string;
    numRM!: string;
    client!: Client;
    invoiceItems!: InvoiceItem[];
    dateEmission!: Date;
    dateEcheance!: Date;
    totalHT!: number;
    total!: number;
    id!: number;

    constructor() {
        this.numero = '';
        this.numRM = '';
        this.client = new Client();
        this.invoiceItems = [new InvoiceItem(1)];
        this.dateEmission = new Date();
        this.dateEcheance = new Date();
        this.totalHT = 0;
        this.total = 0;

    }
} 
