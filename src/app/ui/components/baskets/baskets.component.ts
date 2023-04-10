import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update-basket-item';
import { BasketService } from 'src/app/services/common/models/basket.service';

declare var $:any
@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private basketService:BasketService) {super(spinner) }

basketItems:ListBasketItem[];

  async ngOnInit():Promise<void> {

    this.showSpinner(SpinnerType.BallAtom);
    this.basketItems = await this.basketService.get();
    this.hideSpinner(SpinnerType.BallAtom);
  }

  async changeQauntity(object:any){
    this.showSpinner(SpinnerType.BallAtom)
    const basketItemId = object.target.attributes["id"].value
    const quantity:number = object.target.value;
    const basketItem:UpdateBasketItem = new UpdateBasketItem();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.BallAtom)

  }

  async removeBasketItem(basketItemId:string){
    this.showSpinner(SpinnerType.BallAtom)
      await this.basketService.remove(basketItemId)
      $("."+basketItemId).fadeOut(500,()=>{this.hideSpinner(SpinnerType.BallAtom)})

  }

}
