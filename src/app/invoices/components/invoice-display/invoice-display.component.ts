import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-invoice-display',
  templateUrl: './invoice-display.component.html',
  styleUrls: ['./invoice-display.component.scss'],
})
export class InvoiceDisplayComponent implements OnInit {
  pdfSrc!: string;

  constructor() {}

  ngOnInit(): void {
    //   const doc = new jsPDF();
    //   doc.text('Coucou', 10, 10);
    //   this.doc.save("a4.pdf");
    //   doc.output('datauristring');
    // }
  }
}
