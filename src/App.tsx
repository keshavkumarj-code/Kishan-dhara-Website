/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import About from "./components/About";
import Products from "./components/Products";
import WhyChooseUs from "./components/WhyChooseUs";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Note: Using the generated asset path
import heroImage from "./assets/images/kisan_dhara_hero_1779034459814.png";

import { CartProvider } from "./context/CartContext";
import CartToast from "./components/CartToast";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-cream selection:bg-primary selection:text-earth">
        <Navbar />
        <main>
          <Hero heroImage={heroImage} />
          <Categories />
          <About />
          <WhyChooseUs />
          <Products />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <CartToast />
      </div>
    </CartProvider>
  );
}


