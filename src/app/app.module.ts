import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';
import { DownloadComponent } from './components/download/download.component';
import { RepeatDirective } from './directives/repeat.directive';
import { NewsTickerComponent } from './components/news-ticker/news-ticker.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    HistoryComponent,
    DownloadComponent,
    RepeatDirective,
    NewsTickerComponent
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
