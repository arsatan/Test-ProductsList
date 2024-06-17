import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { UrlsList } from './urls-list.json';

class Product {
  id: number = 0;
  name: string | undefined;
  price: number | undefined;
  comment: string | undefined;
}

@Component({
  standalone: true,
  selector: 'products-update-button',
  templateUrl: './products-update-button.component.html',
  styleUrls: ['./products-update-button.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ProductsUpdateButtonComponent implements OnInit, OnDestroy {
  //@Input() id: number = 0;
  //@Input() name: string = '';
  @Input() product: Product = new Product();
  @Output() update = new EventEmitter<boolean>();

  subscription: Subscription | undefined;
  status: "initial" | "processing" | "success" | "fail" = "initial";
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onClick() {
    if (this.product.id && this.product.id != null) {
      UrlsList.forEach((urldata) => this.put(this.product.id, urldata.url + "/" + this.product.id.toString(), this.product));
    }
  }

  put(id: number, url: string, product: Product) {
    //const httpOptions = {
    //  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //  observe: "response" as "response"
    //}
    var put$ = this.http.put(url, product);
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
