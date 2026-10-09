import { motion } from "motion/react";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">Contact Us</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-earth mb-8 leading-tight">Get In <span className="text-accent underline decoration-primary lg:no-underline">Touch</span></h3>
            <p className="text-lg text-earth/70 mb-12">
              Have questions about our spices? We'd love to hear from you. Reach out to us through any of these channels.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center text-accent flex-shrink-0 shadow-sm group-hover:bg-primary group-hover:text-earth transition-colors">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-earth mb-1">WhatsApp / Call</h4>
                  <a href="https://wa.me/91xxxxxxxx" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-accent hover:text-earth cursor-pointer transition-colors block">91xxxxxxxx</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center text-accent flex-shrink-0 shadow-sm group-hover:bg-primary group-hover:text-earth transition-colors">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-earth mb-1">Email Us</h4>
                  <a href="mailto:kejnsckfnd@gmail.com" className="text-lg font-medium text-accent hover:text-earth cursor-pointer transition-colors block">kejnsckfnd@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center text-accent flex-shrink-0 shadow-sm group-hover:bg-primary group-hover:text-earth transition-colors">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-earth mb-1">Location</h4>
                  <p className="text-lg font-medium text-accent">India</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <a 
                href="https://wa.me/91xxxxxxxx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg active:scale-95"
              >
                <MessageCircle size={20} /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-cream/40 p-8 md:p-12 rounded-[40px] border border-earth/5 shadow-inner"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-earth/50 ml-1">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-earth/10 focus:border-accent outline-none transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-earth/50 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-earth/10 focus:border-accent outline-none transition-all shadow-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-earth/50 ml-1">Your Message</label>
                <textarea 
                  rows={4} 
                  placeholder="How can we help you?"
                  className="w-full px-6 py-4 rounded-2xl bg-white border border-earth/10 focus:border-accent outline-none transition-all shadow-sm resize-none"
                ></textarea>
              </div>
              <button className="w-full bg-earth text-cream py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-accent hover:text-earth transition-all shadow-lg shadow-earth/10 group active:scale-95">
                Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
