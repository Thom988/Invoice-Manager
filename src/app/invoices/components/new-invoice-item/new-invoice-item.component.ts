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
      tauxTVA: new FormControl(this.item.TVA)
    });
    this.itemForm.valueChanges.subscribe((formValue) => {
      this.calculateAmount(formValue);
    });
  }

  calculateAmount(itemFormValue: {
    nom: string;
    quantite: number;
    prix: number;
    tauxTVA: number;
  }): void {
    this.item.mntTVA =
      itemFormValue.tauxTVA !== 0
        ? (itemFormValue.prix *
            itemFormValue.quantite *
            itemFormValue.tauxTVA) /
          100
        : 0;
    this.item.total =
      itemFormValue.prix * itemFormValue.quantite + this.item.mntTVA;
  }

  onItemFormSubmit() {
    const updatedItem: InvoiceItem = {
      ...this.itemForm.value, 
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
