const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(amount){
  return currencyFormatter.format(Number.isFinite(amount) ? amount : 0);
}

export function calculateTradeAmount(price, quantity){
  if (!Number.isFinite(price) || !Number.isInteger(quantity) || quantity <= 0) return 0;
  return Math.round((price * quantity + Number.EPSILON) * 100) / 100;
}

export function calculateNetWorth(walletBalance, holdings, companies){
  const prices = new Map(companies.map(company => [company.name, company.price]));
  const stocksValue = holdings.reduce((total, holding) => {
    const price = prices.get(holding.companyName);
    if (holding.numOfStocks <= 0 || !Number.isFinite(price)) return total;
    return total + price * holding.numOfStocks;
  }, 0);

  return walletBalance + stocksValue;
}
