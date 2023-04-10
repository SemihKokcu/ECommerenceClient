import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

//ViewContainerRef => dinamik olarak yüklemecek compu içinde barındıran contaiinerdır. Her dinamik yükleme sürecinde view'leri clear etmemiz gerekir
//ComponentFactory => componentlerin instancelarını oluşturmak için kullanılan nesnedir
//ComponentFactoryResolver => belirli bir component için factory'i resolve eden sonfotro. içindekif fonks araccılığı ile bir componentresolve factory oluşturu

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  constructor(private componentFactoryResolver:ComponentFactoryResolver) { }

  async loadComponent(component:ComponentType,viewContainerRef:ViewContainerRef){
    
    let _component:any = null
    
    switch (component) {
      case ComponentType.BasketsComponent:
        _component = (await import("../../ui/components/baskets/baskets.component")).BasketsComponent; 
        break;
    }

    viewContainerRef.clear();
    return viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(_component));
  }
}

export enum ComponentType{
  BasketsComponent,
}