import { Component, Input, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Invoice } from 'src/app/core/models/invoice.model';

@Component({
  selector: 'app-invoice-card',
  templateUrl: './invoice-card.component.html',
  styleUrls: ['./invoice-card.component.scss']
})
export class InvoiceCardComponent implements OnInit {
  @Input() invoice!: Invoice;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onInvoiceDisplay() {
    const invoiceId = this.invoice.id;
   this.router.navigateByUrl(`invoices/display/${invoiceId}`);
  }
}
