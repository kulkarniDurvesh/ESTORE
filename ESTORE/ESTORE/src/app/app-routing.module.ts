import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

//lazy loading creates a separate bundles for module on lazy loading
//which will be called when user navigates to home route
const routes: Routes = [
  {path:"home",loadChildren:()=>import('./home/home.module').then((m)=>m.HomeModule) },
  {path:"",redirectTo:'/home/products',pathMatch:'full'},
  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
