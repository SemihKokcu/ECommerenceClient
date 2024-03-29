import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {  NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { AuthService, _isAuthenticated } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   *
   */
  constructor(
    private jwtHelperService: JwtHelperService,
    private router:Router,
    private toastrService:CustomToastrService,
    private spinner:NgxSpinnerService,
    ) {

  }
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
    this.spinner.show(SpinnerType.BallScaleMultiple);

    if (!_isAuthenticated) {
      this.router.navigate(['login'],{queryParams:{returnUrl:state.url}});
      this.toastrService.message("Oturum açmanız gerekiyor!","Yetkisiz erişim",{messageType:ToastrMessageType.Warning,position:ToastrPosition.TopCenter})
    }

    this.spinner.hide(SpinnerType.BallScaleMultiple);

    return true;

  }
}
  
