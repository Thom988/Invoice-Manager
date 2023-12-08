import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InvoiceDisplayComponent } from "./components/invoice-display/invoice-display.component";
import { InvoicePageComponent } from "./components/invoice-page/invoice-page.component";
import { SearchInvoiceComponent } from "./components/search-invoice/search-invoice.component";

const routes: Routes = [
    // {path: 'create', component: NewInvoiceComponent},
    {path: 'search', component: SearchInvoiceComponent},
    {path: 'display/:id', component: InvoiceDisplayComponent},
    {path: '', component: InvoicePageComponent}
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