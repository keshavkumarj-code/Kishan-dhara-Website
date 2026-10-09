import { motion } from "motion/react";
import { Leaf, Award, ShieldCheck, BadgeIndianRupee, Sparkles } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      title: "100% Natural Ingredients",
      desc: "No artificial colors, chemicals, or harmful preservatives. Pure spice experience.",
      icon: Leaf,
      color: "text-green"
    },
    {
      title: "Farm Fresh Quality",
      desc: "Directly sourced from trusted Indian farmers. Bringing rural goodness to you.",
      icon: Award,
      color: "text-primary"
    },
    {
      title: "Hygienically Processed",
      desc: "Packed with modern hygiene and quality standards. Safety is our priority.",
      icon: ShieldCheck,
      color: "text-accent"
    },
    {
      title: "Rich Aroma & Taste",
      desc: "Authentic Indian spices with natural flavor and vibrant color.",
      icon: Sparkles,
      color: "text-amber-500"
    },
    {
      title: "Affordable Premium",
      desc: "Best quality products at reasonable prices. Quality for every kitchen.",
      icon: BadgeIndianRupee,
      color: "text-accent"
    }
  ];

  return (
    <section className="py-24 bg-earth text-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          <div className="lg:col-span-1">
            <span className="bg-primary text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4 inline-block font-sans">Quality First</span>
            <h3 className="text-4xl md:text-5xl font-extrabold font-sans mb-8 leading-tight tracking-tight">
              Why Choose <span className="italic text-primary font-serif font-normal">Kisan Dhara</span>?
            </h3>
            <p className="text-cream/70 text-lg mb-8 leading-relaxed max-w-sm">
              We bridge the gap between rural kindness and urban needs by ensuring what you eat is exactly how nature intended.
            </p>
            <button className="bg-white text-earth px-8 py-4 rounded-xl font-bold hover:bg-primary hover:text-white transition-all shadow-lg uppercase tracking-widest text-sm">
              Learn More
            </button>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {reasons.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all hover:translate-y-[-4px] group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white transition-colors`}>
                   <reason.icon className={`${reason.color} group-hover:scale-110 transition-transform`} size={30} />
                </div>
                <h4 className="text-xl font-serif font-bold mb-3">{reason.title}</h4>
                <p className="text-cream/60 leading-relaxed text-sm">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
