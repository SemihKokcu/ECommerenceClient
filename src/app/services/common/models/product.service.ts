import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CreateProduct } from 'src/app/contracts/create_product';
import { List_Product } from 'src/app/contracts/list_products';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  createProduct(product:CreateProduct,successCallBack?:any,errorCallBack?:(errorMessage:string)=>void)
  {
    this.httpClientService.post({controller:"products"},{name:product.name,price:product.price,stock:product.stock})
    .subscribe(response=>{
      successCallBack();
    },(errorResponse:HttpErrorResponse)=>{
      //errorları karşılamak için kendi türümüzü yazdık
        const _error:Array<{key:string,value:Array<string>}> = errorResponse.error;
        let message ="";
        _error.forEach((v,index)=>{
          v.value.forEach((_v,_index)=>{
            message += `${_v}<br>`
          })
        })
        errorCallBack(message);
    });
  }

  async getProductList (page:number,size:number,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void)
  :Promise<{totalCount:number,products:List_Product[]}> // c# task gibi promise ile async yapabiliriz
  {
    const promiseData:Promise<{totalCount:number,products:List_Product[]}> = this.httpClientService.get<{totalCount:number,products:List_Product[]}>({
      controller:"products",
      queryString:`page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d=>successCallBack())
    .catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async delete(id:string){
    const deleteObservable:Observable<any> = this.httpClientService.delete<any>({
      controller:"products"
    },id)
    await firstValueFrom(deleteObservable);
  }
}
