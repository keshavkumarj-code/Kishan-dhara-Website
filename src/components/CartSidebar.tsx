import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Send, CheckCircle2, User, Phone, MapPin, Mail, CreditCard, Landmark, Wallet, Truck, ShieldCheck, QrCode, MessageCircle, Copy, Youtube, Instagram } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState, FormEvent } from "react";

type CheckoutStep = 'cart' | 'form' | 'success';
type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'bank_transfer' | 'cod';

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, cartCount, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Form State
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharge = cart.length > 0 ? 99 : 0;
  const total = subtotal + deliveryCharge;

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPaymentError(null);

    const resScript = await loadRazorpay();
    if (!resScript) {
      alert("Razorpay SDK failed to load. Are you online?");
      setIsSubmitting(false);
      return;
    }

    try {
      // Create Razorpay Order via our server
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      const razorpayOrder = await orderResponse.json();

      const options = {
        key: razorpayOrder.key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Kisan Dhara Foods",
        description: "Pure Indian Spices",
        order_id: razorpayOrder.id,
        handler: async function (response: any) {
          // Payment Success Handler
          setIsSubmitting(true);
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData: {
                  items: cart,
                  subtotal,
                  deliveryCharge,
                  total,
                  customer,
                  payment: { method: paymentMethod }
                }
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.status === "success") {
              setOrderId(verifyData.orderId);
              clearCart();
              setStep('success');
            } else {
              setPaymentError("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            setPaymentError("Network error during verification.");
          } finally {
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },
        theme: { color: "#E6A400" },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
          }
        }
      };

      if (razorpayOrder.simulated) {
        // Simulation for when keys are missing
        setTimeout(() => {
          options.handler({
            razorpay_order_id: razorpayOrder.id,
            razorpay_payment_id: "pay_sim_" + Math.random().toString(36).substr(2, 9),
            razorpay_signature: "sig_sim_" + Math.random().toString(36).substr(2, 9),
          });
        }, 1500);
      } else {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error("Checkout flow failed:", error);
      setPaymentError("Could not initiate payment. Try again later.");
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStep('cart'), 300);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const paymentMethods = [
    { id: 'upi', label: 'UPI / GPay', icon: <QrCode size={18}/> },
    { id: 'card', label: 'Cards', icon: <CreditCard size={18}/> },
    { id: 'netbanking', label: 'Banking', icon: <Landmark size={18}/> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-earth/60 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-cream z-[70] shadow-2xl flex flex-col border-l border-primary/20"
          >
            {/* Header */}
            <div className="p-6 border-b border-earth/10 flex items-center justify-between bg-white sticky top-0 z-20">
              <div className="flex items-center gap-2">
                {step === 'form' && (
                  <button onClick={() => setStep('cart')} className="p-2 hover:bg-earth/5 rounded-full mr-2">
                    <ArrowLeft size={20} />
                  </button>
                )}
                <ShoppingBag className="text-primary" />
                <h2 className="text-xl font-bold text-earth">
                  {step === 'cart' ? 'Your Shopping Bag' : step === 'form' ? 'Secure Checkout' : 'Order Placed'}
                </h2>
                {step === 'cart' && (
                  <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full">
                    {cartCount} Items
                  </span>
                )}
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-earth/5 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {step === 'cart' ? (
                <div className="p-6 space-y-6">
                  {cart.length === 0 ? (
                    <div className="h-[60vh] flex flex-col items-center justify-center text-center opacity-40">
                      <div className="w-24 h-24 bg-earth/5 rounded-full flex items-center justify-center mb-6">
                        <ShoppingBag size={48} />
                      </div>
                      <p className="text-xl font-bold text-earth">Your spice box is empty</p>
                      <button onClick={handleClose} className="mt-4 text-primary font-bold hover:underline">Start Shopping</button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group flex gap-5 p-5 bg-white rounded-[2rem] border border-primary/5 shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-cream border border-earth/5 flex-shrink-0 shadow-inner">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-lg text-earth truncate mb-1">{item.name}</h4>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-accent font-bold">₹{item.price}</span>
                            <span className="text-earth/30 text-xs italic">per unit</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 bg-cream rounded-xl px-3 py-1.5 border border-primary/10">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-full transition-colors font-bold text-accent"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="font-bold text-sm w-6 text-center text-earth">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-full transition-colors font-bold text-primary"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-earth/20 hover:text-red-500 p-2 transition-colors rounded-full hover:bg-red-50"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              ) : step === 'form' ? (
                <div className="p-6 space-y-8">
                  {/* Delivery Form */}
                  <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
                    <div className="bg-white p-6 rounded-[2.5rem] border border-primary/10 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          <MapPin size={20}/>
                        </div>
                        <h3 className="text-lg font-bold text-earth">Delivery Information</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-earth/40 ml-2">Full Name</label>
                          <div className="relative">
                            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60" />
                            <input 
                              required 
                              type="text" 
                              placeholder="Rahul Sharma" 
                              value={customer.name}
                              onChange={(e) => setCustomer({...customer, name: e.target.value})}
                              className="w-full pl-12 pr-4 py-4 bg-cream/30 rounded-2xl border border-primary/10 focus:outline-none focus:ring-2 ring-primary/20 transition-all font-medium text-sm" 
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-earth/40 ml-2">Email Address</label>
                            <div className="relative">
                              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60" />
                              <input 
                                required 
                                type="email" 
                                placeholder="rahul@example.com" 
                                value={customer.email}
                                onChange={(e) => setCustomer({...customer, email: e.target.value})}
                                className="w-full pl-12 pr-4 py-4 bg-cream/30 rounded-2xl border border-primary/10 focus:outline-none focus:ring-2 ring-primary/20 transition-all font-medium text-sm" 
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-earth/40 ml-2">Phone Number</label>
                            <div className="relative">
                              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60" />
                              <input 
                                required 
                                type="tel" 
                                placeholder="9990074904" 
                                value={customer.phone}
                                onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                                className="w-full pl-12 pr-4 py-4 bg-cream/30 rounded-2xl border border-primary/10 focus:outline-none focus:ring-2 ring-primary/20 transition-all font-medium text-sm" 
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-earth/40 ml-2">Full Address</label>
                          <div className="relative">
                            <MapPin size={18} className="absolute left-4 top-4 text-primary/60" />
                            <textarea 
                              required 
                              placeholder="House No, Street, Landmark, City, State, ZIP" 
                              value={customer.address}
                              onChange={(e) => setCustomer({...customer, address: e.target.value})}
                              className="w-full pl-12 pr-4 py-4 bg-cream/30 rounded-2xl border border-primary/10 focus:outline-none focus:ring-2 ring-primary/20 transition-all font-medium text-sm min-h-[120px] resize-none" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Sections */}
                    <div className="bg-white p-6 rounded-[2.5rem] border border-primary/10 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                          <CreditCard size={20}/>
                        </div>
                        <h3 className="text-lg font-bold text-earth">Payment Method</h3>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                            className={`flex flex-col items-center gap-2 px-4 py-3 min-w-[70px] rounded-2xl border transition-all flex-1 ${
                              paymentMethod === method.id 
                              ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 -translate-y-1" 
                              : "bg-cream/50 border-earth/5 hover:border-primary/20 text-earth/40"
                            }`}
                          >
                            {method.icon}
                            <span className="text-[9px] font-bold uppercase tracking-widest leading-none text-center">
                              {method.label}
                            </span>
                          </button>
                        ))}
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={paymentMethod}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-cream/50 rounded-3xl p-8 border border-primary/10 text-center"
                        >
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border border-primary/10">
                            <ShieldCheck size={32} className="text-green" />
                          </div>
                          <h4 className="font-bold text-earth mb-2 text-lg">Secure {paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'card' ? 'Card' : 'Banking'} Gateway</h4>
                          <p className="text-xs text-earth/60 mb-6 leading-relaxed">
                            Click below to open the secure Razorpay portal. We support 
                            {paymentMethod === 'upi' ? ' Google Pay, PhonePe, and all major UPI apps.' : 
                             paymentMethod === 'card' ? ' all Visa, Mastercard, and Rupay cards.' : 
                             ' net banking with 50+ Indian banks.'}
                          </p>
                          <div className="flex justify-center gap-3 opacity-30 grayscale items-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Google_Pay_Logo.svg" alt="GPay" className="h-3" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Order Summary Checkout Card */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-primary/10 shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16" />
                      
                      <h3 className="text-sm font-bold uppercase tracking-widest text-earth/40 mb-6 border-b border-primary/5 pb-2">Order Summary</h3>
                      <div className="space-y-3 mb-6">
                        {cart.map(item => (
                          <div key={item.id} className="flex justify-between items-center text-sm">
                            <span className="text-earth/60 truncate max-w-[200px]">{item.name} <span className="text-[10px] text-earth/40">x{item.quantity}</span></span>
                            <span className="font-bold text-earth">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3 pt-6 border-t border-earth/5">
                        <div className="flex justify-between text-sm">
                          <span className="text-earth/50">Items Subtotal</span>
                          <span className="font-medium text-earth">₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-earth/50">Delivery Charge</span>
                          <span className="font-medium text-earth">₹{deliveryCharge}</span>
                        </div>
                        <div className="pt-6 flex justify-between items-end">
                          <div>
                            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Total Amount</span>
                            <p className="text-4xl font-bold text-accent leading-none">₹{total}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                             <div className="bg-green/10 text-green px-3 py-1 rounded-full flex items-center gap-1.5 text-[9px] font-bold border border-green/20">
                               <ShieldCheck size={12}/> Secure 256-bit SSL
                             </div>
                             <p className="text-[8px] text-earth/30 uppercase tracking-widest font-bold">Encrypted Checkout</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>

                  {/* Trust Badge */}
                  <div className="flex items-center justify-center gap-4 py-4 px-6 bg-white/50 rounded-2xl border border-primary/5">
                    <ShieldCheck size={20} className="text-green" />
                    <span className="text-xs font-bold text-earth/60 uppercase tracking-widest">100% Secure Payment Guarantee</span>
                  </div>

                  {/* WhatsApp Support */}
                  <div className="flex flex-col gap-4 items-center justify-center pt-2">
                    <a 
                      href="https://wa.me/918796912856" 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-green/20"
                    >
                      <MessageCircle size={22} />
                      Chat with Order Support
                    </a>
                    <p className="text-[10px] text-earth/40 font-bold uppercase tracking-widest">Available 24/7 for you</p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12">
                  <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.5, duration: 1 }}
                    className="w-32 h-32 bg-green/10 rounded-[3rem] flex items-center justify-center mb-8 shadow-inner shadow-green/20 border border-green/10"
                  >
                    <CheckCircle2 size={64} className="text-green" />
                  </motion.div>
                  <h2 className="text-4xl font-bold text-earth mb-4">Payment Success!</h2>
                  <p className="text-earth/60 mb-8 max-w-sm">Fragrant Kisan Dhara spices are on their way. We've sent your order #{orderId || 'Order Processing'} to your email.</p>
                  
                  <div className="w-full bg-white p-6 rounded-[2.5rem] border border-primary/10 shadow-sm mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl -mr-12 -mt-12" />
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-bold text-earth/40 uppercase tracking-widest">Delivery Status</span>
                      <span className="bg-primary/10 text-primary text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">Preparing for Dispatch</span>
                    </div>
                    <div className="bg-cream/50 p-5 rounded-2xl border border-primary/5 flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <Truck className="text-primary"/>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-earth">Arriving in 3-5 Business Days</p>
                        <p className="text-[10px] text-earth/40">Hand-packed with care.</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleClose}
                    className="w-full py-5 bg-earth text-white font-bold rounded-2xl transition-all hover:bg-earth/95 shadow-xl shadow-earth/10 flex items-center justify-center gap-3 active:scale-95"
                  >
                    Return to Spicery <ArrowLeft size={18} className="rotate-180"/>
                  </button>

                  <div className="mt-12 flex gap-8">
                    <a href="https://www.instagram.com/kisan_dhara" target="_blank" rel="noreferrer" className="text-earth/30 hover:text-primary transition-all hover:scale-110">
                      <Instagram size={24} />
                    </a>
                    <a href="https://youtube.com/@kisandharafoods" target="_blank" rel="noreferrer" className="text-earth/30 hover:text-red-500 transition-all hover:scale-110">
                      <Youtube size={24} />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Pricing Area */}
            {step !== 'success' && cart.length > 0 && (
              <div className="p-8 bg-white border-t border-earth/10 shadow-[0_-15px_50px_rgba(0,0,0,0.06)] relative z-20">
                {step === 'cart' ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center px-2">
                      <div>
                        <span className="text-earth/30 font-bold uppercase tracking-widest text-[10px]">Grand Total</span>
                        <p className="text-3xl font-bold text-earth tracking-tighter">₹{total}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5 text-green font-bold text-[10px] uppercase tracking-tighter">
                          <CheckCircle2 size={12}/> Verified Pure Spices
                        </div>
                        <span className="text-earth/30 text-[9px] uppercase font-bold tracking-widest mt-1">Free delivery above ₹500</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setStep('form')}
                      className="w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-[0_20px_40px_rgba(230,164,0,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3"
                    >
                      Proceed to Secure Pay <ArrowLeft size={20} className="rotate-180" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-[0.2em] text-earth/30 px-2">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-green" /> 
                        <span>Trusted Checkout</span>
                      </div>
                      <span>Safe & Encrypted</span>
                    </div>
                    {paymentError && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-xs font-bold animate-pulse">
                        ⚠️ {paymentError}
                      </div>
                    )}

                    <button 
                      form="checkout-form"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-accent text-white font-bold rounded-2xl shadow-[0_20px_40px_rgba(217,107,0,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-3 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <CreditCard size={18} /> Confirm & Pay ₹{total}
                        </>
                      )}
                    </button>
                    <p className="text-center text-[9px] font-bold text-earth/20 uppercase tracking-[0.2em]">By paying you agree to our spice-delivery terms</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


