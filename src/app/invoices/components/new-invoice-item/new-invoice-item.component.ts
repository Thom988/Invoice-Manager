import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceItem } from 'src/app/core/models/invoice-item.model';

@Component({
  selector: 'app-new-invoice-item',
  templateUrl: './new-invoice-item.component.html',
  styleUrls: ['./new-invoice-item.component.scss']
})
export class NewInvoiceItemComponent implements OnInit {
  @Input() item!: InvoiceItem;
  @Output() itemSaveEvent = new EventEmitter<InvoiceItem>();
  @Output() itemDeleteEvent = new EventEmitter<number>();
  itemForm!: FormGroup;
  PricePattern: RegExp = /\d+\.\d{2}$/;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      nom: new FormControl(this.item.nom),
      quantite: new FormControl(this.item.quantite),
      prix: new FormControl(this.item.prix),
      tva: new FormControl(this.item.tva)
    });
    this.itemForm.valueChanges.subscribe((formValue) => {
      this.calculateAmount(formValue);
    });
  }

  calculateAmount(itemFormValue: {
    nom: string;
    quantite: number;
    prix: number;
    tva: number;
  }): void {
    this.item.mntTVA =
      itemFormValue.tva !== 0
        ? (itemFormValue.prix *
            itemFormValue.quantite *
            itemFormValue.tva) /
          100
        : 0;
    this.item.total =
      itemFormValue.prix * itemFormValue.quantite + this.item.mntTVA;
  }

  onItemFormSubmit() {
    const strTVA: string = this.itemForm.get("tva")?.value;
    const nom: string = this.itemForm.get("nom")?.value;
    const prix: number = this.itemForm.get("prix")?.value;
    const quantite: number = this.itemForm.get("quantite")?.value;
    const tva: number = parseInt(strTVA,10);
    const updatedItem: InvoiceItem = {
      nom: nom,
      prix: prix,
      quantite: quantite,
      tva: tva, 
      mntTVA: this.item.mntTVA,
      total: this.item.total,
      id: this.item.id, 
    };
    this.itemSaveEvent.emit(updatedItem);
  }

  onDeleteItem(itemId: number) {
    this.itemDeleteEvent.emit(this.item.id);
  }
}
