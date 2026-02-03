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
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
    >
      <div className="flex items-center gap-4">
        <img
          src={asset.image}
          alt={asset.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{asset.name}</span>
          <span className="text-sm text-gray-500 uppercase">
            {asset.symbol}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-medium text-gray-900">
          ${asset.current_price.toLocaleString()}
        </span>
        <span
          className={`text-sm ${
            asset.price_change_percentage_24h >= 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {asset.price_change_percentage_24h >= 0 ? "+" : ""}
          {asset.price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>
    </motion.div>
  );
};
