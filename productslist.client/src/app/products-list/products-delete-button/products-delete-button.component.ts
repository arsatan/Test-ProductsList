import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { UrlsList } from './urls-list.json';

//class DataItem {
//  guId: string | undefined;
//  fileName: string | undefined;
//  fileData: string | ArrayBuffer | null | undefined;
//}

@Component({
  standalone: true,
  selector: 'products-delete-button',
  templateUrl: './products-delete-button.component.html',
  styleUrls: ['./products-delete-button.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ProductsDeleteButtonComponent implements OnInit, OnDestroy {
  @Input() id: number = 0;
  @Output() update = new EventEmitter<boolean>();

  subscription: Subscription | undefined;
  status: "initial" | "processing" | "success" | "fail" = "initial";
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onClick() {
    if (this.id && this.id != null) {
      UrlsList.forEach((urldata) => this.delete(urldata.url + "/" + this.id.toString(), this.id));
    }
  }

  delete(url: string, id: number) {
    //const httpOptions = {
    //  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //  observe: "response" as "response"
    //}
    var delete$ = this.http.delete(url);
    this.status = "processing";
    this.subscription = delete$.subscribe({
      next: () => {
        this.status = "success";
        this.update.emit(true);
        console.log("удаление товара " + (id.toString() + "..."));
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
