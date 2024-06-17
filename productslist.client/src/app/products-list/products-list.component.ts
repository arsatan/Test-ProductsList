import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsDeleteButtonComponent } from "./products-delete-button/products-delete-button.component";
import { ProductsUpdateButtonComponent } from "./products-update-button/products-update-button.component";
import { ProductsAddProductButtonComponent } from "./products-add-button/products-add-button.component";
import { ProductsAddOrderButtonComponent } from "./products-addorder-button/products-addorder-button.component";
import { UrlsList } from './urls-list.json';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Product {
  id:number;
  name: string;
  price: number;
  comment: string;
}

@Component({
  standalone: true,
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  imports: [CommonModule, MatFormFieldModule, MatTableModule,
    ProductsDeleteButtonComponent, ProductsUpdateButtonComponent, ProductsAddProductButtonComponent,
    ProductsAddOrderButtonComponent]
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  subscription: Subscription | undefined;
  //name = '';
  //enableEdit = false;
  //enableEditIndex = 0;
  dataSource: any;
  displayedColumns: string[] = ['name', 'price', 'comment', 'edit', 'addorder', 'delete'];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProducts();
  }

  onChange(event: any) {
    console.log(event.target.value);
    console.log(event.target.id);
    console.log(event.target.name);
    var name = event.target.name
    var id = event.target.id
    if (name == "name")
      this.products[id].name = event.target.value;
    if (name == "price")
      this.products[id].price = event.target.value;
    if (name == "comment")
      this.products[id].comment = event.target.value;
    console.log(this.products[id]);
  }

  delete(doDelete: boolean) {
    //this.items.push(newItem);
    if (doDelete) {
      this.getProducts();
    }
  }

  add(doAdd: boolean) {
    //this.items.push(newItem);
    if (doAdd) {
      this.getProducts();
    }
  }

  update(doUpdate: boolean) {
    //this.items.push(newItem);
    if (doUpdate) {
      this.getProducts();
    }
  }

  getProducts() {
    this.subscription = this.http.get<Product[]>(UrlsList[0].url).subscribe(
      (result) => {
        this.products = result;
        this.dataSource = new MatTableDataSource(this.products);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getTotalCost()
  {
    /*return 1;*/
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
