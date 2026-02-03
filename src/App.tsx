import { useState, useMemo } from "react";
import { useCryptoData } from "./hooks/useCryptoData";
import { CryptoItem } from "./components/CryptoItem";
import { Loading } from "./components/Loading";
import { ErrorMessage } from "./components/ErrorMessage";
import { Header } from "./components/Header";

function App() {
  const { data, loading, error, refetch } = useCryptoData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return data.filter(
      (asset) =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <main className="max-w-3xl mx-auto px-4 py-8">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : (
          <div className="space-y-4">
            {filteredData.length > 0 ? (
              filteredData.map((asset, index) => (
                <CryptoItem key={asset.id} asset={asset} index={index} />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No assets found matching "{searchTerm}"
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
