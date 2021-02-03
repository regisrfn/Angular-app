import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { OrderComponent } from './orders/order/order.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: 'orders', children: [
      { path: ':pageNumber', component: OrdersComponent }
    ]
  },
  {
    path: 'order', children: [
      { path: '', component: OrderComponent },
      { path: 'edit', component: OrderComponent },
      { path: ':id', component: OrderDetailComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
