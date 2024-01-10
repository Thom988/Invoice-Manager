import { Injectable } from "@angular/core";
import { Client } from "../models/client.model";
import { Invoice } from "../models/invoice.model";

@Injectable({
  providedIn: "root",
})
export class ClientsService {
  constructor() {}

  clients: Client[] = [
    {
      id: 1,
      nom: "Thomas Dupond",
      email: "tdupond@lagoon.fr",
      adresse: "13 chemin des Dupond",
      codePostal: 98846,
      ville: "Avignon",
      pays: "France",
      tel: "0700540054",
      siren_siret: "12322325500054",
      invoicesId: [1,2],
    }, 
    {
      id: 2,
      nom: "Thomas Quilloux",
      email: "tquilloux@lagoon.fr",
      adresse: "13 chemin des Quilloux",
      codePostal: 30400,
      ville: "Bordeaux",
      pays: "France",
      tel: "0763057817",
      siren_siret: "12322325566654",
      invoicesId: [],
    }
  ];

  isClient(client: Client): boolean {
    let bool!: boolean;
    this.clients.forEach((c) =>
      c.nom === client.nom ? (bool = true) : (bool = false)
    );
    return bool;
  }

  addNewClient(client: Client): boolean {

    client.id = this.clients.reduce((acc, currentVal) => acc.id > currentVal.id ? acc : currentVal).id + 1; // recupere l'id max du tableau clients et ajoute 1
    if (!this.isClient(client)) {
      this.clients.push(client);
      return true;
    } else {
      return false;
    }
  }

  addInvoiceToClient(invoice: Invoice) {
    this.clients.find(c => c.id === invoice.idClient )?.invoicesId.push(invoice.id);
  }

  // Faut il retourner null ou undefined pour les methodes comme celles ci ?? : 

  getClientByName(nom: string): Client | undefined {
    const client = this.clients.find((c) => c.nom === nom);
    return client;
  }

  getClientById(id: number): Client | undefined {
    return this.clients.find( client => client.id === id);
  }

  getClientFromSearch(
    nom?: string,
    email?: string,
  ): Client | undefined {
    let client: Client | undefined;
    if ((nom !== null || nom !== "") && (email === null || email === "") ) {
     client = this.clients.find( client => client.nom === nom)
    } else if ( (nom === null || nom === "") && (email !== null || email !== "" ) ) {
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
