import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
declare var google;
@Directive({
  selector: 'google-signin-button'
})
export class GoogleLoginDirective implements OnInit {
  
  @Input('selectable') option: boolean;

  constructor(private el: ElementRef, private socialAuthService: SocialAuthService) {
  }
  ngOnInit() {
    if (!this.option) return;
    this.socialAuthService.initState.pipe(take(1)).subscribe(() => {
        google.accounts.id.renderButton(this.el.nativeElement, {
            type: 'standart',
            size: 'large',
            width:'300',
             text: 'signin_with',
             theme: 'filled_blue'
        });
    });
}

}
