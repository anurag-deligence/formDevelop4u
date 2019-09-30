import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterProjectComponent } from './components/register-project/register-project.component';
import { GetListedComponent } from './components/get-listed/get-listed.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterProjectComponent,
    GetListedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgFlashMessagesModule.forRoot(),
    HttpClientModule,
    NgxUiLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
