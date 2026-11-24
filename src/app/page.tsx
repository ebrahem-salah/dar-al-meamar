'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Search, 
  Filter, 
  Sparkles, 
  ShieldCheck, 
  PhoneCall, 
  MessageSquare, 
  ChevronDown, 
  Award, 
  Home, 
  Users, 
  Clock, 
  ArrowRight,
  Calculator,
  Compass,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import PropertyCard, { PropertyItem } from '@/components/PropertyCard';
import MortgageCalculator from '@/components/MortgageCalculator';
import { initialProperties } from '@/lib/seedProperties';

export default function HomePage() {
  const [properties, setProperties] = useState<PropertyItem[]>(initialProperties as any);
  const [loading, setLoading] = useState(false);
  const [availableCities, setAvailableCities] = useState<string[]>([
    'القاهرة الجديدة',
    'الشيخ زايد',
    'العاصمة الإدارية',
    'المستقبل سيتي',
    'الساحل الشمالي'
  ]);

  // Filter States
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBedrooms, setSelectedBedrooms] = useState('all');

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search.trim()) params.append('search', search.trim());
      if (selectedCity !== 'all') params.append('city', selectedCity);
      if (selectedType !== 'all') params.append('type', selectedType);
      if (selectedBedrooms !== 'all') params.append('bedrooms', selectedBedrooms);

      const res = await fetch(`/api/properties?${params.toString()}`);
      const data = await res.json();
      if (data.success && data.properties) {
        setProperties(data.properties);
        if (data.availableCities?.length) setAvailableCities(data.availableCities);
      }
    } catch (e) {
      console.error('Failed to filter properties:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProperties();
    }, 250);
    return () => clearTimeout(delay);
  }, [search, selectedCity, selectedType, selectedBedrooms]);

  const whatsappVIPNumber = '201096986091';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top VIP Bar */}
      <div className="bg-[#0b1c2d] text-amber-300 text-xs py-2 px-4 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">استشارات عقارية مجانية وجولات معاينة خاصة بسيارة الشركة VIP</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono">
            <a href="tel:+201096986091" className="hover:underline flex items-center gap-1">
              <PhoneCall className="w-3 h-3" />
              <span>+20 109 698 6091</span>
            </a>
            <span className="opacity-40">|</span>
            <span className="text-slate-300">خدمة عملاء 24/7</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0f2942]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0f2942] to-[#1e4e79] dark:from-amber-500 dark:to-amber-600 flex items-center justify-center text-white dark:text-slate-950 shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-950 dark:text-white">دار المعمار</span>
                <span className="text-amber-600 dark:text-amber-400 text-xl font-black">.</span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-300 block font-bold -mt-1 tracking-wider uppercase">
                Real Estate & Development
              </span>
            </div>
          </Link>

          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-700 dark:text-slate-200">
            <a href="#properties" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">عقارات مميزة</a>
            <a href="#calculator" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">حاسبة الأقساط</a>
            <a href="#about" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">عن دار المعمار</a>
            <a href="#contact" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">تواصل معنا</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href={`https://wa.me/${whatsappVIPNumber}?text=${encodeURIComponent('مرحباً دار المعمار، أرغب في استشارة عقارية وحجز جولة معاينة لأحدث المشروعات المتاحة.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">حجز جولة معاينة VIP</span>
              <span className="sm:hidden">واتساب</span>
            </a>
          </div>

        </div>
      </header>

      {/* Hero Showcase Section */}
      <section className="relative overflow-hidden bg-[#0a192f] text-white py-16 sm:py-24 border-b border-slate-800">
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury Architecture"
            className="w-full h-full object-cover opacity-25 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold backdrop-blur-md">
            <Award className="w-4 h-4 text-amber-400" />
            <span>المنصة الأولى للعقارات الفاخرة والاستثمار الموثوق</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            امتلك عقارك الراقي في أرقى مشروعات <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
              القاهرة الجديدة، الشيخ زايد، والساحل
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            فلل مستقلة، تاون هاوس، وبنتهاوس فندقية بتشطيبات عالمية، بمقدم يبدأ من 5% وأطول فترات سداد حتى 10 سنوات بدون فوائد مع كبار المطورين العقاريين.
          </p>

          {/* Quick Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 text-xs font-bold text-slate-200">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
              <span className="text-amber-400 font-mono text-xl font-black block">+15 سنة</span>
              <span className="text-slate-400 text-[11px]">خبرة عقارية معتمدة</span>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
              <span className="text-amber-400 font-mono text-xl font-black block">+850 وحدة</span>
              <span className="text-slate-400 text-[11px]">تم تسليمها بنجاح</span>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
              <span className="text-amber-400 font-mono text-xl font-black block">0% فوائد</span>
              <span className="text-slate-400 text-[11px]">تسهيلات وتقسيط مريح</span>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
              <span className="text-amber-400 font-mono text-xl font-black block">100% موثق</span>
              <span className="text-slate-400 text-[11px]">أعلى أمان استثماري</span>
            </div>
          </div>

          {/* Search & Filter Floating Card */}
          <div className="pt-6">
            <div className="bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-lg text-slate-900 dark:text-white max-w-4xl mx-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                {/* Search Text */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="ابحث بالمنطقة أو كود الوحدة..."
                    className="w-full pr-10 pl-3 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* City Filter */}
                <div>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3.5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                  >
                    <option value="all">جميع المدن والمناطق</option>
                    {availableCities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Property Type Filter */}
                <div>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3.5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                  >
                    <option value="all">جميع أنواع العقارات</option>
                    <option value="villa">فيلات مستقلة (Villas)</option>
                    <option value="apartment">شقق فندقية فاخرة</option>
                    <option value="penthouse">بنتهاوس مع رووف</option>
                    <option value="duplex">دوبلكس جاردن</option>
                    <option value="townhouse">تاون هاوس</option>
                  </select>
                </div>

                {/* Bedrooms Filter */}
                <div>
                  <select
                    value={selectedBedrooms}
                    onChange={(e) => setSelectedBedrooms(e.target.value)}
                    className="w-full px-3.5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                  >
                    <option value="all">عدد الغرف (الكل)</option>
                    <option value="3">3 غرف نوم</option>
                    <option value="4">4 غرف نوم</option>
                    <option value="5">5+ غرف نوم فاخرة</option>
                  </select>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Main Properties Grid Section */}
      <section id="properties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Compass className="w-4 h-4" />
              <span>أحدث المشروعات الحصرية المتاحة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              الوحدات العقارية المتاحة للمعاينة الفورية
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              استكشف تفاصيل ومساحات كل وحدة، واحجز معاينتك الخاصة على واتساب بنقرة واحدة
            </p>
          </div>

          <div className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
            عرض {properties.length} وحدة عقارية
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard
              key={property.code}
              property={property}
              whatsappPhone={whatsappVIPNumber}
            />
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
            <p className="text-base font-bold text-slate-700 dark:text-slate-300">
              لا توجد وحدات تطابق خيارات الفلترة المحددة.
            </p>
            <button
              onClick={() => { setSearch(''); setSelectedCity('all'); setSelectedType('all'); setSelectedBedrooms('all'); }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              إعادة ضبط الفلاتر وعرض كافة الوحدات
            </button>
          </div>
        )}

      </section>

      {/* Interactive Mortgage Calculator Section */}
      <section id="calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MortgageCalculator
          initialPrice={9500000}
          currency="ج.م"
          whatsappPhone={whatsappVIPNumber}
          propertyTitle="وحدة عقارية فاخرة في دار المعمار"
        />
      </section>

      {/* About & Partners Section */}
      <section id="about" className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
                <span>🏆</span>
                <span>لماذا يختار كبار المستثمرين دار المعمار؟</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                أكثر من 15 عاماً من الخبرة في إدارة وتطوير المحافظ العقارية الراقية
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                نحن لسنا مجرد وسطاء، بل مستشاروك العقاريون الموثوقون. ننتقي لك الوحدات ذات أعلى عائد استثماري وأفضل جودة بناء من كبرى شركات التطوير العقاري المعترف بها عالمياً، مع إتاحة أفضل أنظمة السداد بدون فوائد وتوفير جولات معاينة مجانية على أرض الواقع.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-bold">
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>عقود قانونية وفحص هندسي كامل</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>تسهيلات سداد بدون أي عمولات من المشتري</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>خدمة ما بعد البيع وإعادة التأجير</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>سيارات خاصة لنقل العملاء للمعاينة</span>
                </div>
              </div>
            </div>

            {/* Visual Highlight Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                alt="Dar Al-Meamar Architecture"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-8">
                <div className="text-white space-y-1">
                  <span className="text-xs text-amber-400 font-bold">استشارات عقارية VIP</span>
                  <p className="text-lg font-black">احصل على ملف الفرص العقارية الحصرية فور صدورها</p>
                </div>
              </div>
            </div>

          </div>

          {/* Trusted Developers Bar */}
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
              شركاؤنا من كبرى شركات التطوير العقاري
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-75 grayscale hover:grayscale-0 transition-all font-black text-sm text-slate-600 dark:text-slate-300">
              <span>إعمار مصر EMAAR</span>
              <span>سوديك SODIC</span>
              <span>طلعت مصطفى TMG</span>
              <span>بالم هيلز PALM HILLS</span>
              <span>حسن علام HASSAN ALLAM</span>
              <span>أورا ريزيدنس ORA</span>
            </div>
          </div>

        </div>
      </section>

      {/* VIP Booking CTA Section */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-[#0f2942] via-[#163a5d] to-[#0f2942] rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl border border-amber-500/20 relative overflow-hidden">
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              خدمة حجز المعاينة المجانية
            </span>
            
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              هل ترغب في زيارة المشروعات على أرض الواقع؟
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              تواصل مباشرة مع أحد مستشارينا المعتمدين لتحديد موعد جولة معاينة خاصة لوحدتك المختارة وتجهيز ملف خطة السداد المناسبة لميزانيتك.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${whatsappVIPNumber}?text=${encodeURIComponent('مرحباً دار المعمار، أود حجز موعد استشارة وجولة معاينة لأحد المشروعات العقارية.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                <span>محادثة فورية مع المستشار العقاري على واتساب</span>
              </a>

              <a
                href="tel:+201096986091"
                className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>اتصال هاتفي مباشر</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-black text-white text-base">دار المعمار للعقارات</span>
            </div>
            
            <p className="text-slate-500 text-center sm:text-end">
              القاهرة الجديدة • التجمع الخامس • الشيخ زايد • الساحل الشمالي
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <p>© {new Date().getFullYear()} دار المعمار للتطوير العقاري. نموذج حي مبني ومعتمد على منصة إبني ويب.</p>
            <p>جميع البيانات والأسعار استرشادية خاضعة لشروط المطورين العقاريين.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
