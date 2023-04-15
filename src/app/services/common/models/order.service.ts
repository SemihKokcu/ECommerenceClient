import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateOrder } from 'src/app/contracts/order/create_order';
import { Observable, firstValueFrom } from 'rxjs';
import { OrderList } from 'src/app/contracts/order/list_product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService:HttpClientService) { }

  async createOrder(order:CreateOrder):Promise<void>{

    const observable:Observable<any>  = await this.httpClientService.post({
        controller:"orders",
      },order)

      await firstValueFrom(observable);

  }

  async getAllOrder(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalOrderCount:number,orders:OrderList[]}>{

    const observable:Observable<{totalOrderCount:number,orders:OrderList[]}>  = await this.httpClientService.get({
        controller:"orders",
        queryString:`page=${page}&size=${size}`

      })

       const promiseData = firstValueFrom(observable);
       promiseData.then(value=>{successCallBack()})
       .catch(error=>{errorCallBack(error)})

       return await promiseData

  }
}
