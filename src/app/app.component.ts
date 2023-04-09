import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { HttpClientService } from './services/common/http-client.service';
declare var $:any // jquery denmek için
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authService:AuthService,private toastrService:CustomToastrService,private router:Router,private httpClientService:HttpClientService){
    authService.identityCheck();

    // httpClientService.get({
    //   controller:"baskets"
    // }).subscribe(data=>{
    //   // debugger;
    // })

    // httpClientService.post({
    //   controller:"baskets"
    // },
    // {
    //   productId:"0025a0fd-6e6c-4163-8ac5-0d9e6a2317b4",
    //   quantity:50
    // }).subscribe(data=>{
    //   debugger;
    // })

    // httpClientService.put({
    //   controller:"baskets"
    // },{
    //   basketItemId:"c9e1c51a-7c9f-4e37-baad-bb8828ccca00",
    //   quantity:125
    // }).subscribe(data=>{debugger})
  }

  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate(['']);
    this.toastrService.message("Oturum sonlandırıldı","Kullanıcı çıkış yaptı",{messageType:ToastrMessageType.Info,position:ToastrPosition.TopLeft})
  }


}
// $(document).ready(()=>{alert("Hello")})
// $.get("https://localhost:7243/api/Product",data=>{console.log(data)})

