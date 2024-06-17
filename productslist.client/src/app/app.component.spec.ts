import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve data items from the server', () => {
    const mockProducts = [
      { id: 1, name: 'Продукт 1', price: 1.00, comment: 'Комментарий 1' },
      { id: 2, name: 'Продукт 2', price: 2.00, comment: 'Комментарий 2' }
    ];

    component.ngOnInit();

    const req = httpMock.expectOne('/api/products');
    expect(req.request.method).toEqual('GET');
    req.flush(mockProducts);
    //expect(component.products).toEqual(mockProducts);
  });
});
