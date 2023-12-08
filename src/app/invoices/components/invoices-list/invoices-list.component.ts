import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from 'src/app/core/models/invoice.model';
import { InvoicesService } from 'src/app/core/services/invoices.service';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.scss']
})
export class InvoicesListComponent implements OnInit {

  @Input() invoicesList!: Invoice[];
  
  constructor(private invoiceService: InvoicesService) { }

  ngOnInit(): void {
  }

}
