import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $:any // jquery denmek için
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECommerenceClient';
  constructor(private toastr:CustomToastrService){
    // toastr.message("Hello world","Semih",{messageType:ToastrMessageType.Success,position:ToastrPosition.BottomCenter});
    // toastr.message("Hello world","Semih",{messageType:ToastrMessageType.Error,position:ToastrPosition.BottomLeft});
    // toastr.message("Hello world","Semih",{messageType:ToastrMessageType.Info,position:ToastrPosition.BottomRight});
    // toastr.message("Hello world","Semih",{messageType:ToastrMessageType.Warning,position:ToastrPosition.TopCenter});


  }


}
// $(document).ready(()=>{alert("Hello")})
// $.get("https://localhost:7243/api/Product",data=>{console.log(data)})

