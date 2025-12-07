'use client';

import { useState } from 'react';
import { Phone, Mail, X } from 'lucide-react';

export default function ContactFloat() {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = '0382259920';
  const email = 'accueil.ensemblescolaire@lesrecollets.org';

  return (
    <>
      {/* Bouton flottant avec animations */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 bg-[#8C1515] hover:bg-[#a01919] text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center w-16 h-16 animate-pulse-ring border-2 border-white ${!isOpen ? 'animate-bounce-subtle' : ''}`}
        aria-label="Contact"
      >
        {/* Cercles pulsants en arrière-plan pour effet de vague */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#8C1515] animate-ping opacity-25"></span>
            <span className="absolute inset-0 rounded-full bg-[#8C1515] animate-ping opacity-15" style={{ animationDelay: '0.5s' }}></span>
          </>
        )}
        
        {/* Icône */}
        <span className="relative z-10">
          {isOpen ? (
            <X size={24} strokeWidth={2.5} />
          ) : (
            <Phone size={24} strokeWidth={2.5} />
          )}
        </span>
      </button>

      {/* Popup de contact */}
      {isOpen && (
        <>
          {/* Overlay pour fermer en cliquant à l'extérieur */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Popup */}
          <div className="fixed bottom-24 right-6 z-50 bg-white rounded-xl shadow-2xl p-6 min-w-[280px] max-w-[320px] animate-fade-in">
            <h3 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
              Contactez-nous
            </h3>
            
            <div className="space-y-4">
              {/* Téléphone */}
              <a
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="bg-[#8C1515] rounded-full p-2 group-hover:bg-[#a01919] transition-colors">
                  <Phone size={20} className="text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="font-[var(--font-inter)] text-xs text-gray-500 mb-1">
                    Téléphone
                  </p>
                  <p className="font-[var(--font-inter)] text-base font-semibold text-gray-900 group-hover:text-[#8C1515] transition-colors">
                    03 82 25 99 20
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="bg-[#8C1515] rounded-full p-2 group-hover:bg-[#a01919] transition-colors">
                  <Mail size={20} className="text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="font-[var(--font-inter)] text-xs text-gray-500 mb-1">
                    Email
                  </p>
                  <p className="font-[var(--font-inter)] text-sm font-semibold text-gray-900 group-hover:text-[#8C1515] transition-colors break-all">
                    {email}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}

