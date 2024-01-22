import { ModuleWithProviders, NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TableComponent } from './table/table.component';

const routes : Routes = [
    { path: 'table', component: TableComponent },
    { path: '', component: LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

