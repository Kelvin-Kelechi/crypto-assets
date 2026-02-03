import type { CryptoAsset } from "../types";

const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchCryptoAssets = async (): Promise<CryptoAsset[]> => {
  const response = await fetch(
    `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch crypto assets data");
  }

  return response.json();
};
