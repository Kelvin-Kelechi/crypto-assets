import { useState, useMemo, useEffect } from "react";
import { useCryptoData } from "./hooks/useCryptoData";
import { CryptoItem } from "./components/CryptoItem";
import { Loading } from "./components/Loading";
import { ErrorMessage } from "./components/ErrorMessage";
import { Header } from "./components/Header";
import { Pagination } from "./components/Pagination";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 12;

function App() {
  const { data, loading, error, refetch } = useCryptoData();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredData = useMemo(() => {
    return data.filter(
      (asset) =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Abstract Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-gray-50 to-white" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px]" />
      </div>

      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : (
          <AnimatePresence mode="wait">
            {filteredData.length > 0 ? (
              <>
                <motion.div
                  key={currentPage} // Force re-render animation on page change
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {currentData.map((asset, index) => (
                    <CryptoItem key={asset.id} asset={asset} index={index} />
                  ))}
                </motion.div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-gray-400 text-lg">
                  No assets found matching "{searchTerm}"
                </div>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear Search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}

export default App;
