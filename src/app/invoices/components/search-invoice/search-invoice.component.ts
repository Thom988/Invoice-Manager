import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Invoice } from "src/app/core/models/invoice.model";
import { DateService } from "src/app/core/services/date.service";
import { InvoicesService } from "src/app/core/services/invoices.service";
import { debounceTime } from 'rxjs'
import { ClientsService } from "src/app/core/services/clients.service";

@Component({
  selector: "app-search-invoice",
  templateUrl: "./search-invoice.component.html",
  styleUrls: ["./search-invoice.component.scss"],
})
export class SearchInvoiceComponent implements OnInit {
  invoices!: Invoice[];
  isDatesVisible: boolean = false;
  isInputNameFocused: boolean = false;
  filteredClientsName!: string[];
  invoiceForm!: FormGroup;

  constructor(
    private invoiceService: InvoicesService,
    private clientsService: ClientsService,
    private dateService: DateService, 
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.invoiceForm = this.formBuilder.group( {
       invNumber : [""],
       clientName : [""], 
       minDate: [""],
       maxDate: [""]
    });
    this.invoiceForm.get("clientName")?.valueChanges.pipe(
      debounceTime(200)
    ).subscribe( (clientName) => {
      if (clientName.length < 1) {
        this.filteredClientsName = [];
      } else {
        this.filteredClientsName = this.clientsService.clients.filter((client) => client.nom.toLowerCase().includes(clientName.toLowerCase())).map((client) => client.nom);
      }
    })

  }

  onInvoicestSearchFormSubmit() {
    const dtMin: Date = this.dateService.toDateFormat(this.invoiceForm.get("minDate")?.value);
    const dtMax: Date = this.dateService.toDateFormat(this.invoiceForm.get("maxDate")?.value);
    this.invoices = this.invoiceService.searchInvoices(
      this.isDatesVisible,
      this.invoiceForm.get("invNumber")?.value,
      this.invoiceForm.get("clientName")?.value,
      dtMin,
      dtMax
    );
  }

  onCheckboxDate() {
    const currentDate: Date = new Date();
    this.isDatesVisible = !this.isDatesVisible;
    this.invoiceForm.get("minDate")?.setValue(this.dateService.calculateFirstDayOfCurrentMonth(currentDate).toISOString().substring(0, 10));
    this.invoiceForm.get("maxDate")?.setValue(this.dateService.calculateLastDayOfCurrentMonth(currentDate).toISOString().substring(0, 10));
  }

  onClientSelect(clientName: string) {
    this.invoiceForm.get("clientName")?.setValue(clientName);
    this.isInputNameFocused = false;
  }

  onInputFocus() {
    this.isInputNameFocused = true;
  }
}
