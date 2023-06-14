import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InvoiceItem } from 'src/app/core/models/invoice-item.model';

@Component({
  selector: 'app-new-invoice-item',
  templateUrl: './new-invoice-item.component.html',
  styleUrls: ['./new-invoice-item.component.scss']
})
export class NewInvoiceItemComponent implements OnInit {
@Input() item!: InvoiceItem;
@Output() itemSaveEvent = new EventEmitter<FormGroup>;
@Output() itemDeleteEvent = new EventEmitter<number>;
itemForm!: FormGroup;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      nom: [null],
      quantite: [null],
      prix: [null],
      TVA: [true],
      mntTVA: [null],
      total: [null]
    });
  }

  onItemFormSubmit() {
    this.itemSaveEvent.emit(this.itemForm);
  }

  onDeleteItem()  {
    this.itemDeleteEvent.emit(this.item.id);
  }

}
