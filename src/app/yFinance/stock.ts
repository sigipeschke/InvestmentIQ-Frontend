import { Ledger } from "../portfolio/ledger/ledger";

export interface Stock {
    ticker: string;
    ledger: Ledger[];
    history: HistoricalQuote[];
    dividendHist: HistoricalDividend[];
    ownedValue: number;
    investedValue: number;
    ownedShares: number;
    mode: string;
    profit: number;
    profitInPercent: number;
    purchasePrice: number;
    desiredSellPrice: number;
    notes: string;
    name: string;
    price: number;
    bid: number;
    ask: number;
    open: number;
    previousClose: number;
    dayHigh: number;
    dayLow: number;
    change: number;
    changeInPercent: number;
    avg50Price: number;
    avgChange50: number;
    avgChange50InPercent: number;
    avg200Price: number;
    avgChange200: number;
    avgChange200InPercent: number;
    yearHigh: number;
    changeYearHigh: number;
    changeYearHighInPercent: number;
    yearLow: number;
    changeYearLow: number;
    changeYearLowInPercent: number;
    volume: number;
    avgVolume: number;
    dividendAnnualYield: number;
    dividendAnnualYieldPercent: number;
    dividendPayDate: string;
    marketCap: number;
    stockExchange: string;
    url: string;
}

export interface HistoricalQuote {
    date: string;
    open: number;
    low: number;
    high: number;
    close: number;
    adjClose: number;
    volume: number;
}

export interface HistoricalDividend {
    date: string;
    adjDividend: number;
}