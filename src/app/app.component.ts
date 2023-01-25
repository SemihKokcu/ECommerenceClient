import { Component } from '@angular/core';
declare var $:any // jquery denmek için
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECommerenceClient';
}
// $(document).ready(()=>{alert("Hello")})
