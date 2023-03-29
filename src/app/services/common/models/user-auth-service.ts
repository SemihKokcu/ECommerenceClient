import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(
    private httpClientService:HttpClientService,
    private toastrService:CustomToastrService,
    ) { }

async refreshTokenLogin(refreshToken:string,callBackFunction?:()=>void):Promise<any>{
  const observable:Observable<any|TokenResponse> = this.httpClientService.post({
    action:"refreshtokenlogin",
    controller:"auth"
  },{refreshToken:refreshToken})

  const tokenResponse :TokenResponse = await firstValueFrom(observable) as TokenResponse;
  if (tokenResponse) {
    localStorage.setItem("accessToken",tokenResponse.token.accessToken);
    localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
  }

  callBackFunction();
}

  async login(userNameOrEmail:string,password:string,callBackFunction?:()=>void):Promise<any>{
    const observable:Observable<any|TokenResponse> =  this.httpClientService.post<any|TokenResponse>({
      controller:"auth",
      action:"login"
    },{userNameOrEmail,password})

    const tokenResponse:TokenResponse =  await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
      this.toastrService.message("Kullanıcı girişi başarılı bir şekilde sağlanmıştır","Giriş Başarılı",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopLeft
      })
    }
   
    callBackFunction();
  }

  async googleLogin(user:SocialUser,callBackFunction?:()=>void):Promise<any>{
   
    const observable:Observable<SocialUser |TokenResponse> =  this.httpClientService.post<SocialUser |TokenResponse>({
      action:"google-login",
      controller:"auth"
    },user);

    const tokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem('accessToken',tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
      this.toastrService.message("Google Login Başarılı","Giriş Başarılı",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight});
    }

    callBackFunction();
  }

  async facebookLogin(user:SocialUser,callBackFunction?:()=>void):Promise<any>{
    
    const observable:Observable<SocialUser|TokenResponse> = await this.httpClientService.post<SocialUser|TokenResponse>({
      controller:"auth",
      action:"facebook-login"
    },user);

    const tokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem('accessToken',tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
      this.toastrService.message("Facebook Login Başarılı","Giriş Başarılı",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight});
    }
    callBackFunction();

  }
}
