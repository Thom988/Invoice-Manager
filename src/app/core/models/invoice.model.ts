import { Client } from "./client.model";
import { InvoiceItem } from "./invoice-item.model";

export class Invoice {
    id!: number;
    numero!: string;
    idClient!: number;
    invoiceItems!: InvoiceItem[];
    dateEmission!: Date;
    dateEcheance!: Date;
    totalHT!: number;
    total!: number;
    

    constructor() {
        this.id = 0;
        this.numero = '';
        this.idClient = 0;
        this.invoiceItems = [new InvoiceItem(1)];
        this.dateEmission = new Date();
        this.dateEcheance = new Date();
        this.totalHT = 0;
        this.total = 0;
    }
} 
