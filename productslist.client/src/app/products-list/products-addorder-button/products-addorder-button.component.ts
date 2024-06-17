import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { UrlsList } from './urls-list.json';

class Product {
  id: number = 0;
  name: string = '';
  price: number = 0;
  comment: string = '';
}

class Order {
  id: number = 0;
  orderId: number = 0;
  name: string | undefined;
  count: number = 1;
  orderDate: Date = new Date();
  comment: string | undefined;
  orderedProducts: OrderedProduct[] = [];
}

//class OrderedProduct extends Product  {
//  orderId?: number = 0;
//  ProductId?: number = 0;
//  order?: Order = new Order();
//}
class OrderedProduct {
  id: number | undefined;
  name: string | undefined;
  price: number | undefined;
  comment: string | undefined;
  orderId: number = 0;
  ProductId: number = 0;
  order: Order = new Order();
}

@Component({
  standalone: true,
  selector: 'products-addorder-button',
  templateUrl: './products-addorder-button.component.html',
  styleUrls: ['./products-addorder-button.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ProductsAddOrderButtonComponent implements OnInit, OnDestroy {
  @Input() product: Product = new Product();
  @Input() order: Order = new Order();
  /*  @Input() orderedProduct: OrderedProduct = new OrderedProduct();*/
  @Output() update = new EventEmitter<boolean>();

  subscription: Subscription | undefined;
  status: "initial" | "processing" | "success" | "fail" = "initial";
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onClick() {
    UrlsList.forEach((urldata) => this.post(urldata.url));
  }

  post(url: string) {
    var order = new Order();
    var orderedProduct = new OrderedProduct();
    orderedProduct.ProductId = this.product.id;
    orderedProduct.name = this.product.name;
    orderedProduct.price = this.product.price;

    order.comment = this.product.name;

    order.orderedProducts.push(orderedProduct);

    console.log(order.orderedProducts);

    //const httpOptions = {
    //  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //  observe: "response" as "response"
    //}
    var post$ = this.http.post(url, order);
    console.log(post$);
    this.status = "processing";
    this.subscription = post$.subscribe({
      next: () => {
        this.status = "success";
        this.update.emit(true);
        console.log("добавление заказа...");
      },
      error: (error: any) => {
        this.status = "fail";
        this.update.emit(false);
        console.log(this.status);
        return throwError(() => error);
      }
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
