export class InvoiceItem {
    
    nom!: string;
    quantite!: number;
    prix!: number;
    TVA!: boolean;
    mntTVA!: number;
    total!: number;
    id!: number;

    constructor(id: number) {
        this.nom = '';
        this.quantite = 0;
        this.prix = 0;
        this.TVA = true;
        this.mntTVA = 0;
        this.total = 0;
        this.id = id;
    }
}