import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $:any // jquery denmek için
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authService:AuthService,private toastrService:CustomToastrService,private router:Router){
    authService.identityCheck();

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

