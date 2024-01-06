import { Injectable } from "@angular/core";
import { Client } from "../models/client.model";

@Injectable({
  providedIn: "root",
})
export class ClientsService {
  constructor() {}

  clients: Client[] = [
    {
      nom: "Thomas Dupond",
      email: "tdupond@lagoon.fr",
      adresse: "13 chemin des Dupond",
      codePostal: 98846,
      ville: "Avignon",
      pays: "France",
      tel: "0700540054",
      siren_siret: "12322325500054",
    },
    {
      nom: "Thomas Quilloux",
      email: "tquilloux@lagoon.fr",
      adresse: "13 chemin des Quilloux",
      codePostal: 30400,
      ville: "Bordeaux",
      pays: "France",
      tel: "0763057817",
      siren_siret: "12322325566654",
    },
  ];

  isClient(client: Client): boolean {
    let bool!: boolean;
    this.clients.forEach((c) =>
      c.nom === client.nom ? (bool = true) : (bool = false)
    );
    return bool;
  }

  addNewClient(client: Client): void {
    this.clients.push(client);
    console.log(this.clients);
  }

  getClientByName(nom: string): Client | null {
    const client = this.clients.find((c) => c.nom === nom);
    return client || null;
  }

  getClientFromSearch(
    nom?: string,
    email?: string,
  ): Client | undefined {
    let client: Client | undefined;
    if (nom !== null && email === null  ) {
     client = this.clients.find( client => client.nom === nom)
    } else if ( nom === null && email !== null ) {
      client = this.clients.find( client => client.email === email)
    } else {
      client = this.clients.find( client => client.email === email && client.nom === nom )
    }
    return client;
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
