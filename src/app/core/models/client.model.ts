import { Invoice } from "./invoice.model";

export class Client {
    nom!: string;
    email!: string;
    adresse!: string;
    codePostal!: number;
    ville!: string;
    pays!: string;
    siren_siret!: number;
    invoices!: Invoice[];

    constructor() {
        this.nom = '';
        this.email = '';
        this.adresse = '';
        this.codePostal = 0;
        this.ville = '';
        this.pays = '';
        this.siren_siret = 0;
        this.invoices = [];
    }
}