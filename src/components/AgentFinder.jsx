import React, { useState } from 'react';
import { MapPin, Search, Phone, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function AgentFinder({ t, lang }) {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const agents = [
    {
      id: 1,
      name: "Halotel Direct Service Center - Mwenge",
      region: "Dar es Salaam",
      district: "Kinondoni",
      address: "Old Bagamoyo Rd, Opposite Mwenge Complex",
      agentCode: "882910",
      hours: "08:00 - 20:00 (Mon - Sun)",
      phone: "+255 622 100 100",
      verified: true,
      float: "High Cash Float (Over 20M TZS)",
      services: ["Cash In", "Cash Out", "SIM Swap", "HaloKikoba Help"]
    },
    {
      id: 2,
      name: "Kariakoo Super Wakala - Msimbazi",
      region: "Dar es Salaam",
      district: "Ilala",
      address: "Msimbazi Street near Big Bon",
      agentCode: "884102",
      hours: "07:30 - 21:00",
      phone: "+255 628 341 902",
      verified: true,
      float: "High Cash Float",
      services: ["Cash In", "Cash Out", "Merchant Payment"]
    },
    {
      id: 3,
      name: "Arusha Clock Tower Branch",
      region: "Arusha",
      district: "Arusha Urban",
      address: "Boma Road, Next to Post Office",
      agentCode: "881230",
      hours: "08:00 - 18:30",
      phone: "+255 621 890 120",
      verified: true,
      float: "High Cash Float",
      services: ["Cash In", "Cash Out", "SIM Registration"]
    },
    {
      id: 4,
      name: "Mwanza Rock City Halotel Hub",
      region: "Mwanza",
      district: "Nyamagana",
      address: "Kenyatta Road, Mwanza CBD",
      agentCode: "885741",
      hours: "08:00 - 19:00",
      phone: "+255 629 112 334",
      verified: true,
      float: "High Cash Float",
      services: ["Cash In", "Cash Out", "Bank Bridge"]
    },
    {
      id: 5,
      name: "Dodoma Capital Service Plaza",
      region: "Dodoma",
      district: "Dodoma Urban",
      address: "Kuu Street, Near Jamatini Roundabout",
      agentCode: "883901",
      hours: "08:00 - 19:30",
      phone: "+255 624 556 778",
      verified: true,
      float: "High Cash Float",
      services: ["Cash In", "Cash Out", "Government GePG"]
    },
    {
      id: 6,
      name: "Zanzibar Stone Town Agent Hub",
      region: "Zanzibar",
      district: "Mjini",
      address: "Darajani Market Plaza, Zanzibar Town",
      agentCode: "887019",
      hours: "08:00 - 20:00",
      phone: "+255 627 990 011",
      verified: true,
      float: "High Cash Float",
      services: ["Cash In", "Cash Out", "Tourist SIMs"]
    }
  ];

  const filteredAgents = agents.filter((ag) => {
    const matchesRegion = selectedRegion === 'All' || ag.region === selectedRegion;
    const matchesSearch =
      ag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ag.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ag.agentCode.includes(searchTerm);
    return matchesRegion && matchesSearch;
  });

  const regions = ['All', 'Dar es Salaam', 'Arusha', 'Mwanza', 'Dodoma', 'Zanzibar'];

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>{t.navAgents}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
          {t.agentFinderTitle}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          {t.agentFinderSubtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={lang === 'en' ? 'Search by name, agent code (e.g. 882910) or street...' : 'Tafuta kwa jina, namba ya wakala au eneo...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22]"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {regions.map((reg) => (
            <button
              key={reg}
              type="button"
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                selectedRegion === reg
                  ? 'bg-[#F05A22] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {reg === 'All' ? t.allRegions : reg}
            </button>
          ))}
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAgents.map((ag) => (
          <div
            key={ag.id}
            className="p-5 rounded-2xl border border-stone-200 hover:border-orange-300 hover:shadow-md transition-all bg-gradient-to-b from-white to-stone-50/50 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-orange-100 text-[#F05A22]">
                    {ag.region}
                  </span>
                  <h3 className="text-sm font-bold text-stone-900 mt-1.5">
                    {ag.name}
                  </h3>
                </div>
                {ag.verified && (
                  <span className="p-1 text-emerald-600" title="BOT & Halotel Verified">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div className="text-xs text-stone-600 space-y-1.5">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                  <span>{ag.address}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{ag.hours}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{ag.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {ag.services.map((srv, i) => (
                  <span key={i} className="text-[10px] font-medium bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-stone-200/80 flex items-center justify-between text-xs">
              <div className="font-mono text-stone-600 font-medium">
                Wakala ID: <span className="text-stone-900 font-bold">{ag.agentCode}</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Available
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
