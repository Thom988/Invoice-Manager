import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/core/models/invoice.model';
import { InvoicesService } from 'src/app/core/services/invoices.service';

@Component({
  selector: 'app-invoice-display',
  templateUrl: './invoice-display.component.html',
  styleUrls: ['./invoice-display.component.scss'],
})
export class InvoiceDisplayComponent implements OnInit {
  invoice: Invoice | null = null;
  invoiceId: number | null = null;

  constructor(private invoiceService: InvoicesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params => {
        const idFromParams = params.get('id');
        if (idFromParams) {
          this.invoiceId = parseInt(idFromParams,10); // Utilisation de l'opérateur + pour la conversion
          this.invoice = this.invoiceService.getInvoiceById(this.invoiceId);
          console.log(this.invoice)
        }
      });
    }

    onPreviousPage() {
      this.router.navigateByUrl('invoices');
    }
}
