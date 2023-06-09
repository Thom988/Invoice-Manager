import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InvoiceItem } from 'src/app/core/models/invoice-item.model';
import { InvoicesService } from 'src/app/core/services/invoices.service';
import { NewInvoiceItemComponent } from '../new-invoice-item/new-invoice-item.component';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss'],
})
export class NewInvoiceComponent implements OnInit {

  clientForm!: FormGroup;
  detailsForm!: FormGroup;
  invoiceItems: InvoiceItem[] = [new InvoiceItem(1)];
  @ViewChildren(NewInvoiceItemComponent) viewChildren!:QueryList<NewInvoiceItemComponent>;
  

  constructor(private invoiceService: InvoicesService,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.detailsForm = this.formBuilder.group({
      dateEmission: [null],
      dateEcheance: [null],
      totalHT: [null],
      totalMntTVA: [null]
    });
    this.clientForm = this.formBuilder.group({
      nomClient: [null],
      emailClient: [null],
      adresseClient: [null],
      cpClient: [null],
      villeClient: [null],
      paysClient: [null],
      siren_siretClient: [null]
    })
  }

  onAddItem(): void {
    this.invoiceItems.push(new InvoiceItem(this.invoiceItems.length + 1));
  }

  onDeleteItemForm(index: number){
    this.invoiceItems.splice(index - 1,1);
    this.invoiceItems.filter(i => i.id > index).map(i => i.id = i.id-1);
  }

  saveItemData(itemForm: FormGroup, index: number) {
    this.invoiceItems[index] = ({
      ...itemForm.value,
      id: index + 1
    });
  }

  onInvoiceFormSubmit(): void {
    this.viewChildren.forEach((childComponent: NewInvoiceItemComponent) => {
      childComponent.onItemFormSubmit();
    });
    this.invoiceService.addNewInvoice(this.clientForm.value,this.detailsForm.value, this.invoiceItems);
  }
}


