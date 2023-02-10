export interface OwnedStock {
    ticker: string;
    purchasePrice: number;
    ownedShares: number;
    desiredSellPrice: number;
    notes: string;
}