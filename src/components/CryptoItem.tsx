import { motion } from "framer-motion";
import type { CryptoAsset } from "../types";
import { Sparkline } from "./Sparkline";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface CryptoItemProps {
  asset: CryptoAsset;
  index: number;
}

export const CryptoItem = ({ asset, index }: CryptoItemProps) => {
  const isPositive = asset.price_change_percentage_24h >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative overflow-hidden bg-white/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500" />

      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gray-200 rounded-full animate-pulse" />
              <img
                src={asset.image}
                alt={asset.name}
                className="relative w-12 h-12 rounded-full shadow-sm object-cover bg-white"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg leading-tight">
                {asset.name}
              </h3>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {asset.symbol}
              </span>
            </div>
          </div>

          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
              isPositive
                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                : "bg-rose-50 text-rose-600 border border-rose-100"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(asset.price_change_percentage_24h).toFixed(2)}%
          </div>
        </div>

        <div className="mb-6">
          <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
            $
            {asset.current_price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 20,
            })}
          </span>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
              Volume (24h)
            </span>
            <span className="text-sm font-medium text-gray-600">
              ${(asset.total_volume / 1000000).toFixed(1)}M
            </span>
          </div>

          <div className="w-32 h-12 flex items-end justify-end opacity-80 group-hover:opacity-100 transition-opacity">
            {asset.sparkline_in_7d && (
              <Sparkline
                data={asset.sparkline_in_7d.price}
                width={120}
                height={40}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
