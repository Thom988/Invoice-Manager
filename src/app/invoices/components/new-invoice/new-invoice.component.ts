import { Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InvoiceItem } from "src/app/core/models/invoice-item.model";
import { InvoicesService } from "src/app/core/services/invoices.service";
import { NewInvoiceItemComponent } from "../new-invoice-item/new-invoice-item.component";
import { DateService } from "src/app/core/services/date.service";
import { Router } from "@angular/router";

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
    this.clientForm = this.formBuilder.group({
      nomClient: [null, [Validators.required]],
      emailClient: [null],
      adresseClient: [null, [Validators.required]],
      cpClient: [null, [Validators.required]],
      villeClient: [null, [Validators.required]],
      paysClient: [null, [Validators.required]],
      telClient: [null],
      siren_siretClient: [null, [Validators.required]],
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
}
