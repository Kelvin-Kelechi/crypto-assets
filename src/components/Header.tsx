import { Search, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Header = ({ searchTerm, onSearchChange }: HeaderProps) => {
  return (
    <div className="sticky top-0 z-50 transition-all duration-200">
      {/* Blurry background backdrop */}
      <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/20 dark:border-white/5 shadow-sm transition-colors duration-300" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-green-600 to-emerald-600 p-2 rounded-lg text-white shadow-lg shadow-green-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight">
              Crypto<span className="text-green-600 dark:text-green-400">Assets</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-green-500 dark:group-focus-within:text-green-400 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2.5 bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 focus:border-green-500 dark:focus:border-green-400 transition-all duration-200 sm:text-sm shadow-inner"
                placeholder="Search by name or symbol..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
