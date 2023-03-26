import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { CreateUser } from 'src/app/contracts/user/create_user';
import { User } from 'src/app/entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClientService:HttpClientService,
    private toastrService:CustomToastrService
    ) { }

  async create(user:User):Promise<CreateUser>{
    const observable:Observable<CreateUser|User> =  this.httpClientService.post<User|CreateUser>({
      controller:"users"
    },user);

    return await firstValueFrom(observable) as CreateUser;
  }

  async login(userNameOrEmail:string,password:string,callBackFunction?:()=>void):Promise<any>{
    const observable:Observable<any|TokenResponse> =  this.httpClientService.post<any|TokenResponse>({
      controller:"users",
      action:"login"
    },{userNameOrEmail,password})

    const tokenResponse:TokenResponse =  await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
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
      controller:"users"
    },user);

    const tokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem('accessToken',tokenResponse.token.accessToken);
      this.toastrService.message("Google Login Başarılı","Giriş Başarılı",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight});
    }

    callBackFunction();
  }
}
