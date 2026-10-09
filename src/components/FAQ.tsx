import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      q: "Are your products organic?",
      a: "We focus on natural and farm-fresh sourcing with high-quality processing standards. Our spices are 100% natural and free from chemical additives."
    },
    {
      q: "Do you use preservatives?",
      a: "No, our products are free from harmful preservatives and artificial colors. We use modern hygienic packing to preserve freshness naturally."
    },
    {
      q: "Where are your spices sourced from?",
      a: "Our spices are sourced directly from trusted Indian farmers across various spice-growing regions of India."
    },
    {
      q: "Do you deliver across India?",
      a: "Yes, we deliver products across multiple locations in India through our reliable logistics partners. Shipping typically takes 3-5 business days."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-cream bg-texture">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">FAQ</h2>
          <h3 className="text-4xl font-serif font-bold text-earth">Common Questions</h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-earth/5 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full text-left px-8 py-6 flex justify-between items-center"
              >
                <span className="text-lg font-serif font-bold text-earth">{faq.q}</span>
                <div className={`p-2 rounded-full transition-colors ${activeIndex === idx ? "bg-accent text-white" : "bg-earth/5 text-earth"}`}>
                  {activeIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 text-earth/70 leading-relaxed border-t border-earth/5 pt-4 text-sm">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
