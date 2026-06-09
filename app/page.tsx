import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E1 Unico Corporation — All-In-One Business Launch & Consulting",
  description: "BBB Accredited business launch & consulting firm. The 2K Special gets your business registered, branded, and operating. Evenings 7:30–9:30 PM · 1-833-E1-UNICO",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white font-sans">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/e1unico-logo.jpg" alt="E1 Unico Corporation" width={40} height={40} className="w-10 h-10 object-contain rounded-lg bg-white p-0.5" />
            <div>
              <p className="font-black text-sm leading-none">E1 Unico</p>
              <p className="text-[10px] text-indigo-400 leading-none font-semibold tracking-wide">CORPORATION</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-gray-400">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#unicoos" className="hover:text-white transition-colors">UnicoOS</a>
            <a href="#companies" className="hover:text-white transition-colors">Our Companies</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <a href="tel:18333186426" className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors">
            📞 Call Now
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-5 pt-20 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-purple-900/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* BBB Badge */}
          <div className="flex justify-center mb-6">
            <a href="https://www.bbb.org/us/tx/spring/profile/business-consultant/e1-unico-corporation-0915-90076784/" target="_blank" rel="nofollow"
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 hover:bg-white/10 transition-colors">
              <Image src="https://seal-houston.bbb.org/customer-reviews/badge-10-bbb-90076784.png" alt="BBB Accredited" width={60} height={40} className="h-10 w-auto object-contain" unoptimized />
              <div className="text-left">
                <p className="text-white text-xs font-bold leading-none">BBB® Accredited Business</p>
                <p className="text-indigo-400 text-[10px] mt-0.5">E1 Unico Corporation · Since 03/2026</p>
              </div>
            </a>
          </div>

          <Image src="/e1unico-logo.jpg" alt="E1 Unico Corporation" width={120} height={120} className="w-24 h-24 object-contain mx-auto mb-6 rounded-2xl bg-white p-2" />

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight mb-4">
            We Launch<br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Real Businesses.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-3">
            BBB Accredited · Business Launch & Consulting · Texas Based
          </p>
          <p className="text-gray-500 text-sm mb-10">
            Available evenings <strong className="text-white">7:30–9:30 PM</strong> · 7 days a week
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#services"
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-bold px-8 py-4 rounded-2xl text-base shadow-xl shadow-indigo-900/40 transition-opacity">
              🚀 The 2K Special →
            </a>
            <a href="tel:18333186426"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-2xl text-base transition-colors">
              📞 1-833-E1-UNICO
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-14 max-w-lg mx-auto">
            {[
              { val: "BBB®", label: "Accredited" },
              { val: "7 Days", label: "A Week" },
              { val: "$2K", label: "Gets You Live" },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <p className="text-2xl font-black text-white">{s.val}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2K SPECIAL ── */}
      <section id="services" className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Our Signature Service</p>
          <h2 className="text-3xl sm:text-5xl font-black text-center mb-4">The <span className="text-indigo-400">2K Special</span></h2>
          <p className="text-center text-gray-400 max-w-xl mx-auto mb-12 text-sm">
            One flat fee. Everything you need to go from idea to operating business — handled for you.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              {[
                { emoji: "📋", title: "Business Entity Formation", desc: "LLC or Corporation — we handle the paperwork with the state" },
                { emoji: "🔢", title: "EIN / Federal Tax ID", desc: "Your business tax ID, ready to open a bank account and hire" },
                { emoji: "📍", title: "Registered Agent (1 Year)", desc: "We receive your official documents — keeps your address private" },
                { emoji: "🎨", title: "Logo + Basic Branding", desc: "Professional logo and brand kit to look legit from day one" },
                { emoji: "📧", title: "Business Email Setup", desc: "youremail@yourbusiness.com — not a Gmail" },
                { emoji: "📍", title: "Google Business Profile", desc: "Show up on Google Maps and get found by local customers" },
                { emoji: "💻", title: "UnicoOS Starter — 1 Month Free", desc: "Run your entire business from one platform" },
                { emoji: "🧠", title: "1-on-1 Strategy Consultation", desc: "Sit down with us and map out your launch plan" },
              ].map(item => (
                <div key={item.title} className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-colors">
                  <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                  <div>
                    <p className="font-bold text-white text-sm">{item.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price card */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 border-2 border-indigo-500/40 rounded-3xl p-8 text-center">
                <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">Everything Above For</p>
                <p className="text-7xl font-black text-white mb-1">$2,000</p>
                <p className="text-gray-400 text-sm mb-8">One-time · No hidden fees</p>

                <a href="tel:18333186426"
                  className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-black text-lg py-4 rounded-2xl mb-4 transition-opacity">
                  📞 Call to Get Started
                </a>
                <p className="text-gray-500 text-xs">1-833-E1-UNICO · Available evenings 7:30–9:30 PM</p>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <a href="https://www.bbb.org/us/tx/spring/profile/business-consultant/e1-unico-corporation-0915-90076784/" target="_blank" rel="nofollow"
                    className="flex items-center justify-center gap-2 hover:opacity-80 transition-opacity">
                    <Image src="https://seal-houston.bbb.org/customer-reviews/badge-10-bbb-90076784.png" alt="BBB" width={50} height={34} className="h-8 w-auto" unoptimized />
                    <span className="text-xs text-gray-400">BBB® Accredited Since 2026</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── UNICOOS FEATURE ── */}
      <section id="unicoos" className="py-20 px-5 bg-gradient-to-br from-indigo-950/50 to-purple-950/50 border-t border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <Image src="/unicoos-logo.jpg" alt="UnicoOS" width={56} height={56} className="w-14 h-14 object-contain rounded-xl bg-white p-1" />
                <div>
                  <p className="text-2xl font-black text-white">UnicoOS</p>
                  <p className="text-indigo-400 text-xs font-semibold">OS.E1Unico.com</p>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-4">
                Run Your Entire Business<br />
                <span className="text-cyan-400">From One App.</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                UnicoOS is our all-in-one Business Operating System — built by E1 Unico Corporation.
                CRM, invoicing, AI receptionist, safety modules, fleet tracking, accounting, and more.
                Used by every E1 Unico client.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {["CRM & Sales Pipeline","AI Agents (6 Specialists)","UniRo AI Receptionist","UniBook Accounting","HSE Safety Module","TruckOS + Fleet","Insurance CRM","Restaurant Manager","Equipment Rentals","UniCredit Score","UniFleet GPS","And much more..."].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-gray-300">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" />{f}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="https://OS.E1Unico.com/register" target="_blank" rel="noreferrer"
                  className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 text-white font-bold px-6 py-3 rounded-xl text-sm transition-opacity">
                  🚀 Try Free — 30 Day Trial
                </a>
                <a href="https://OS.E1Unico.com" target="_blank" rel="noreferrer"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors">
                  Visit OS.E1Unico.com →
                </a>
              </div>
            </div>

            {/* Pricing cards */}
            <div className="lg:w-72 flex-shrink-0 space-y-3">
              {[
                { plan: "Starter", price: "$97", color: "border-gray-600", badge: "" },
                { plan: "Professional", price: "$297", color: "border-indigo-500", badge: "Popular" },
                { plan: "Enterprise", price: "$497", color: "border-purple-500", badge: "Full Platform" },
              ].map(p => (
                <div key={p.plan} className={`bg-white/5 border ${p.color} rounded-2xl p-4 flex items-center justify-between`}>
                  <div>
                    <p className="font-bold text-white text-sm">{p.plan}</p>
                    {p.badge && <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">{p.badge}</span>}
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-white">{p.price}</p>
                    <p className="text-gray-500 text-xs">/month</p>
                  </div>
                </div>
              ))}
              <a href="https://OS.E1Unico.com/register" target="_blank" rel="noreferrer"
                className="block text-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-bold py-3 rounded-xl text-sm transition-opacity">
                Start Free — No Card Required
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR COMPANIES ── */}
      <section id="companies" className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">The E1 Unico Family</p>
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-3">Our Companies</h2>
          <p className="text-center text-gray-500 text-sm mb-12">One vision. Built to serve industries that matter.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* E1 Unico */}
            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-2xl p-6">
              <Image src="/e1unico-logo.jpg" alt="E1 Unico Corporation" width={64} height={64} className="w-16 h-16 object-contain rounded-xl bg-white p-1 mb-4" />
              <p className="font-black text-white text-lg mb-1">E1 Unico Corporation</p>
              <p className="text-indigo-400 text-xs font-semibold mb-3">Business Launch & Consulting · BBB Accredited</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">All-in-one business launch services. Our signature 2K Special gets your business registered, branded, and ready to operate.</p>
              <a href="tel:18333186426" className="text-indigo-400 text-xs font-semibold hover:text-white transition-colors">📞 1-833-E1-UNICO →</a>
            </div>

            {/* UnicoOS */}
            <div className="bg-gradient-to-br from-cyan-900/30 to-indigo-900/40 border border-cyan-500/30 rounded-2xl p-6">
              <Image src="/unicoos-logo.jpg" alt="UnicoOS" width={64} height={64} className="w-16 h-16 object-contain rounded-xl bg-white p-1 mb-4" />
              <p className="font-black text-white text-lg mb-1">UnicoOS</p>
              <p className="text-cyan-400 text-xs font-semibold mb-3">Business Operating System · SaaS Platform</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">The all-in-one platform to run every part of your business — CRM, AI, accounting, safety, fleet, and more.</p>
              <a href="https://OS.E1Unico.com" target="_blank" rel="noreferrer" className="text-cyan-400 text-xs font-semibold hover:text-white transition-colors">🌐 OS.E1Unico.com →</a>
            </div>

            {/* Industrial Drip */}
            <div className="bg-gradient-to-br from-red-900/30 to-gray-900/40 border border-red-700/30 rounded-2xl p-6">
              <Image src="/industrial-drip-logo.jpg" alt="Industrial Drip" width={140} height={56} className="h-12 w-auto object-contain rounded-lg bg-white p-1 mb-4" />
              <p className="font-black text-white text-lg mb-1">Industrial Drip</p>
              <p className="text-red-400 text-xs font-semibold mb-3">PPE & Safety Gear · E-Commerce</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">Premium personal protective equipment for industrial workers. Hard hats, vests, gloves, boots — shipped fast.</p>
              <a href="https://IndustrialDrip.Net" target="_blank" rel="noreferrer" className="text-red-400 text-xs font-semibold hover:text-white transition-colors">🛡️ IndustrialDrip.Net →</a>
            </div>

            {/* Custom UnicoOS */}
            <div className="bg-gradient-to-br from-slate-800/60 to-indigo-900/30 border border-indigo-400/30 rounded-2xl p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 text-2xl">🎨</div>
              <p className="font-black text-white text-lg mb-1">Custom UnicoOS</p>
              <p className="text-indigo-400 text-xs font-semibold mb-3">White-Label Business Platform · $2,000/mo</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">Want your own branded Business OS? We build UnicoOS under your company's name, logo, and domain. You own the platform.</p>
              <a href="tel:18333186426" className="text-indigo-400 text-xs font-semibold hover:text-white transition-colors">📞 Call to Learn More →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 px-5 bg-gradient-to-br from-indigo-950/60 to-[#0a0a0f] border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Ready to Start?</p>
          <h2 className="text-3xl sm:text-5xl font-black mb-4">Let's Build<br /><span className="text-indigo-400">Your Business.</span></h2>
          <p className="text-gray-400 text-sm mb-10">We're available evenings, 7 days a week. No appointment needed — just call.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: "📞", label: "Phone", value: "1-833-E1-UNICO", sub: "1-833-318-6426", href: "tel:18333186426" },
              { icon: "📧", label: "Email", value: "Unico@E1Unico.com", sub: "We respond fast", href: "mailto:Unico@E1Unico.com" },
              { icon: "🕗", label: "Hours", value: "7:30 – 9:30 PM", sub: "Every day of the week", href: null },
            ].map(c => (
              <div key={c.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-3xl mb-3">{c.icon}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{c.label}</p>
                {c.href ? (
                  <a href={c.href} className="font-bold text-white text-sm hover:text-indigo-400 transition-colors block">{c.value}</a>
                ) : (
                  <p className="font-bold text-white text-sm">{c.value}</p>
                )}
                <p className="text-gray-500 text-xs mt-0.5">{c.sub}</p>
              </div>
            ))}
          </div>

          <a href="tel:18333186426"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-2xl shadow-indigo-900/50 transition-opacity">
            📞 Call 1-833-E1-UNICO
          </a>

          {/* BBB */}
          <div className="flex justify-center mt-10">
            <a href="https://www.bbb.org/us/tx/spring/profile/business-consultant/e1-unico-corporation-0915-90076784/" target="_blank" rel="nofollow"
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 hover:bg-white/10 transition-colors">
              <Image src="https://seal-houston.bbb.org/customer-reviews/badge-10-bbb-90076784.png" alt="BBB Accredited" width={60} height={40} className="h-10 w-auto" unoptimized />
              <div className="text-left">
                <p className="text-white text-xs font-bold">BBB® Accredited Business</p>
                <a href="https://www.bbb.org/houston/customer-reviews/business-consultant/e1-unico-corporation-in-spring-tx-90076784/add/" target="_blank" rel="nofollow" className="text-indigo-400 text-[10px] hover:text-white transition-colors">Leave a BBB Review →</a>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 py-8 px-5 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 mb-4">
            <a href="https://OS.E1Unico.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">UnicoOS →</a>
            <a href="https://IndustrialDrip.Net" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">IndustrialDrip.Net →</a>
            <a href="tel:18333186426" className="hover:text-white transition-colors">1-833-E1-UNICO</a>
            <a href="mailto:Unico@E1Unico.com" className="hover:text-white transition-colors">Unico@E1Unico.com</a>
          </div>
          <p className="text-gray-600 text-xs">© 2026 E1 Unico Corporation · BBB® Accredited · Texas · Building the Empire 🦅</p>
        </div>
      </footer>

    </main>
  );
}
