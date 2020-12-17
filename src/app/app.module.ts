import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderItemsComponent } from './orders/order-items/order-items.component';
import { OrderComponent } from './orders/order/order.component';
import { HeaderComponent } from './header/header.component';
import { OrderService } from './shared/order.service';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderItemsComponent,
    OrderComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InlineSVGModule.forRoot()
  ],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
