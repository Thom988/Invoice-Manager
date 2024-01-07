import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Client } from "src/app/core/models/client.model";
import { ClientsService } from "src/app/core/services/clients.service";

@Component({
  selector: "app-new-client",
  templateUrl: "./new-client.component.html",
  styleUrls: ["./new-client.component.scss"],
})
export class NewClientComponent implements OnInit {
  client!: Client;
  clientForm!: FormGroup;
  emailRegexp!: string;
  cpRegexp!: string;
  telRegexp!: string;
  siretRegexp!: string;

  constructor(
    private formBuilder: FormBuilder,
    private clientsService: ClientsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.emailRegexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]+$";
    this.cpRegexp = "[0-9]{5}";
    this.telRegexp = "^0[1-9][0-9]{8}";
    this.siretRegexp = "^\\d{9}[\\d]{5}$";
    this.client = new Client();
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
  }

  isInputValid(fieldName: string): boolean | undefined {
    const emailControl = this.clientForm.get(fieldName);
    return emailControl?.invalid;
  }

  isRequieredInputValid(fieldName: string): boolean | undefined {
    const cpClientControl = this.clientForm.get(fieldName);
    return cpClientControl?.invalid && cpClientControl.touched;
  }

  onClientFormSubmit() {
    this.client.nom = this.clientForm.get('nomClient')?.value;
    this.client.email = this.clientForm.get('emailClient')?.value;
    this.client.adresse = this.clientForm.get('adresseClient')?.value;
    this.client.codePostal = this.clientForm.get('cpClient')?.value;
    this.client.ville = this.clientForm.get('villeClient')?.value;
    this.client.pays = this.clientForm.get('paysClient')?.value;
    this.client.tel = this.clientForm.get('telClient')?.value;
    this.client.siren_siret = this.clientForm.get('siren_siretClient')?.value;
    this.clientsService.addNewClient(this.client);
    this.router.navigateByUrl("clients");
  }
}
