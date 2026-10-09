import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Menu, X, Instagram, Youtube } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartSidebar from "./CartSidebar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Products", href: "#products" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white border-b border-primary/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">K</div>
            <h1 className="text-2xl font-bold tracking-tight text-earth font-sans">
              KISAN DHARA <span className="text-accent">FOODS</span>
            </h1>
          </motion.div>

          <div className="hidden md:flex items-center gap-8 font-semibold text-sm uppercase tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-earth hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center space-x-4 ml-4 border-l border-primary/20 pl-8">
              <a href="https://www.instagram.com/kisan_dhara" target="_blank" rel="noopener noreferrer" className="text-earth hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com/@kisandharafoods" target="_blank" rel="noopener noreferrer" className="text-earth hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
              <div className="relative">
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="bg-primary text-earth p-2 rounded-full hover:bg-white transition-all shadow-md active:scale-95 group"
                >
                  <ShoppingCart size={18} className="group-hover:rotate-12 transition-transform" />
                </button>
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span 
                      key={cartCount}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-30"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="bg-primary text-earth p-2 rounded-full shadow-md active:scale-95"
              >
                <ShoppingCart size={20} />
              </button>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    key={cartCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-earth p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-cream border-b border-earth/10 px-4 pt-2 pb-6 space-y-2"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 text-lg font-serif text-earth hover:text-accent border-b border-earth/5"
            >
              {link.name}
            </a>
          ))}
          <div className="flex space-x-6 pt-4 px-3">
             <a href="https://www.instagram.com/kisan_dhara" target="_blank" rel="noopener noreferrer" className="text-earth">
                <Instagram size={24} />
              </a>
              <a href="https://youtube.com/@kisandharafoods" target="_blank" rel="noopener noreferrer" className="text-earth">
                <Youtube size={24} />
              </a>
          </div>
        </motion.div>
      )}
      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}
