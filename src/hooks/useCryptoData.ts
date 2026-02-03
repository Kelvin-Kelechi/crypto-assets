import { useState, useEffect } from 'react';
import type { CryptoAsset } from '../types';
import { fetchCryptoAssets } from '../api/cryptoApi';

export const useCryptoData = () => {
  const [data, setData] = useState<CryptoAsset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchCryptoAssets();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};
