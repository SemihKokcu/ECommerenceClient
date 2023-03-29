import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrOptions, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private customToastrService:CustomToastrService) { }
  //hata handle etme
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error=>{
      switch(error.status){
        case HttpStatusCode.Unauthorized :
          this.customToastrService.message('İşlemi yapmak için yetkiniz bulunmaktadır.','Yetkisiz İşlem',{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.TopLeft
          })
          break;
        case HttpStatusCode.InternalServerError :
          this.customToastrService.message('Sunucuya Erişilemedi.','Sunucu Hatası',{
            messageType:ToastrMessageType.Error,
            position:ToastrPosition.TopLeft
          })
        break;
        case HttpStatusCode.BadRequest :
          this.customToastrService.message('Geçersiz istek yapıldı.','Geçersiz istek',{
            messageType:ToastrMessageType.Error,
            position:ToastrPosition.TopLeft
          })
          break;
        case HttpStatusCode.NotFound :
          this.customToastrService.message('Sayfa Bulunamadı.','Sayfa bulunamadı',{
            messageType:ToastrMessageType.Error,
            position:ToastrPosition.TopLeft
          })
        break;
        default:
          this.customToastrService.message('Beklenmedik bir durum oluştu.','Hata!',{
            messageType:ToastrMessageType.Error,
            position:ToastrPosition.TopLeft
          })
          break;
      }
      return of(error);
    }))
  }
}
