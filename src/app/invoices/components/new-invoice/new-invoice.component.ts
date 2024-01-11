import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { InvoiceItem } from "src/app/core/models/invoice-item.model";
import { InvoicesService } from "src/app/core/services/invoices.service";
import { NewInvoiceItemComponent } from "../new-invoice-item/new-invoice-item.component";
import { DateService } from "src/app/core/services/date.service";
import { Invoice } from "src/app/core/models/invoice.model";
import { Router } from "@angular/router";
import { Client } from "src/app/core/models/client.model";
import { debounceTime } from "rxjs";
import { ClientsService } from "src/app/core/services/clients.service";

@Component({
  selector: "app-new-invoice",
  templateUrl: "./new-invoice.component.html",
  styleUrls: ["./new-invoice.component.scss"],
})
export class NewInvoiceComponent implements OnInit {
  invoice!: Invoice;
  client: Client = new Client();
  filteredClients!: Client[];
  clientNameSearchControl!: FormControl;
  isClientFormDisplayed: boolean = false;
  isInputFocused: boolean = false;
  isClientChosen: boolean = false;
  clientForm!: FormGroup;
  detailsForm!: FormGroup;
  invoiceItems!: InvoiceItem[];
  @ViewChildren(NewInvoiceItemComponent)
  viewChildren!: QueryList<NewInvoiceItemComponent>;
  emailRegexp!: string;
  cpRegexp!: string;
  telRegexp!: string;
  siretRegexp!: string;

  constructor(
    private invoiceService: InvoicesService,
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private router: Router,
    private clientsService: ClientsService
  ) {}

  ngOnInit(): void {
    const dtEmission: Date = new Date();
    this.invoiceItems = [new InvoiceItem(1)];
    this.detailsForm = this.formBuilder.group({
      dateEmission: [dtEmission.toISOString().substring(0, 10)],
      dateEcheance: [
        this.dateService
          .calculateNextMonth(dtEmission)
          .toISOString()
          .substring(0, 10),
      ],
    });
    this.emailRegexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]+$";
    this.cpRegexp = "[0-9]{5}";
    this.telRegexp = "^0[1-9][0-9]{8}";
    this.siretRegexp = "^\\d{9}[\\d]{5}$";
    this.clientForm = this.formBuilder.group(
      {
        nomClient: [null, [Validators.required]],
        emailClient: [null, Validators.pattern(this.emailRegexp)],
        adresseClient: [null, Validators.required],
        cpClient: [
          null,
          [Validators.required, Validators.pattern(this.cpRegexp)],
        ],
        villeClient: [null, Validators.required],
        paysClient: [null, Validators.required],
        telClient: [null, Validators.pattern(this.telRegexp)],
        siren_siretClient: [
          null,
          [Validators.required, Validators.pattern(this.siretRegexp)],
        ],
      } /*, {updateOn: 'blur'}*/
    ); // updateOn est une propriété passée en argument de la méthode group et permet de gérer la "vitesse d'ecoute" du formulaire (blur = a chaque fois que l'on sort d'un champ)
    this.clientNameSearchControl = new FormControl("");
    this.clientNameSearchControl.valueChanges
      .pipe(
        debounceTime(150) // comme anti-rebond en electronique, permet de ne pas envoyer de requête à chaque entré utilisateur.
      )
      .subscribe((nomClient) => {
        this.isClientChosen = !this.clientsService.getClientByName(nomClient) ? false : this.isClientChosen ;
        if (nomClient.length < 1) {
          this.filteredClients = [];
        } else if (!this.isClientChosen) {
          this.filteredClients = this.clientsService.clients.filter((client) =>
            client.nom.toLowerCase().includes(nomClient.toLowerCase())
          );
        }
      });
  }

  onAddItem(): void {
    this.invoiceItems.push(new InvoiceItem(this.invoiceItems.length + 1));
  }

  onDeleteItemForm(itemId: number) {
    this.invoiceItems.splice(itemId - 1, 1);
    this.invoiceItems.forEach((item) =>
      item.id > itemId - 1 ? item.id-- : item.id
    );
  }

  saveItemData(item: InvoiceItem) {
    this.invoiceItems[item.id - 1] = item;
  }

  onNewClient() {
    this.isClientFormDisplayed = true;
    this.clientNameSearchControl.setValue("");
    this.clientNameSearchControl.disable();
    this.clientForm.enable();
  }

  onInvoiceFormSubmit(): void {
    this.viewChildren.forEach(
      (invoiceItemComponent: NewInvoiceItemComponent) => {
        invoiceItemComponent.onItemFormSubmit();
      }
    );
    if (this.isClientFormDisplayed) {
    }
    this.invoice = {
      id: this.invoiceService.getInvoicesMaxId() + 1,
      numero: this.invoiceService.getNewInvoiceNumber(),
      idClient: this.client.id,
      invoiceItems: this.invoiceItems,
      dateEmission: this.dateService.toDateFormat(
        this.detailsForm.get("dateEmission")?.value
      ),
      dateEcheance: this.dateService.toDateFormat(
        this.detailsForm.get("dateEcheance")?.value
      ),
      totalHT: this.invoiceItems
        .map((invItems) => invItems.total - invItems.mntTVA)
        .reduce((acc, numb) => acc + numb, 0),
      total: this.invoiceItems
        .map((invItems) => invItems.total)
        .reduce((acc, numb) => acc + numb, 0),
    };
    this.invoiceService.addNewInvoice(this.invoice);
    this.router.navigateByUrl("invoices");
  }

  isInputInvalid(fieldName: string): boolean | undefined {
    const clientControl = this.clientForm.get(fieldName);
    return clientControl?.invalid;
  }

  isRequieredInputInvalid(fieldName: string): boolean | undefined {
    const clientControl = this.clientForm.get(fieldName);
    return clientControl?.invalid && clientControl.touched;
  }

  onSelectClient(client: Client) {
    this.isClientChosen = true;
    this.clientNameSearchControl.setValue(client.nom);
    this.client = { ...client };
    this.isInputFocused = false;
  }

  // permet d'afficher la liste autocompletée au focus du champ
  onInputFocus() {
    this.isInputFocused = true;
  }

  onNewClientCanceled() {
    this.isClientFormDisplayed = false;
    this.clientForm.reset();
    this.clientForm.disable();
    this.clientNameSearchControl.enable();
  }

  onClientFormSubmit() {
    this.client.nom = this.clientForm.get("nomClient")?.value;
    this.client.email = this.clientForm.get("emailClient")?.value;
    this.client.adresse = this.clientForm.get("adresseClient")?.value;
    this.client.codePostal = this.clientForm.get("cpClient")?.value;
    this.client.ville = this.clientForm.get("villeClient")?.value;
    this.client.pays = this.clientForm.get("paysClient")?.value;
    this.client.tel = this.clientForm.get("telClient")?.value;
    this.client.siren_siret = this.clientForm.get("siren_siretClient")?.value;
    this.client.invoicesId = [];
    this.clientsService.addNewClient(this.client);
    this.isClientFormDisplayed = false;
    this.clientNameSearchControl.setValue(this.client.nom);
    this.clientNameSearchControl.enable();
  }
}
