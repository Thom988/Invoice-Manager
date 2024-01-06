import { Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InvoiceItem } from "src/app/core/models/invoice-item.model";
import { InvoicesService } from "src/app/core/services/invoices.service";
import { NewInvoiceItemComponent } from "../new-invoice-item/new-invoice-item.component";
import { DateService } from "src/app/core/services/date.service";

@Component({
  selector: "app-new-invoice",
  templateUrl: "./new-invoice.component.html",
  styleUrls: ["./new-invoice.component.scss"],
})
export class NewInvoiceComponent implements OnInit {
  clientForm!: FormGroup;
  detailsForm!: FormGroup;
  invoiceItems!: InvoiceItem[];
  @ViewChildren(NewInvoiceItemComponent)
  viewChildren!: QueryList<NewInvoiceItemComponent>;
  @Output() toggleParentVariableEvent = new EventEmitter<void>();
  emailRegexp!: string;
  cpRegexp!: string;
  telRegexp!: string;
  siretRegexp!: string;

  constructor(
    private invoiceService: InvoicesService,
    private formBuilder: FormBuilder,
    private dateService: DateService  ) {}

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
    this.emailRegexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]+$" ;
    this.cpRegexp = "[0-9]{5}";
    this.telRegexp = "^0[1-9][0-9]{8}";
    this.siretRegexp = "^\\d{9}[\\d]{5}$";
    this.clientForm = this.formBuilder.group({
      nomClient: [null, [Validators.required]],
      emailClient: [null, Validators.pattern(this.emailRegexp)],
      adresseClient: [null, Validators.required],
      cpClient: [null, [Validators.required, Validators.pattern(this.cpRegexp)]],
      villeClient: [null, Validators.required],
      paysClient: [null, Validators.required],
      telClient: [null, Validators.pattern(this.telRegexp)],
      siren_siretClient: [null, [Validators.required, Validators.pattern(this.siretRegexp)]],
    }/*, {updateOn: 'blur'}*/); // updateOn est une propriété passée en argument de la méthode group et permet de gérer la "vitesse d'ecoute" du formulaire (blur = a chaque fois que l'on sort d'un champ)
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
    console.log(item.prix);
  }

  triggerToggleParentVariable() {
    this.toggleParentVariableEvent.emit();
  }

  onInvoiceFormSubmit(): void {
    this.viewChildren.forEach(
      (invoiceItemComponent: NewInvoiceItemComponent) => {
        invoiceItemComponent.onItemFormSubmit();
      }
    );
    this.invoiceService.addNewInvoice(
      this.clientForm.value,
      this.detailsForm.value,
      this.invoiceItems
    );
    this.triggerToggleParentVariable(); // modifie le booléen du composant parent pour revenir sur la page "searchInvoice"
  }

  isInputInvalid(fieldName: string): boolean | undefined {
    const clientControl = this.clientForm.get(fieldName);
    return clientControl?.invalid;
  }

  isRequieredInputInvalid(fieldName: string): boolean | undefined {
    const clientControl = this.clientForm.get(fieldName);
    return clientControl?.invalid && clientControl.touched;
  }
}
