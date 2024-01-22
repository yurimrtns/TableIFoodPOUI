import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';
import { ServiceService } from './modal/service/service.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/modules/shared/shared.module';
import { TableComponent } from './table/table.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing';




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
    ServiceService,
    ModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
