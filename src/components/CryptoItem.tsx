import { motion } from "framer-motion";
import type { CryptoAsset } from "../types";

export interface CryptoItemProps {
  asset: CryptoAsset;
  index: number;
}

export const CryptoItem = ({ asset, index }: CryptoItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{
        y: -12,
        scale: 1.05,
        transition: { type: "spring", stiffness: 500, damping: 15 },
      }}
      className="relative overflow-hidden bg-white/70 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl hover:shadow-green-500/20 dark:hover:shadow-green-500/10 transition-shadow duration-300 group flex flex-col items-center justify-center p-6 sm:p-8 text-center cursor-pointer"
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/5 dark:to-emerald-500/5 rounded-full blur-3xl group-hover:bg-green-500/20 dark:group-hover:bg-green-500/10 transition-colors duration-500" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          <img
            src={asset.image}
            alt={asset.name}
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-lg object-cover bg-white dark:bg-gray-800 ring-4 ring-white/50 dark:ring-white/10"
            loading="lazy"
          />
        </div>

        <h3 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl leading-tight mb-1">
          {asset.name}
        </h3>
        <span className="text-xs sm:text-sm font-bold text-green-500 dark:text-green-400 uppercase tracking-wider bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full mb-6">
          {asset.symbol}
        </span>

        <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          $
          {asset.current_price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 8,
          })}
        </span>
      </div>
    </motion.div>
  );
};
