/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Truck, 
  MessageSquare, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Package, 
  Weight, 
  Calendar,
  Info,
  Navigation,
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const COMPANY_NAME = "Javed Malik Goods Transport Company - Regd";
const PHONE_NUMBER = "0300 6869185";
const WHATSAPP_NUMBER = "923006869185";
const LOCATION = "Jhang Road, Muzaffargarh, Pakistan";

// Sound effect URLs (Using generic professional sounds)
const POP_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3";
const SUCCESS_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3";

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    pickup: '',
    delivery: '',
    goodsType: '',
    vehicleType: 'Pickup',
    weight: '',
    loadingDate: '',
    extraDetails: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const popAudioRef = useRef<HTMLAudioElement | null>(null);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    popAudioRef.current = new Audio(POP_SOUND_URL);
    successAudioRef.current = new Audio(SUCCESS_SOUND_URL);
  }, []);

  const playPop = () => {
    if (popAudioRef.current) {
      popAudioRef.current.currentTime = 0;
      popAudioRef.current.play().catch(e => console.log("Audio playback blocked", e));
    }
  };

  const playSuccess = () => {
    if (successAudioRef.current) {
      successAudioRef.current.currentTime = 0;
      successAudioRef.current.play().catch(e => console.log("Audio playback blocked", e));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playPop();
    setIsSubmitting(true);

    // Prepare WhatsApp message
    const message = `*New Transport Booking Request*\n\n` +
      `*Client:* ${formData.name}\n` +
      `*Mobile:* ${formData.mobile}\n` +
      `*Pickup:* ${formData.pickup}\n` +
      `*Delivery:* ${formData.delivery}\n` +
      `*Goods:* ${formData.goodsType}\n` +
      `*Vehicle:* ${formData.vehicleType}\n` +
      `*Weight:* ${formData.weight}\n` +
      `*Date:* ${formData.loadingDate}\n` +
      `*Details:* ${formData.extraDetails || 'N/A'}`;

    // Simulate small delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      playSuccess();
      
      // Open WhatsApp
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setShowSuccess(false);
      }, 2000);
    }, 1000);
  };

  const services = [
    { icon: <Package className="w-6 h-6" />, title: "Cargo Services", desc: "Reliable cargo handling for all types of goods across Pakistan." },
    { icon: <Truck className="w-6 h-6" />, title: "Truck Booking", desc: "Book large trucks for heavy bulk transport between cities." },
    { icon: <Navigation className="w-6 h-6" />, title: "Delivery Service", desc: "On-time delivery to your doorstep with real-time updates." },
    { icon: <Clock className="w-6 h-6" />, title: "Pickup Booking", desc: "Quick pickup services for small and medium-sized shipments." },
    { icon: <ShieldCheck className="w-6 h-6" />, title: "Safe Freight", desc: "Extra care for fragile goods with our specialized freight team." },
    { icon: <Star className="w-6 h-6" />, title: "Goods Transport", desc: "Comprehensive transport solutions for regular supply chains." },
  ];

  const steps = [
    { number: "01", title: "Fill Details", desc: "Provide your pickup, delivery, and goods information in the form below." },
    { number: "02", title: "Submit Form", desc: "Click the 'Submit Order' button to generate your booking request." },
    { number: "03", title: "WhatsApp Confirm", desc: "The app will automatically open WhatsApp. Just press send." },
    { number: "04", title: "Get Quote", desc: "Our team will reply on WhatsApp with the best possible price quote." },
  ];

  const scrollToBooking = () => {
    const el = document.getElementById('booking-form');
    if (el) {
      playPop();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const callNow = () => {
    playPop();
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  const sendWhatsApp = () => {
    playPop();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
  };

  const getLocation = () => {
    playPop();
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LOCATION)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col md:overflow-hidden selection:bg-amber-100 selection:text-amber-900">
      {/* Header Section */}
      <header className="bg-slate-900 text-white p-4 md:p-6 shadow-md border-b-4 border-amber-500 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none uppercase">
              Javed Malik <span className="text-amber-500">Goods Transport</span>
            </h1>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-semibold">
              Registered Cargo & Freight Company • Jhang Road, Muzaffargarh
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right hidden md:block">
              <p className="text-[10px] uppercase text-amber-500 font-bold">Help Line</p>
              <p className="text-xl font-mono leading-none">{PHONE_NUMBER}</p>
            </div>
            <button 
              onClick={callNow}
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-2.5 rounded font-black text-sm uppercase transition-all shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Phone size={16} />
              Call Now
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-0 md:bg-white md:shadow-2xl overflow-hidden">
        {/* Sidebar: Info & Guide */}
        <section className="col-span-1 md:col-span-4 bg-slate-100 md:border-r border-slate-200 p-6 md:p-10 flex flex-col justify-between gap-12 overflow-y-auto hidden md:flex">
          <div>
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6 border-l-4 border-amber-500 pl-3">
                <h2 className="text-xl font-black uppercase tracking-tight">Our Services</h2>
                <span className="bg-amber-500 text-slate-900 text-[8px] font-black px-2 py-0.5 rounded uppercase">Verified</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {services.map((s, i) => (
                  <div key={i} className="bg-white p-4 rounded shadow-sm border border-slate-200 group hover:border-amber-500 transition-colors">
                    <div className="text-amber-500 mb-2 group-hover:scale-110 transition-transform">{s.icon}</div>
                    <p className="text-[10px] font-black uppercase tracking-tighter leading-tight">{s.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black mb-6 border-l-4 border-amber-500 pl-3 uppercase tracking-tight">How to Book</h2>
              <ul className="space-y-6">
                {steps.map((step, i) => (
                  <li key={i} className="flex items-start space-x-4 group">
                    <span className="bg-slate-900 text-amber-500 w-7 h-7 flex items-center justify-center rounded-full text-xs font-black shrink-0 group-hover:scale-110 transition-transform">
                      {step.number.replace(/^0/, '')}
                    </span>
                    <div>
                      <p className="text-sm font-black uppercase mb-1 tracking-tight">{step.title}</p>
                      <p className="text-[11px] text-slate-500 leading-snug">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl text-white shadow-xl shadow-slate-200 border-b-2 border-amber-500">
            <p className="text-[10px] uppercase font-black text-amber-500 mb-2 tracking-widest">Location</p>
            <p className="text-xs italic mb-4 text-slate-300">Opposite Bypass, Jhang Road, Muzaffargarh, Pakistan</p>
            <button 
              onClick={getLocation}
              className="w-full py-3 bg-slate-800 text-[10px] font-black uppercase rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Navigation size={14} className="text-amber-500" />
              Get Location
            </button>
          </div>
        </section>

        {/* Main: Booking Form */}
        <section className="col-span-1 md:col-span-8 p-6 md:p-12 flex flex-col bg-white md:overflow-y-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
                Online Booking <span className="text-amber-500 text-6xl">.</span>
              </h2>
              <p className="text-slate-500 text-sm mt-1 font-medium italic">Reliable freight transport across Pakistan.</p>
            </div>
            <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-amber-200">
              Live & Available 24/7
            </span>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-24 md:pb-0">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 pl-1 tracking-widest">Customer Name</label>
              <input 
                required
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ali Ahmed" 
                className="w-full bg-white border-2 border-slate-200 p-4 rounded-lg focus:border-amber-500 focus:ring-0 outline-none font-bold transition-all text-slate-900" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 pl-1 tracking-widest">Mobile Number</label>
              <input 
                required
                type="tel" 
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="0300 1234567" 
                className="w-full bg-white border-2 border-slate-200 p-4 rounded-lg focus:border-amber-500 outline-none font-bold font-mono transition-all text-slate-900" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 pl-1 tracking-widest">Pickup Location</label>
              <input 
                required
                type="text" 
                name="pickup"
                value={formData.pickup}
                onChange={handleInputChange}
                placeholder="City, Area" 
                className="w-full bg-white border-2 border-slate-200 p-4 rounded-lg focus:border-amber-500 outline-none font-bold transition-all text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 pl-1 tracking-widest">Delivery Location</label>
              <input 
                required
                type="text" 
                name="delivery"
                value={formData.delivery}
                onChange={handleInputChange}
                placeholder="City, Area" 
                className="w-full bg-white border-2 border-slate-200 p-4 rounded-lg focus:border-amber-500 outline-none font-bold transition-all text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 pl-1 tracking-widest">Goods Type</label>
              <input 
                required
                type="text" 
                name="goodsType"
                value={formData.goodsType}
                onChange={handleInputChange}
                placeholder="Furniture, Rice, Machinery..." 
                className="w-full bg-white border-2 border-slate-200 p-4 rounded-lg focus:border-amber-500 outline-none font-bold transition-all text-slate-900"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-500 pl-1 tracking-widest">Vehicle Type</label>
                <select 
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                  className="w-full bg-white border-2 border-slate-200 p-4 rounded-lg focus:border-amber-500 outline-none font-bold appearance-none transition-all text-slate-900"
                >
                  <option>Mazda</option>
                  <option>Mini Truck</option>
                  <option>22 Wheeler</option>
                  <option>Container</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-500 pl-1 tracking-widest">Weight (Approx)</label>
                <input 
                  required
                  type="text" 
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="KG / Tons" 
                  className="w-full bg-white border-2 border-slate-200 p-4 rounded-lg focus:border-amber-500 outline-none font-bold transition-all text-slate-900"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 pl-1 tracking-widest">Loading Date</label>
              <input 
                required
                type="date" 
                name="loadingDate"
                value={formData.loadingDate}
                onChange={handleInputChange}
                className="w-full bg-white border-2 border-slate-200 p-4 rounded-lg focus:border-amber-500 outline-none font-bold transition-all text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 pl-1 tracking-widest">Extra Details</label>
              <input 
                type="text" 
                name="extraDetails"
                value={formData.extraDetails}
                onChange={handleInputChange}
                placeholder="Urgent, fragile, etc." 
                className="w-full bg-white border-2 border-slate-200 p-4 rounded-lg focus:border-amber-500 outline-none font-bold transition-all text-slate-900"
              />
            </div>
            
            <div className="md:col-span-2 pt-6">
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-slate-900 hover:bg-black text-amber-500 py-6 rounded-lg font-black uppercase text-xl flex items-center justify-center gap-4 transition-all shadow-[0_20px_50px_rgba(15,23,42,0.3)] disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <span>Confirm Booking via WhatsApp</span>
                    <MessageSquare size={28} />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </section>
      </main>

      {/* Persistent Footer Actions */}
      <footer className="bg-white border-t border-slate-200 p-2 md:p-4 fixed bottom-0 left-0 w-full md:relative md:bottom-auto md:left-auto z-40 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto flex justify-around md:justify-center items-center gap-2 md:gap-24">
          <button 
            onClick={sendWhatsApp} 
            className="flex flex-col items-center group cursor-pointer flex-1 md:flex-none"
          >
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-100">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">WhatsApp</span>
          </button>
          
          <div className="h-10 w-[1px] bg-slate-200"></div>
          
          <button 
            onClick={callNow} 
            className="flex flex-col items-center group cursor-pointer flex-1 md:flex-none"
          >
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform shadow-lg shadow-slate-200">
              <Phone className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">Direct Call</span>
          </button>
          
          <div className="h-10 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
          
          <div className="text-center hidden md:block">
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em] leading-none">Trusted by 500+ Local Businesses</p>
            <p className="text-[10px] text-amber-600 font-black uppercase tracking-widest mt-1.5">Registered Under Pakistan Transport Act</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-xl p-10 max-w-sm w-full text-center space-y-6 shadow-2xl border-b-8 border-amber-500"
            >
              <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-amber-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Order Ready!</h3>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-tight">Opening WhatsApp...<br/>Please click "Send" to finalize.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
