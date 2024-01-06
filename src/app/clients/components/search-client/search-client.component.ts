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
  clients!: Client[];
  clientForm!: FormGroup;
  filteredClientsName!: string[];

  constructor(
    private clientsService: ClientsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.emailRegexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]+$";
    this.telRegexp = "^0[1-9][0-9]{8}";
    this.siretRegexp = "^\\d{9}[\\d]{5}$";
    this.clientForm = this.formBuilder.group({
      nomClient: [null],
      emailClient: [null, Validators.pattern(this.emailRegexp)],
      telClient: [null, Validators.pattern(this.telRegexp)],
      siretClient: [null, Validators.pattern(this.siretRegexp)],
    });
    this.clients = this.clientsService.clients;
    this.clientForm.get("nomClient")?.valueChanges.pipe(
      debounceTime(300) // comme anti-rebond en electronique, permet de ne pas envoyer de requête à chaque entré utilisateur.
    ).subscribe((nomClient) => {
      this.filteredClientsName =
        nomClient === ""
          ? [""]
          : this.clients
              .filter((client) =>
                client.nom.toLowerCase().includes(nomClient.toLowerCase())
              )
              .map((client) => client.nom);
    });
  }

  isInputInvalid(fieldName: string): boolean | undefined {
    const clientControl = this.clientForm.get(fieldName);
    return clientControl?.invalid;
  }
}
