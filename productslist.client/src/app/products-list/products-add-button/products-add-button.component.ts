import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { UrlsList } from './urls-list.json';

class Product {
  id: number | undefined;
  name: string | undefined;
  price: number | undefined;
  comment: string | undefined;
}

@Component({
  standalone: true,
  selector: 'products-add-button',
  templateUrl: './products-add-button.component.html',
  styleUrls: ['./products-add-button.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ProductsAddProductButtonComponent implements OnInit, OnDestroy {
  @Input() product: Product = new Product();
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
    //const httpOptions = {
    //  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //  observe: "response" as "response"
    //}
    var post$ = this.http.post(url, new Product);
    this.status = "processing";
    this.subscription = post$.subscribe({
      next: () => {
        this.status = "success";
        this.update.emit(true);
        console.log("добавление товара ...");
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
