import { Customer } from "./customer.model";

export class Order {
   orderId:string | undefined;
   orderTotalValue: number | undefined;
   orderPaymentMethod: string | undefined;
   orderCreatedAt:string | undefined;
   orderNumber: number | undefined;
   customerId:string | undefined;
   customer: Customer | undefined;
}
