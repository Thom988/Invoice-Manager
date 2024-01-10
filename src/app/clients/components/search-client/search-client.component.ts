import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, debounceTime, filter, map, of, startWith } from "rxjs";
import { Client } from "src/app/core/models/client.model";
import { ClientsService } from "src/app/core/services/clients.service";

@Component({
  selector: "app-search-client",
  templateUrl: "./search-client.component.html",
  styleUrls: ["./search-client.component.scss"],
})
export class SearchClientComponent implements OnInit {
  emailRegexp!: string;
  telRegexp!: string;
  siretRegexp!: string;
  clientSearchForm!: FormGroup;
  filteredClientsName!: string[];
  isInputFocused: boolean = false;
  client!: Client | undefined;

  constructor(
    private clientsService: ClientsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.emailRegexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]+$";
    this.telRegexp = "^0[1-9][0-9]{8}";
    this.siretRegexp = "^\\d{9}[\\d]{5}$";
    this.clientSearchForm = this.formBuilder.group({
      nomClient: [null],
      emailClient: [null, Validators.pattern(this.emailRegexp)],
      telClient: [null, Validators.pattern(this.telRegexp)],
      siretClient: [null, Validators.pattern(this.siretRegexp)],
    });
    this.clientSearchForm.get("nomClient")?.valueChanges.pipe(
      debounceTime(200) // comme anti-rebond en electronique, permet de ne pas envoyer de requête à chaque entré utilisateur.
    ).subscribe((nomClient) => {
      if (nomClient.length < 1) {
        this.filteredClientsName = [];
      } else {
        this.filteredClientsName = this.clientsService.clients.filter((client) => client.nom.toLowerCase().includes(nomClient.toLowerCase())).map((client) => client.nom);
      }
    });
  }

  //declenche la class invalid-field, si le champ ne respecte pas le Validator, la class est appliquée (voir .html)
  isInputInvalid(fieldName: string): boolean | undefined {
    const clientControl = this.clientSearchForm.get(fieldName);
    return clientControl?.invalid;
  }

  // applique, sur le champ input, le client selectionné dans la liste autocompletée
  selectClient(clientName: string) {
     this.clientSearchForm.get('nomClient')?.setValue(clientName);
     this.isInputFocused = false;
  }

  // permet d'afficher la liste autocompletée au focus du champ
  onInputFocus() {
      this.isInputFocused = true;
  }

  // onInputBlur() {
  //   const nom: string = this.clientSearchForm.get('nomClient')?.value;
  //   if (this.clientsService.getClientByName(nom) === null) {
  //     this.isInputFocused = false;
  //   }
  // }

  //lors du clique sur le bouton de soumission du formulaire
  onClientSearchFormSubmit() {
    const nom: string = this.clientSearchForm.get('nomClient')?.value;
    const email: string = this.clientSearchForm.get('emailClient')?.value;
    const client = this.clientsService.getClientFromSearch(nom, email);
    if ( client != undefined) {
      this.client = client;
    } else {
      this.client = undefined;
    }
  } 


}
