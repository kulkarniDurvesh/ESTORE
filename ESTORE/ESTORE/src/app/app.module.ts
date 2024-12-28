import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HeaderComponent } from './header/header.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { CatnavigationComponent } from './catnavigation/catnavigation.component';
// import { HomeModule } from './home/home.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
    // HeaderComponent,
    // CatnavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FontAwesomeModule,
    //HomeModule //this will egarly load component -- changing for lazy loading
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
