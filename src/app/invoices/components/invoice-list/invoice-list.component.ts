import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from 'src/app/core/models/invoice.model';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  @Input() invoice!: Invoice;

  constructor() { }

  ngOnInit(): void {
  }

}
