import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/modules/shared/shared.module';
import { TableComponent } from './table/table.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing';
import { EmpresasService } from './modal/service/empresas.service';
import { SegmentosService } from './modal/service/segmentos.service';
import { CategoriasService } from './modal/service/categorias.service';
import { ExpProdIFoodService } from './modal/service/exp-prod-ifood.service';



@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    TableComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    EmpresasService,
    SegmentosService,
    CategoriasService,
    ExpProdIFoodService,
    ModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
