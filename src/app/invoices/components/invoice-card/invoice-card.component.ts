import { Component, Input, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Client } from 'src/app/core/models/client.model';
import { Invoice } from 'src/app/core/models/invoice.model';
import { ClientsService } from 'src/app/core/services/clients.service';

@Component({
  selector: 'app-invoice-card',
  templateUrl: './invoice-card.component.html',
  styleUrls: ['./invoice-card.component.scss']
})
export class InvoiceCardComponent implements OnInit {
  @Input() invoice!: Invoice;
  client!: Client | undefined;
  
  constructor(private router: Router,
    private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.client = this.clientsService.getClientById(this.invoice.idClient)
  }

  onInvoiceDisplay() {
  const invoiceId = this.invoice.id;
   this.router.navigateByUrl(`invoices/display/${invoiceId}`);
  }
}
