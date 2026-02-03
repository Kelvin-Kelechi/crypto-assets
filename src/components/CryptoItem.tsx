import { motion } from 'framer-motion';
import type { CryptoAsset } from '../types';

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
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className="relative overflow-hidden bg-white/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group flex flex-col items-center justify-center p-8 text-center cursor-pointer"
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-gray-200 rounded-full animate-pulse" />
          <img 
            src={asset.image} 
            alt={asset.name} 
            className="relative w-20 h-20 rounded-full shadow-lg object-cover bg-white ring-4 ring-white/50" 
            loading="lazy"
          />
        </div>
        
        <h3 className="font-bold text-gray-900 text-xl leading-tight mb-1">{asset.name}</h3>
        <span className="text-sm font-bold text-blue-500 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full mb-6">
          {asset.symbol}
        </span>

        <span className="text-4xl font-extrabold text-gray-900 tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          ${asset.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
        </span>
      </div>
    </motion.div>
  );
};
