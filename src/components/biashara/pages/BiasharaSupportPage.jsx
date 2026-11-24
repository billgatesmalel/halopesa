import React, { useState } from 'react';
import {
  PhoneCall,
  Smartphone,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2
} from 'lucide-react';

export function BiasharaSupportPage() {
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="py-12 sm:py-16 bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-[#F05A22] bg-orange-100 px-3.5 py-1 rounded-full mb-3">
            Customer Care / Huduma kwa Wateja
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            We Are Here to Assist You 24/7
            <span className="block text-2xl sm:text-3xl font-bold text-[#F05A22] mt-2">
              / Tuko Hapa Kukusaidia Saa 24 Kila Siku
            </span>
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-3">
            Get instant assistance regarding your Biashara Loan application, repayment inquiries, or general support.
            <span className="block text-xs sm:text-sm text-stone-500 italic mt-0.5">
              / Pata usaidizi wa haraka kuhusu maombi yako ya mkopo, marejesho, au maswali ya jumla.
            </span>
          </p>
        </div>

        {/* Support Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Channel 1: Phone Helpline */}
          <div className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#F05A22] flex items-center justify-center font-bold mb-4">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
                Toll-Free Helpline / Simu ya Bure
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Call directly from your Halotel / HaloPesa line at zero charge.
              </p>
              <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5">
                <p className="text-lg font-black text-[#F05A22] font-mono">100</p>
                <p className="text-xs text-stone-600 font-mono">Direct / Nje ya Mtandao: <strong>0622 100 100</strong></p>
              </div>
            </div>
          </div>

          {/* Channel 2: USSD Self-Service */}
          <div className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#009A44] flex items-center justify-center font-bold mb-4">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
                USSD Self-Service Menu / Menyu ya Simu
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Access your loan status, balance, and repayments directly from any feature phone.
              </p>
              <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5">
                <p className="text-lg font-black text-[#009A44] font-mono">*150*88#</p>
                <p className="text-xs text-stone-600">Select Option 6: Biashara Loans</p>
              </div>
            </div>
          </div>

          {/* Channel 3: Agent Network */}
          <div className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
                HaloPesa Wakala / Mawakala
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Over 50,000 verified HaloPesa agents available nationwide across Tanzania.
              </p>
              <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5">
                <p className="text-sm font-extrabold text-stone-800">50,000+ Verified Agents</p>
                <p className="text-xs text-stone-600">Cash in, cash out & loan repayment anywhere</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form & Office Information */}
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F05A22]">
              Send a Message / Tuma Ujumbe
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
              Have an Inquiry or Feedback?
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              Fill out this quick form and a HaloPesa customer care specialist will contact you on your registered number within 15 minutes.
            </p>

            <div className="space-y-3 pt-3 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F05A22]" />
                <span>Operating Hours: 24/7/365 (Saa 24 kila siku)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#009A44]" />
                <span>Regulated by Bank of Tanzania (BOT) Digital Microfinance Guidelines</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            {formSent ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#009A44] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-extrabold text-emerald-900">
                  Message Sent Successfully / Ujumbe Umetumwa!
                </h4>
                <p className="text-xs text-emerald-800">
                  Thank you, {name}. Our customer support team will contact you shortly on <strong>{phone}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Your Name / Jina Lako *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Halima Said"
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Phone Number / Namba ya Simu *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0622 123 456"
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Your Question or Message / Ujumbe Wako *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you regarding Biashara Loans? / Tunawezaje kukusaidia?"
                    className="w-full p-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] bg-white transition-colors"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-5 rounded-xl font-extrabold text-white text-sm bg-[#F05A22] hover:bg-[#D8450E] active:scale-[0.98] shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message / Tuma Ujumbe</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
