import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductsListComponent } from './products-list/products-list.component'
import { OrdersListComponent } from './orders-list/orders-list.component';
//import { LogOutputComponent } from './log-output/log-output.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  public selectedValue: string = 'products';
  constructor() { }
  @ViewChild(ProductsListComponent, { static: true }) products: ProductsListComponent | undefined;
  @ViewChild(OrdersListComponent, { static: true }) orders: OrdersListComponent | undefined;

  update() {
    this.products?.getProducts();
    this.orders?.getOrders();
  }

  public onValueChange(value: string) {
    this.selectedValue = value;
  }

  ngOnInit() { }
  logValue = '';

  srcProductsForm = new FormGroup({ srcProductsName: new FormControl('') });
  srcOrdersForm = new FormGroup({ srcOrdersName: new FormControl('') });
  title = 'angular.client';
}
