import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'},
    {provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {dateFormat: 'shortDate', timezone: "-300 UTC"}} // Brasilia (Brazil) timezone (GMT)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
