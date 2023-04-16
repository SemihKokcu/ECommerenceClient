import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { HttpClientService } from './services/common/http-client.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { ComponentType } from './services/common/dynamic-load-component.service';

declare var $:any // jquery denmek için
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {



  @ViewChild(DynamicLoadComponentDirective,{static:true})
  dynamicLoadComponentDirective:DynamicLoadComponentDirective;
     
  constructor(public authService:AuthService,private toastrService:CustomToastrService,private router:Router,
    private httpClientService:HttpClientService,private dynmaciLoadComponentService:DynamicLoadComponentService ){
    authService.identityCheck();

 
  }

  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate(['']);
    this.toastrService.message("Oturum sonlandırıldı","Kullanıcı çıkış yaptı",{messageType:ToastrMessageType.Info,position:ToastrPosition.TopLeft})
  }

  loadComponent(){
    this.dynmaciLoadComponentService.loadComponent(ComponentType.BasketsComponent,this.dynamicLoadComponentDirective.viewContainerRef); 
  }


}
// $(document).ready(()=>{alert("Hello")})
// $.get("https://localhost:7243/api/Product",data=>{console.log(data)})

