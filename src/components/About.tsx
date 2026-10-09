import { motion } from "motion/react";
import { Leaf, Award, ShieldCheck, HeartPulse, BadgeIndianRupee } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Happy Customers", value: "1000+", icon: HeartPulse },
    { label: "Local Farmers", value: "50+", icon: Leaf },
    { label: "Natural Products", value: "100%", icon: ShieldCheck },
    { label: "Fresh Delivery", value: "Across India", icon: Award },
  ];

  return (
    <section id="about" className="py-24 bg-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-primary text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4 inline-block font-sans">About Us</span>
            <h3 className="text-4xl md:text-6xl font-extrabold font-sans text-earth mb-8 leading-tight tracking-tight">
              Welcome to <span className="text-accent underline decoration-primary/40 underline-offset-8 italic font-serif font-normal">Kisan Dhara Foods</span>
            </h3>
            <div className="space-y-6 text-lg text-earth/80 border-l-4 border-accent pl-8 py-2">
              <p>
                At <strong>Kisan Dhara Foods</strong>, we believe that real taste begins at the farm. We are an Indian local spice brand dedicated to delivering fresh, natural, and premium-quality spices directly to every kitchen.
              </p>
              <p>
                Our products are sourced from trusted Indian farms and processed hygienically to maintain purity, freshness, natural color, and rich flavor. Every pack reflects our commitment to quality and authentic Indian taste.
              </p>
              <p>
                From turmeric powder to traditional masalas, we bring the goodness of Indian farms to your home.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-serif font-bold text-accent mb-3 flex items-center gap-2">
                  <Leaf size={20} className="text-green" /> Our Mission
                </h4>
                <p className="text-earth/70">
                  To provide every household with pure, natural, and chemical-free Indian spices while supporting local farmers and sustainable agriculture.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-serif font-bold text-accent mb-3 flex items-center gap-2">
                  <Award size={20} className="text-primary" /> Our Vision
                </h4>
                <p className="text-earth/70">
                  To become one of India’s most trusted spice brands known for purity, freshness, and authentic flavor.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className={`p-8 rounded-3xl relative overflow-hidden group ${
                  idx % 2 === 0 ? "bg-accent text-white" : "bg-earth text-cream"
                }`}
              >
                <stat.icon className="mb-4 opacity-40 group-hover:opacity-100 transition-opacity" size={32} />
                <h5 className="text-3xl font-serif font-bold mb-1">{stat.value}</h5>
                <p className="text-sm uppercase tracking-widest opacity-70">{stat.label}</p>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full" />
              </div>
            ))}
            <div className="col-span-2 p-8 bg-cream border-2 border-earth/5 rounded-3xl">
              <h4 className="text-2xl font-serif font-bold text-earth mb-4 italic">Our Heritage</h4>
              <p className="text-earth/70 leading-relaxed">
                Kisan Dhara Foods started with a simple mission — bringing pure and authentic Indian spices from local farms to every household. Inspired by India’s agricultural heritage, we work closely with farmers to deliver natural products people can trust.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
