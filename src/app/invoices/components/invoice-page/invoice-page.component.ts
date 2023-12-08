import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.scss']
})
export class InvoicePageComponent implements OnInit {
  switchComponent: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onCreateInvoice(): void {
    this.switchComponent = true;
  }

  onSearchInvoice(): void {
    this.switchComponent = false;

  }

}
