import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes:Routes=[
  {path:'product',component: ProductComponent},
  {path:'',redirectTo:'product',pathMatch:'full'},
  {path:'**',component: NotFoundComponent},
]
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
