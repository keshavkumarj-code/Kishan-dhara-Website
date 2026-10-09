import { motion } from "motion/react";
import { Leaf, Flame, Sparkles, Wind } from "lucide-react";

export default function Categories() {
  const categories = [
    {
      title: "Ground Spices",
      description: "Essential daily powders like Turmeric, Chili, and Coriander.",
      icon: <Leaf className="w-8 h-8" />,
      color: "bg-primary/10",
      accent: "text-primary",
      href: "#products"
    },
    {
      title: "Whole Spices",
      description: "Traditional whole seeds and barks for authentic flavor.",
      icon: <Wind className="w-8 h-8" />,
      color: "bg-accent/10",
      accent: "text-accent",
      href: "#products"
    },
    {
      title: "Wellness Range",
      description: "Superfoods and immunity boosters from nature's lap.",
      icon: <Sparkles className="w-8 h-8" />,
      color: "bg-green/10",
      accent: "text-green",
      href: "#products"
    },
    {
      title: "Blended Masalas",
      description: "Expertly crafted spice mixes for specific dishes.",
      icon: <Flame className="w-8 h-8" />,
      color: "bg-earth/10",
      accent: "text-earth",
      href: "#products"
    }
  ];

  return (
    <section id="categories" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
          >
            Explore Our Range
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-earth mb-6"
          >
            Curated Categories
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="h-1 w-24 bg-primary mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <motion.a
              href={cat.href}
              key={cat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-cream/30 p-8 rounded-[2.5rem] border border-primary/10 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 text-center flex flex-col items-center"
            >
              <div className={`w-20 h-20 rounded-3xl ${cat.color} ${cat.accent} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm border border-white/50`}>
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-earth mb-3">{cat.title}</h3>
              <p className="text-earth/60 text-sm leading-relaxed mb-6">
                {cat.description}
              </p>
              <div className={`mt-auto text-xs font-bold uppercase tracking-widest ${cat.accent} opacity-0 group-hover:opacity-100 transition-opacity`}>
                Browse Collection &rarr;
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
