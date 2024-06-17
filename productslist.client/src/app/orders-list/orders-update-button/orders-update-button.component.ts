import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { UrlsList } from './urls-list.json';
//import { formatDate } from '@angular/common';

class Product {
  id: number = 0;
  name: string | undefined;
  price: number | undefined;
  comment: string | undefined;
}

class Order {
  id: number = 0;
  order_id: number = 0;
  product_id: number = 0;
  name: string | undefined;
  price: number | undefined;
  count: number = 1;
  orderDate: Date = new Date();
  comment: string | undefined;
}


@Component({
  standalone: true,
  selector: 'orders-update-button',
  templateUrl: './orders-update-button.component.html',
  styleUrls: ['./orders-update-button.component.css'],
  imports: [FormsModule, CommonModule]
})
export class OrdersUpdateButtonComponent implements OnInit, OnDestroy {
  //@Input() id: number = 0;
  //@Input() name: string = '';
  @Input() order: Order = new Order();
  @Output() update = new EventEmitter<boolean>();

  subscription: Subscription | undefined;
  status: "initial" | "processing" | "success" | "fail" = "initial";
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onClick() {
    if (this.order.id && this.order.id != null) {
      UrlsList.forEach((urldata) => this.put(this.order.id, urldata.url + "/" + this.order.id.toString(), this.order));
    }
  }

  put(id: number, url: string, products: Product) {
    //const httpOptions = {
    //  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //  observe: "response" as "response"
    //}
    var put$ = this.http.put(url, products);
    this.status = "processing";
    this.subscription = put$.subscribe({
      next: () => {
        this.status = "success";
        this.update.emit(true);
        console.log("обновление информации о товаре " + (id.toString() + "..."));
      },
      error: (error: any) => {
        this.status = "fail";
        this.update.emit(false);
        console.log(id.toString() + this.status);
        return throwError(() => error);
      }
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
