import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private httpClientService: HttpClientService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallScaleMultiple);



      // this.httpClientService.put({
      //   controller:"products",

      // },{
      //   id:"ea028959-23dd-4dba-b9e5-9eefc3747a04",
      //   name:"Renkli kağıt",
      //   stock:100,
      //   price:6
      // }).subscribe()


        // this.httpClientService.delete({
        //   controller:"Products"
        // },"0ef3043d-2724-4a1f-9006-cdcfb25930e0"
        // ).subscribe()

        // this.httpClientService.post({controller:"Products"},{name:"elma",stock:100,price:20}).subscribe()
        // this.httpClientService.post({controller:"Products"},{name:"armut",stock:200,price:25}).subscribe()
        // this.httpClientService.post({controller:"Products"},{name:"muz",stock:50,price:15}).subscribe()



        // this.httpClientService
        // .get<Product[]>({
        //   controller: 'Products',
        // })
        // .subscribe((data) => {
        //   console.log(data)
        // });


  }
}
