import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InvoiceDisplayComponent } from "./components/invoice-display/invoice-display.component";
import { NewInvoiceComponent } from "./components/new-invoice/new-invoice.component";
import { SearchInvoiceComponent } from "./components/search-invoice/search-invoice.component";

const routes: Routes = [
    {path: 'create', component: NewInvoiceComponent},
    {path: 'search', component: SearchInvoiceComponent},
    {path: 'display', component: InvoiceDisplayComponent}
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class invoicesRoutingModule {}