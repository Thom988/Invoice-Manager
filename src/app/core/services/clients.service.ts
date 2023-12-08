import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor() { }

  clients: Client[] = [
    ({
    nom: 'Thomas Quillet',
    email: 't.quillet@hotmail.fr',
    adresse: '3 chemin des Poilus',
    codePostal: 30400,
    ville: 'Villeneuve-les-Avignon',
    pays: 'France',
    tel: '0763007916',
    siren_siret: ''
    })
  ];

  isClient(client: Client): boolean {
    let bool!: boolean;
    this.clients.forEach(c => c.nom === client.nom ? bool = true : bool = false );
    return bool;
  }

  addNewClient(client: Client): void {
    this.clients.push(client);
  }
  
  getClientByName(nom: string): Client | null {
    const client = this.clients.find((c) => c.nom === nom);
    return client || null;
  }

  /*

  getClientInvoicesByName(nom: string): Invoice[] | null {
    const client = this.getClientByName(nom);
    if (client) {
      return client.invoices;
    }
    return null;
  }

  addClientInvoice(invoice: Invoice,clienrName: string): void {
    const client = this.clients.find(c => c.nom === clienrName);
    client ? client.invoices.push(invoice) : null;
  }

*/

}
