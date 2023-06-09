import { Client } from "./client.model";
import { InvoiceItem } from "./invoice-item.model";

export class Invoice {
    numero!: string;
    numRM!: string;
    client!: Client;
    dateEmission!: Date;
    dateEcheance!: Date;
    totalHT!: number;
    totalMntTVA!: number;
    invoiceItems!: InvoiceItem[];
    id!: number;

    constructor() {
        this.numero = '';
        this.numRM = '';
        this.client = new Client();
        this.dateEmission = new Date();
        this.dateEcheance = new Date();
        this.totalHT = 0;
        this.totalMntTVA = 0;
        this.invoiceItems = [new InvoiceItem(1)];

    }
} 
