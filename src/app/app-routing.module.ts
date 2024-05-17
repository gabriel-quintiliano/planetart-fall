import { environment as env } from 'src/environments/environment';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';
import { DownloadComponent } from './components/download/download.component';

const routes: Routes = [
  { path: env.routePath.home, component: HomeComponent },
  { path: env.routePath.history, component: HistoryComponent },
  { path: env.routePath.download, component: DownloadComponent },
  { path: "**", redirectTo: env.routePath.home }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
