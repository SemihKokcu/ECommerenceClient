import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateOrder } from 'src/app/contracts/order/create_order';
import { Observable, firstValueFrom } from 'rxjs';

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
}
