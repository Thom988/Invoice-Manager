import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewClientComponent } from "./components/new-client/new-client.component";
import { SearchClientComponent } from "./components/search-client/search-client.component";
import { ClientPageComponent } from "./client-page/client-page.component";

const routes: Routes = [
    {path: '', component: ClientPageComponent, children: [
        { path: '', redirectTo: 'search', pathMatch: 'full' }, /* clients/search est par defaut sur le router outlet */
        {path: 'search', component: SearchClientComponent},
        {path: 'create', component: NewClientComponent},
    ]}
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class ClientsRoutingModule {}