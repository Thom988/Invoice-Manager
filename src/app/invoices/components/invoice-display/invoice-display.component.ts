import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/core/models/invoice.model';
import { InvoicesService } from 'src/app/core/services/invoices.service';
// 
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
import { Client } from 'src/app/core/models/client.model';
import { ClientsService } from 'src/app/core/services/clients.service';

@Component({
  selector: 'app-invoice-display',
  templateUrl: './invoice-display.component.html',
  styleUrls: ['./invoice-display.component.scss'],
})
export class InvoiceDisplayComponent implements OnInit {
  invoice!: Invoice | undefined;
  client!: Client | undefined;

  constructor(private invoiceService: InvoicesService,
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private clientsService: ClientsService) {}

    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params => {
        const idFromParams = params.get('id');
        if (idFromParams) {
          const invoiceId = parseInt(idFromParams,10); // Utilisation de l'opérateur + pour la conversion
          this.invoice = this.invoiceService.getInvoiceById(invoiceId);
          if (this.invoice) {
            this.client = this.clientsService.getClientById(this.invoice.idClient);
          }
        }
      });
    }

    onPreviousPage() {
      this.router.navigateByUrl('invoices');
    }

    public convertToPDF() {
      var data = document.getElementById("invoice-display");
      if (data !== null) {
        html2canvas(data).then((canvas) => {
          var imgWidth = 210;
          var pageHeight = 297;
          var imgHeight = (canvas.height * imgWidth) / canvas.width;
          // var heightLeft = imgHeight;
          const contentDataURL = canvas.toDataURL("image/png");
          let pdf = new jspdf.jsPDF("p", "mm", "a4"); // A4 size page of PDF
          var position = 0;
          pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, 297);
          pdf.save(`Facture_${this.invoice?.numero}.pdf`); // Generated PDF
        });
      }
        
    }

}
