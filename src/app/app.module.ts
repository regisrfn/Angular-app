import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { HeaderComponent } from './header/header.component';
import { OrderService } from './shared/order.service';
import { PopUpOrderComponent } from './pop-up-order/pop-up-order.component';
import { NotificationComponent } from './notification/notification.component';
import { ItemComponent } from './item/item.component';
import { ItemService } from './shared/item.service';
import { ProductService } from './shared/product.service';
import { CustomerService } from './shared/customer.service';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderComponent,
    HeaderComponent,
    PopUpOrderComponent,
    NotificationComponent,
    ItemComponent,
    OrderDetailComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InlineSVGModule.forRoot()
  ],
  providers: [OrderService,ItemService,ProductService,CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
