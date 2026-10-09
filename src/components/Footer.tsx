import { Instagram, Youtube, Phone, Mail, MapPin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-earth text-cream border-t border-white/10 relative overflow-hidden">
      {/* Decorative leaf or spice icon shadows can go here */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">K</div>
              <span className="text-2xl font-bold tracking-tight text-white font-sans">KISAN DHARA <span className="text-accent">FOODS</span></span>
            </div>
            <p className="text-cream/50 mb-8 leading-relaxed italic text-sm">
              "Purest. Freshest. From Our Farm To Your Kitchen." Premium Indian spices made with authentic farm-grown ingredients.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/kisan_dhara?igsh=MTZ0dXN0dTYybjEwag==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary transition-all text-white hover:text-earth">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com/@kisandharafoods?si=kT0Izx9VKWcF4FLo" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary transition-all text-white hover:text-earth">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-8">Our Standards</h4>
            <ul className="space-y-4 text-cream/70 text-sm">
              <li className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-primary" /> 100% Natural Ingredients
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-primary" /> Farm Fresh Quality
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-primary" /> Hygienically Packed
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-primary" /> No Harmful Preservatives
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-8">Explore</h4>
            <ul className="space-y-4 text-cream/70 text-sm">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Our Products</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">Inside Our Story</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">Frequently Asked</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Connect With Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-8">Quick Contact</h4>
            <ul className="space-y-6 text-cream/70 text-sm">
              <li className="flex items-start gap-4">
                <Phone size={18} className="text-primary mt-1 shrink-0" />
                <a href="https://wa.me/91xxxxxxxx" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">91xxxxxxxx</a>
              </li>
              <li className="flex items-start gap-4">
                <Mail size={18} className="text-primary mt-1 shrink-0" />
                <a href="mailto:kejnsckfnd@gmail.com" className="break-all hover:text-white transition-colors cursor-pointer">kejnsckfnd@gmail.com</a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-primary mt-1 shrink-0" />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-cream/30 flex items-center gap-1">
            © 2026 Kisan Dhara Foods. Made with <Heart size={12} className="text-accent fill-accent" /> in India.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-cream/20">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Delivery FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
