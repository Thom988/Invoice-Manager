export class InvoiceItem {
    
    nom!: string;
    quantite!: number;
    prix!: number;
    tva!: number;
    mntTVA!: number;
    total!: number;
    id!: number;

    constructor(id: number) {
        this.nom = '';
        this.quantite = 1;
        this.prix = 0;
        this.tva = 20;
        this.mntTVA = 0;
        this.total = 0;
        this.id = id;
    }
}