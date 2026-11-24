import React from 'react';
import { ArrowRight, Store, Wheat, Truck, Scissors, UtensilsCrossed, Building2 } from 'lucide-react';

export function BiasharaSectors({ onSelectSectorAndApply }) {
  const sectors = [
    {
      id: 'retail',
      image: '/images/retail_shop.jpg',
      titleEn: 'Retail & Small Shops',
      titleSw: 'Maduka & Biashara Ndogondogo',
      descEn: 'Duka la bidhaa, boutique, electronics & cosmetics shops needing fast inventory restocking.',
      descSw: 'Maduka ya vyakula, nguo, vifaa vya simu na vipodozi vinavyohitaji kuongeza bidhaa.',
      maxAmount: 'TZS 3,000,000'
    },
    {
      id: 'agriculture',
      image: '/images/agriculture.jpg',
      titleEn: 'Agriculture & Farming',
      titleSw: 'Kilimo & Ufugaji',
      descEn: 'Fertilizers, seeds, farm inputs, poultry feed, and crop harvesting working capital.',
      descSw: 'Mbolea, mbegu, pembejeo za kilimo, chakula cha kuku na mtaji wa uvunaji.',
      maxAmount: 'TZS 5,000,000'
    },
    {
      id: 'transport',
      image: '/images/transport.jpg',
      titleEn: 'Transport & Bodaboda',
      titleSw: 'Usafiri & Bodaboda / Bajaji',
      descEn: 'Spare parts, motorcycle servicing, licensing, and fleet expansion for drivers.',
      descSw: 'Spea, matengenezo ya pikipiki au bajaji, leseni, na uwekezaji wa madereva.',
      maxAmount: 'TZS 2,500,000'
    },
    {
      id: 'salon',
      image: '/images/salon.jpg',
      titleEn: 'Salon & Beauty Services',
      titleSw: 'Saluni & Huduma za Urembo',
      descEn: 'Hair dryers, braids, cosmetic products, barber machines, and salon upgrades.',
      descSw: 'Vifaa vya kukausha nywele, mahewa, vipodozi, mashine za kunyoa na uboreshaji wa saluni.',
      maxAmount: 'TZS 2,000,000'
    },
    {
      id: 'food',
      image: '/images/food.jpg',
      titleEn: 'Food & Restaurant Vendors',
      titleSw: 'Mama Ntilie & Migahawa',
      descEn: 'Daily food supplies, grains, meat, cooking oil, catering gas, and kitchen supplies.',
      descSw: 'Vyakula vya kila siku sokoni, nyama, mafuta ya kupikia, gesi na vyombo vya jikoni.',
      maxAmount: 'TZS 1,500,000'
    },
    {
      id: 'wholesale',
      image: '/images/wholesale.jpg',
      titleEn: 'Wholesale & Distribution',
      titleSw: 'Biashara za Jumla & Usambazaji',
      descEn: 'Bulk carton purchases, fast moving consumer goods (FMCG), and warehouse supply lines.',
      descSw: 'Ununuzi wa bidhaa kwa maboksi makubwa, vinywaji, na usambazaji wa bidhaa madukani.',
      maxAmount: 'TZS 5,000,000'
    }
  ];

  return (
    <section id="sectors" className="py-16 sm:py-20 bg-stone-50/70 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#F05A22] bg-orange-100 px-3 py-1 rounded-full">
            Supported Sectors / Sekta Zinazofadhiliwa
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            Business Funding for Every Industry
            <span className="block text-xl sm:text-2xl font-bold text-[#F05A22] mt-1">
              / Mikopo ya Biashara kwa Kila Sekta
            </span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Whether you run a neighbourhood retail shop or large agricultural operation, we provide dedicated working capital.
            <span className="block text-xs sm:text-sm text-stone-500 italic mt-0.5">
              / Iwe unamiliki duka la mtaani au mradi wa kilimo, tunakupa mtaji unaofaa biashara yako.
            </span>
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sec) => (
            <div
              key={sec.id}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Sector Image */}
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={sec.image}
                    alt={sec.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-white bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                      Up to {sec.maxAmount}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-extrabold text-stone-900 leading-snug">
                    {sec.titleEn}
                    <span className="block text-xs font-bold text-[#F05A22] mt-0.5">
                      / {sec.titleSw}
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                    {sec.descEn}
                  </p>
                  <p className="text-xs text-stone-500 italic mt-1 leading-relaxed">
                    {sec.descSw}
                  </p>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectSectorAndApply(sec.titleEn)}
                  className="w-full py-2.5 px-3 rounded-xl border border-orange-200 text-[#F05A22] bg-orange-50/60 hover:bg-[#F05A22] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Apply for this Sector / Omba Mkopo Huu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
