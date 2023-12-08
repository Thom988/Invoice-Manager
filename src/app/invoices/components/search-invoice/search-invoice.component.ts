import { Component, OnInit } from "@angular/core";
import { Invoice } from "src/app/core/models/invoice.model";
import { DateService } from "src/app/core/services/date.service";
import { InvoicesService } from "src/app/core/services/invoices.service";

@Component({
  selector: "app-search-invoice",
  templateUrl: "./search-invoice.component.html",
  styleUrls: ["./search-invoice.component.scss"],
})
export class SearchInvoiceComponent implements OnInit {
  invoices!: Invoice[];
  invoiceNumber: string = "";
  clientName: string = "";
  issueDateMin: string = "";
  issueDateMax: string = "";
  isDatesVisible: boolean = false;

  constructor(
    private invoiceService: InvoicesService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {}

  onSubmitForm() {
    const dtMin: Date = this.dateService.toDateFormat(this.issueDateMin);
    const dtMax: Date = this.dateService.toDateFormat(this.issueDateMax);
    this.invoices = this.invoiceService.searchInvoices(
      this.isDatesVisible,
      this.invoiceNumber,
      this.clientName,
      dtMin,
      dtMax
    );
  }

  onCheckboxDate() {
    const currentDate: Date = new Date();
    this.isDatesVisible = !this.isDatesVisible;
    this.issueDateMin = this.dateService.calculateFirstDayOfCurrentMonth(currentDate).toISOString().substring(0, 10);
    this.issueDateMax = this.dateService.calculateLastDayOfCurrentMonth(currentDate).toISOString().substring(0, 10);
    this.invoiceNumber = "";
    this.clientName = "";
  }
}
