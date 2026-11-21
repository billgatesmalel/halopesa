import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export function PhoneAuthScreen({ lang, t, onBack, onContinue }) {
  const [phone, setPhone] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerName, setRegisterName] = useState('');

  // Validate phone input
  const cleanPhone = phone.replace(/\s+/g, '');
  const isValid = cleanPhone.length >= 9;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onContinue({
      phoneNumber: cleanPhone,
      name: registerName || 'HaloPesa Customer'
    });
  };

  return (
    <div className="w-full h-full min-h-screen sm:h-screen sm:max-h-[100dvh] bg-white flex flex-col justify-between px-6 pt-6 pb-6 select-none">
      {/* Top Section */}
      <div className="w-full flex-1 flex flex-col">
        {/* Back navigation button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={onBack}
            className="p-1 -ml-1 text-stone-700 hover:text-[#F05A22] transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Title */}
        <h1 className="text-[22px] sm:text-[24px] font-bold text-stone-900 tracking-tight mb-4">
          {isRegistering
            ? (lang === 'en' ? 'Register New Account' : 'Sajili Akaunti Mpya')
            : t.phoneTitle}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* If user clicked Register, ask for their name */}
          {isRegistering && (
            <div>
              <input
                type="text"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder={lang === 'en' ? 'Your full name' : 'Jina lako kamili'}
                className="w-full h-13 px-4 rounded-xl border border-stone-200 text-stone-900 text-[15px] focus:outline-none focus:border-[#F05A22] transition-colors mb-2"
                autoFocus
              />
            </div>
          )}

          {/* Phone Number Input */}
          <div className="w-full">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.phonePlaceholder}
              className="w-full h-13 px-4 rounded-xl border border-stone-200 text-stone-900 text-[15px] placeholder-stone-400 focus:outline-none focus:border-[#F05A22] transition-colors"
              autoFocus={!isRegistering}
            />
          </div>

          {/* Registration / Sign-in toggle link */}
          <div className="text-[13px] text-stone-500 pt-1">
            {!isRegistering ? (
              <span>
                {t.noAccountText}{' '}
                <button
                  type="button"
                  onClick={() => setIsRegistering(true)}
                  className="text-[#F05A22] font-semibold hover:underline cursor-pointer"
                >
                  {t.registerLink}
                </button>
              </span>
            ) : (
              <span>
                {lang === 'en' ? 'Already have an account? ' : 'Una akaunti tayari? '}
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="text-[#F05A22] font-semibold hover:underline cursor-pointer"
                >
                  {lang === 'en' ? 'Sign in' : 'Ingia'}
                </button>
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Bottom Section */}
      <div className="w-full shrink-0 flex flex-col gap-3 pt-4">
        {/* Legal Disclaimer */}
        <p className="text-[12px] sm:text-[12.5px] text-stone-500 leading-relaxed text-left">
          {t.termsPrefix}
          <span className="text-[#F05A22] cursor-pointer hover:underline">
            {t.termsLink}
          </span>
          {t.termsSuffix}
        </p>

        {/* Continue Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full h-12 rounded-xl font-bold text-[15px] transition-all flex items-center justify-center ${
            isValid
              ? 'bg-[#F05A22] hover:bg-[#D8450E] active:scale-[0.99] text-white cursor-pointer shadow-md shadow-orange-500/20'
              : 'bg-[#E5E7EB] text-stone-400 cursor-not-allowed'
          }`}
        >
          {t.continueButton}
        </button>
      </div>
    </div>
  );
}
