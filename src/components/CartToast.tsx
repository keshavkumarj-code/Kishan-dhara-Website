import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

export default function CartToast() {
  const { lastAddedItem, clearLastAdded } = useCart();

  useEffect(() => {
    if (lastAddedItem) {
      const timer = setTimeout(() => {
        clearLastAdded();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem, clearLastAdded]);

  return (
    <AnimatePresence>
      {lastAddedItem && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4"
        >
          <div className="bg-earth text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-md bg-opacity-95">
            <div className="w-12 h-12 bg-primary/20 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                src={lastAddedItem.image} 
                alt={lastAddedItem.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <CheckCircle2 size={14} className="text-green" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Added to Cart</span>
              </div>
              <p className="font-bold text-sm truncate">{lastAddedItem.name}</p>
            </div>

            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl">
              <ShoppingBag size={16} className="text-primary" />
              <span className="font-bold text-xs">₹{lastAddedItem.price}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
