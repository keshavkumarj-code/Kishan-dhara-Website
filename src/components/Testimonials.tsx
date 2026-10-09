import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      text: "Amazing aroma and authentic taste. Feels completely natural.",
      author: "Priya Sharma",
      role: "Home Chef"
    },
    {
      text: "Best turmeric powder I’ve used for cooking and turmeric milk.",
      author: "Rajesh Verma",
      role: "Fitness Enthusiast"
    },
    {
      text: "Fresh packaging and premium quality at a great price.",
      author: "Anjali Gupta",
      role: "Regular Customer"
    }
  ];

  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 p-20 opacity-5 text-earth">
        <Quote size={200} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">Reviews</h2>
          <h3 className="text-4xl font-serif font-bold text-earth">What Our Customers Say</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[32px] shadow-sm border border-earth/5 relative"
            >
              <div className="flex gap-1 mb-6 text-primary">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-lg text-earth/80 italic mb-8 relative z-10 leading-relaxed font-serif">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4 border-t border-earth/5 pt-6">
                <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold">
                  {t.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-earth">{t.author}</h4>
                  <p className="text-xs text-accent uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
