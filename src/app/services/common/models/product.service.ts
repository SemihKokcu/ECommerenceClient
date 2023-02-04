import { Injectable } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/create_product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  createProduct(product:CreateProduct,successCallBack?:any)
  {
    this.httpClientService.post({controller:"products"},{name:product.name,price:product.price,stock:product.stock})
    .subscribe(response=>{
      successCallBack();
    });
  }
}
