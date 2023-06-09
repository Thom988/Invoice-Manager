export class InvoiceItem {
    
    nom!: string;
    quantite!: number;
    prix!: number;
    TVA!: number;
    mntTVA!: number;
    total!: number;
    id!: number;

    constructor(id: number) {
        this.nom = '';
        this.quantite = 0;
        this.prix = 0;
        this.TVA = 0;
        this.mntTVA = 0;
        this.total = 0;
        this.id = id;
    }
}