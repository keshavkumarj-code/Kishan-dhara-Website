import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, ChevronRight, Image as ImageIcon, Soup, Layers, Eye, X, Star, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

// Import all product images
import turmericMain from "../assets/images/turmeric_powder_branded_1779035810578.png";
import turmericTexture from "../assets/images/turmeric_texture_detail_1779036605824.png";
import turmericCooking from "../assets/images/turmeric_cooking_context_1779036625836.png";

import chiliMain from "../assets/images/red_chili_product_1779035562074.png";
import chiliTexture from "../assets/images/red_chili_texture_detail_1779036641128.png";
import chiliCooking from "../assets/images/red_chili_cooking_context_1779036658111.png";

import corianderMain from "../assets/images/coriander_branded_package_1779036673838.png";

import cuminMain from "../assets/images/cumin_branded_package_1779036729806.png";
import cuminTexture from "../assets/images/cumin_texture_detail_1779036745380.png";

const products = [
  {
    name: "Turmeric Powder",
    description: "Rich golden color, strong aroma, and naturally processed turmeric for cooking and health benefits.",
    features: ["100% Pure", "No Added Colors", "Hygienically Packed"],
    sizes: ["100g", "200g", "500g", "1kg"],
    color: "bg-[#FFD700]/10",
    images: [
      { url: turmericMain, label: "Packaging", icon: ImageIcon },
      { url: turmericTexture, label: "Texture", icon: Layers },
      { url: turmericCooking, label: "Cooking", icon: Soup }
    ]
  },
  {
    name: "Red Chili Powder",
    description: "Freshly ground chili powder with authentic Indian spice and vibrant color.",
    features: ["Traditional Heat", "Vibrant Red", "Fine Texture"],
    sizes: ["100g", "200g", "500g", "1kg"],
    color: "bg-accent/10",
    images: [
      { url: chiliMain, label: "Packaging", icon: ImageIcon },
      { url: chiliTexture, label: "Texture", icon: Layers },
      { url: chiliCooking, label: "Cooking", icon: Soup }
    ]
  },
  {
    name: "Coriander Powder",
    description: "Natural coriander powder with fresh aroma and traditional taste.",
    features: ["Earthy Aroma", "Pure Seeds", "Rich Flavor"],
    sizes: ["100g", "200g", "500g", "1kg"],
    color: "bg-green/10",
    images: [
      { url: corianderMain, label: "Packaging", icon: ImageIcon },
      { url: "https://images.unsplash.com/photo-1620317511438-e67301c2579b?q=80&w=600&auto=format&fit=crop", label: "Seed Detail", icon: Layers }
    ]
  },
  {
    name: "Cumin Powder",
    description: "Premium-quality cumin processed carefully for maximum freshness.",
    features: ["Roasted Aroma", "Cooling Properties", "Pure Cumin"],
    sizes: ["100g", "200g", "500g", "1kg"],
    color: "bg-primary/10",
    images: [
      { url: cuminMain, label: "Packaging", icon: ImageIcon },
      { url: cuminTexture, label: "Texture", icon: Layers }
    ]
  }
];

export default function Products() {
  const [activeImages, setActiveImages] = useState<Record<number, number>>(
    Object.fromEntries(products.map((_, i) => [i, 0]))
  );
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>(
    Object.fromEntries(products.map((p, i) => [i, p.sizes[0]]))
  );
  const [quickViewProduct, setQuickViewProduct] = useState<typeof products[0] | null>(null);
  const [justAdded, setJustAdded] = useState<Record<number, boolean>>({});
  const { addToCart } = useCart();

  const priceMap: Record<string, number> = {
    "100g": 39,
    "200g": 89,
    "500g": 179,
    "1kg": 349
  };

  const handleImageChange = (productIdx: number, imgIdx: number) => {
    setActiveImages(prev => ({ ...prev, [productIdx]: imgIdx }));
  };

  const handleSizeChange = (productIdx: number, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productIdx]: size }));
  };

  const handleAddToCart = (product: typeof products[0], idx: number) => {
    const selectedSize = selectedSizes[idx];
    const price = priceMap[selectedSize] || 0;
    
    addToCart({
      id: `${product.name.toLowerCase().replace(/\s+/g, '-')}-${selectedSize}`,
      name: `${product.name} (${selectedSize})`,
      price: price,
      image: product.images[0].url
    });
    
    setJustAdded(prev => ({ ...prev, [idx]: true }));
    setTimeout(() => {
      setJustAdded(prev => ({ ...prev, [idx]: false }));
    }, 2000);
  };

  return (
    <section id="products" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">Our Collection</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-earth">Product Categories</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group bg-cream/50 rounded-[2rem] overflow-hidden border transition-all duration-500 flex flex-col ${
                justAdded[idx] ? "border-green ring-4 ring-green/20" : "border-primary/30 shadow-sm hover:shadow-xl"
              }`}
            >
              {/* Image Gallery Header */}
              <div className="relative h-72 overflow-hidden bg-earth/5">
                <AnimatePresence>
                  {justAdded[idx] && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-30 flex items-center justify-center bg-green/10"
                    >
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 1.2, opacity: 0 }}
                        className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xl flex items-center gap-2 border border-green/20"
                      >
                        <CheckCircle2 size={18} className="text-green" />
                        <span className="text-green font-bold text-xs uppercase tracking-widest">Added</span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImages[idx]}
                    src={product.images[activeImages[idx]].url} 
                    alt={`${product.name} - ${product.images[activeImages[idx]].label}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                
                {/* Image Toggles */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/20 backdrop-blur-md p-1.5 rounded-full border border-white/30 z-20">
                  {product.images.map((img, imgIdx) => (
                    <button
                      key={imgIdx}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageChange(idx, imgIdx);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        activeImages[idx] === imgIdx 
                        ? "bg-primary text-white scale-110 shadow-lg" 
                        : "bg-white/40 text-earth hover:bg-white/60"
                      }`}
                      title={img.label}
                    >
                      <img.icon size={14} />
                    </button>
                  ))}
                </div>

                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest shadow-sm">
                  {product.images[activeImages[idx]].label}
                </div>

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-earth/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10 backdrop-blur-[2px]">
                   <button 
                     onClick={() => setQuickViewProduct(product)}
                     className="bg-white text-earth p-3 rounded-full shadow-lg hover:bg-primary transition-all active:scale-90"
                   >
                     <Eye size={20} />
                   </button>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-2xl font-bold text-earth font-sans tracking-tight">
                    {product.name}
                  </h4>
                  <div className="text-xl font-bold text-accent">
                    ₹{priceMap[selectedSizes[idx]]}
                  </div>
                </div>
                <p className="text-earth/70 mb-4 line-clamp-2 text-xs italic leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.sizes.map((size) => (
                    <button 
                      key={size}
                      onClick={() => handleSizeChange(idx, size)}
                      className={`text-[10px] font-bold px-3 py-1 rounded border transition-all ${
                        selectedSizes[idx] === size
                        ? "bg-primary text-white border-primary shadow-sm scale-105"
                        : "bg-white text-earth/60 border-primary/20 hover:border-primary/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddToCart(product, idx)}
                  className={`mt-auto w-full py-3 rounded-xl font-bold text-sm shadow-md transition-all uppercase tracking-widest flex items-center justify-center gap-2 ${
                    justAdded[idx] 
                    ? "bg-green text-white" 
                    : "bg-accent text-white hover:bg-earth shadow-accent/20 hover:shadow-earth/20"
                  }`}
                >
                  {justAdded[idx] ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 size={16} /> Added!
                    </motion.div>
                  ) : (
                    <>
                      <ShoppingBag size={16} /> Add to Cart
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 text-accent font-bold hover:gap-4 transition-all group">
            View All Products <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="absolute inset-0 bg-earth/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-cream w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl relative z-10 border border-primary/20"
            >
              <button 
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-md text-earth hover:text-accent transition-colors z-20"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-[400px] md:h-auto bg-white">
                  <img 
                    src={quickViewProduct.images[0].url} 
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8 md:p-12 flex flex-col">
                  <div className="flex items-center gap-1 text-primary mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    <span className="text-earth/50 text-xs font-bold ml-2">5.0 (Freshness Guaranteed)</span>
                  </div>

                  <h3 className="text-4xl font-bold text-earth font-sans mb-4 tracking-tight">
                    {quickViewProduct.name}
                  </h3>
                  
                  <p className="text-earth/70 leading-relaxed mb-8">
                    {quickViewProduct.description} This product is carefully sourced and processed to maintain its natural goodness.
                  </p>

                  <div className="mb-8">
                    <span className="block text-xs font-bold uppercase tracking-widest text-earth/40 mb-4">Select Size</span>
                    <div className="flex flex-wrap gap-3">
                      {quickViewProduct.sizes.map((size) => {
                        const pIdx = products.findIndex(p => p.name === quickViewProduct.name);
                        const isSelected = selectedSizes[pIdx] === size;
                        return (
                          <button 
                            key={size}
                            onClick={() => handleSizeChange(pIdx, size)}
                            className={`px-4 py-2 rounded-xl border font-bold text-sm transition-all ${
                              isSelected 
                              ? "bg-primary text-white border-primary shadow-md" 
                              : "bg-white text-earth border-primary/20 hover:border-primary/50"
                            }`}
                          >
                            {size} - ₹{priceMap[size]}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-auto pt-8 border-t border-earth/10 flex items-center justify-between">
                    <div>
                      <span className="block text-xs text-earth/50 font-medium">Price</span>
                      <div className="text-3xl font-bold text-accent">
                        ₹{priceMap[selectedSizes[products.findIndex(p => p.name === quickViewProduct.name)]]}
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        const pIdx = products.findIndex(p => p.name === quickViewProduct.name);
                        handleAddToCart(quickViewProduct, pIdx);
                        setQuickViewProduct(null);
                      }}
                      className="px-8 py-4 bg-accent text-white font-bold rounded-2xl shadow-xl hover:bg-earth transition-all uppercase tracking-widest flex items-center gap-2"
                    >
                      <ShoppingBag size={20} /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
