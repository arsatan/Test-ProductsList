import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrdersDeleteButtonComponent } from "./orders-delete-button/orders-delete-button.component";
import { OrdersUpdateButtonComponent } from "./orders-update-button/orders-update-button.component";
//import { OrdersAddButtonComponent } from "./orders-add-button/orders-add-button.component";
import { UrlsList } from './urls-list.json';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Order {
  id: number;
  orderId: number,
  name: string;
  count: number;
  orderDate: Date;
  comment: string;
  orderedProducts: OrderedProduct[];
}

class OrderedProduct {
  id: number | undefined;
  orderId: number | undefined;
  ProductId: number | undefined;
  name: string | undefined;
  price: number | undefined;
  comment: string | undefined;
}


@Component({
  standalone: true,
  selector: 'orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
  imports: [CommonModule,
    MatTableModule, MatFormFieldModule,
    OrdersDeleteButtonComponent, OrdersUpdateButtonComponent]
})
export class OrdersListComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  subscription: Subscription | undefined;
  dataSource: any;
  displayedColumns: string[] = ['name', 'productName', 'delete'];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getOrders();
  }

  onChange(event: any) {
  }

  delete(doDelete: boolean) {
    if (doDelete) {
      this.getOrders();
    }
  }

  add(doAdd: boolean) {
    if (doAdd) {
      this.getOrders();
    }
  }

  update(doUpdate: boolean) {
    if (doUpdate) {
      this.getOrders();
    }
  }

  getOrders() {
    this.subscription = this.http.get<Order[]>(UrlsList[0].url).subscribe(
      (result) => {
        this.orders = result;
        this.dataSource = new MatTableDataSource(this.orders);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getTotalCost()
  {
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
