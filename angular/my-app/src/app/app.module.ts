import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { AppComponent } from './app.component';

@NgModule({//装饰器
  declarations: [//该模块所拥有的组件
    AppComponent
  ],
  imports: [//该模块依赖的其他模块
    BrowserModule,FormsModule
  ],
  providers: [],//该模块所拥有的服务提供商
  bootstrap: [AppComponent]//指定跟组件，只有根模块需要该配置项Angular创建它并插入index.html宿主页面
//exports:[]  公开该模块其中的一部分，以便外部模块使用它们
})
export class AppModule { }
