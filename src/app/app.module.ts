import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { BrandComponent } from './brand/brand.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { ColorComponent } from './color/color.component';
import { ProductComponent } from './product/product.component';
import { AlertifyService } from './services/alertfiy.service';
import { CardService } from './services/card.service';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    NavbarComponent,
    CategoryComponent,
    ColorComponent,
    ProductComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
