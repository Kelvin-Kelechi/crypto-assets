import { Search, Sparkles, TrendingUp } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useCryptoData } from "../hooks/useCryptoData";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Header = ({ searchTerm, onSearchChange }: HeaderProps) => {
  const { data } = useCryptoData();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter suggestions based on search term
  const suggestions = data
    .filter(
      (asset) =>
        searchTerm &&
        (asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .slice(0, 5);

  return (
    <div className="sticky top-0 z-50">
      {/* Blurry background backdrop */}
      <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/20 dark:border-white/5 shadow-sm" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-green-600 to-emerald-600 p-2 rounded-lg text-white shadow-lg shadow-green-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight">
              Crypto
              <span className="text-green-600 dark:text-green-400">Assets</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-96 group" ref={searchRef}>
              <motion.div
                initial={false}
                animate={{
                  scale: showSuggestions ? 1.02 : 1,
                  boxShadow: showSuggestions
                    ? "0 0 0 2px rgba(34, 197, 94, 0.2)"
                    : "none",
                }}
                className="relative rounded-xl overflow-visible z-20"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <motion.div
                    animate={{
                      rotate: searchTerm ? [0, -10, 10, -10, 0] : 0,
                      scale: searchTerm ? 1.1 : 1,
                      color: searchTerm ? "#16a34a" : "#9ca3af",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Search className="h-4 w-4" />
                  </motion.div>
                </div>
                <motion.input
                  layout
                  type="text"
                  className="block w-full pl-10 pr-4 py-2.5 bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-green-500 dark:focus:border-green-400 sm:text-sm shadow-inner transition-colors duration-200"
                  placeholder="Search by name or symbol..."
                  value={searchTerm}
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    setShowSuggestions(true);
                  }}
                  whileFocus={{
                    scale: 1.01,
                    transition: { duration: 0.2 },
                  }}
                />

                {/* Auto-suggestions Dropdown */}
                <AnimatePresence>
                  {showSuggestions && searchTerm && suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                    >
                      <div className="py-2">
                        {suggestions.map((asset) => (
                          <button
                            key={asset.id}
                            onClick={() => {
                              onSearchChange(asset.name);
                              setShowSuggestions(false);
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center justify-between group transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={asset.image}
                                alt={asset.name}
                                className="w-6 h-6 rounded-full"
                              />
                              <div>
                                <span className="font-medium text-gray-900 dark:text-gray-100 block">
                                  {asset.name}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                                  {asset.symbol}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <span>
                                ${asset.current_price.toLocaleString()}
                              </span>
                              <TrendingUp
                                className={`w-3 h-3 ${asset.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}
                              />
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Animated gradient border effect when searching */}
                {searchTerm && (
                  <motion.div
                    layoutId="search-glow"
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/20 to-emerald-400/20 animate-pulse" />
                  </motion.div>
                )}
              </motion.div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
