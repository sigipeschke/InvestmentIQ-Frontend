import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { WatchStockComponent } from './portfolio/watchStock/watch-stock.component';

const routes: Routes = [
  { path: 'home', component: PortfolioComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'watchlist', component: WatchStockComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
