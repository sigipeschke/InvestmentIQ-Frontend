import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OwnedStockComponent } from './portfolio/ownedStock/owned-stock.component';
import { OwnedStockService } from './portfolio/ownedStock/owned-stock.service';
import { SoldStockComponent } from './portfolio/soldStock/sold-stock.component';
import { SoldStockService } from './portfolio/soldStock/sold-stock.service';
import { WatchStockComponent } from './portfolio/watchStock/watch-stock.component';
import { WatchStockService } from './portfolio/watchStock/watch-stock.service';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BrowseComponent } from './browse/browse.component';
import { TickerService } from './browse/ticker.service';
import { LedgerService } from './portfolio/ledger/ledger.service';
import { StockService } from './yFinance/stock.service';
import { ProfitPipe } from './portfolio/profit.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MagnitudePipe } from './yFinance/magnitude.pipe';

@NgModule({
  declarations: [
    AppComponent,
    OwnedStockComponent,
    SoldStockComponent,
    WatchStockComponent,
    PortfolioComponent,
    ProfitPipe,
    MagnitudePipe,
    BrowseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    TableModule,
    InputTextModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    ProgressBarModule,
    InputSwitchModule,
  ],
  providers: [OwnedStockService, SoldStockService, WatchStockService, TickerService, LedgerService, StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
