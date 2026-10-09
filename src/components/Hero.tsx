import { motion } from "motion/react";
import { ArrowRight, Leaf, ShieldCheck, Sparkles } from "lucide-react";

interface HeroProps {
  heroImage: string;
}

export default function Hero({ heroImage }: HeroProps) {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Kisan Dhara Foods Spices"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-primary text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-6 inline-block font-sans">
              Premium Quality Spices
            </span>
            <h1 className="text-6xl md:text-8xl font-extrabold font-sans leading-tight mb-6 text-white">
              Purest. <span className="text-primary tracking-tighter">Freshest.</span><br/>
              Authentic <span className="text-white italic font-serif">India.</span>
            </h1>
            <p className="text-lg md:text-xl text-cream/90 font-medium mb-10 max-w-xl leading-relaxed">
              Naturally grown ingredients, carefully processed to preserve the rich aroma and vibrant color of traditional Indian farms directly to your kitchen.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10 max-w-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green/20 flex items-center justify-center text-green shadow-sm border border-green/30">✓</div>
                <span className="font-semibold text-white">100% Natural</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green/20 flex items-center justify-center text-green shadow-sm border border-green/30">✓</div>
                <span className="font-semibold text-white">Farm Fresh</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green/20 flex items-center justify-center text-green shadow-sm border border-green/30">✓</div>
                <span className="font-semibold text-white">No Preservatives</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green/20 flex items-center justify-center text-green shadow-sm border border-green/30">✓</div>
                <span className="font-semibold text-white">Hygienically Packed</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:translate-y-[-2px] transition-all flex items-center gap-2">
                Explore Products <ArrowRight size={20} />
              </button>
              <button className="border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-earth transition-all">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
