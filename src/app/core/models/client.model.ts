import { Invoice } from "./invoice.model";

export class Client {
    nom!: string;
    email!: string;
    adresse!: string;
    codePostal!: number;
    ville!: string;
    pays!: string;
    tel!: string;
    siren_siret!: string;
    //invoices!: Invoice[];

    constructor() {
        this.nom = '';
        this.email = '';
        this.adresse = '';
        this.codePostal = 0;
        this.ville = '';
        this.pays = '';
        this.tel= '';
        this.siren_siret = '';
        //this.invoices = [];
    }
}