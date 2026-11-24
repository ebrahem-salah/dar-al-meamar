'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  Eye, 
  PhoneCall, 
  Compass,
  ArrowLeft
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import MortgageCalculator from '@/components/MortgageCalculator';
import { initialProperties } from '@/lib/seedProperties';
import { getWhatsAppInspectionLink } from '@/models/Property';

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const whatsappVIPNumber = '201096986091';

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/properties/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.property) {
          setProperty(data.property);
        } else {
          // Fallback search in seed data
          const fallback = initialProperties.find((p) => p.slug === slug || p.code.toLowerCase() === slug.toLowerCase());
          if (fallback) setProperty(fallback);
        }
      })
      .catch((err) => {
        console.error(err);
        const fallback = initialProperties.find((p) => p.slug === slug);
        if (fallback) setProperty(fallback);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center text-sm font-bold">
        جاري تحميل بيانات وتفاصيل العقار...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">لم يتم العثور على هذا العقار</h2>
        <p className="text-xs text-slate-500">قد يكون العقار تم بيعه أو تم تعديل الرابط.</p>
        <Link href="/" className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl">
          العودة لكافة العقارات
        </Link>
      </div>
    );
  }

  const formatCurrency = (val: number) => val.toLocaleString('ar-EG');

  const whatsappLink = getWhatsAppInspectionLink(whatsappVIPNumber, {
    code: property.code,
    title: property.title,
    price: property.price,
    currency: property.currency,
    city: property.city,
    district: property.district,
  });

  const images = property.images?.length > 0 ? property.images : [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 pb-16">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0f2942]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors">
            <ArrowRight className="w-4 h-4 rtl:rotate-0" />
            <span>العودة لكافة العقارات</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-2.5 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/30 rounded-lg">
              #{property.code}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Title, Badges & Price Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-full text-xs font-bold">
                {property.type === 'villa' ? 'فيلا مستقلة' : property.type}
              </span>
              <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-full text-xs font-bold">
                {property.deliveryDate || 'استلام فوري'}
              </span>
              {property.developer && (
                <span className="text-xs text-slate-400 font-bold">
                  بواسطة: <strong className="text-slate-700 dark:text-slate-200">{property.developer}</strong>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{property.city} - {property.district}</span>
            </div>
          </div>

          {/* Price Box & Quick Action */}
          <div className="lg:text-end space-y-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-400 font-bold block">السعر الإجمالي المطلوب:</span>
            <div className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400 font-mono">
              {formatCurrency(property.price)}
              <span className="text-sm font-bold text-slate-500 ms-1.5">{property.currency}</span>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              مقدم {property.downPaymentPercent}% • تقسيط مريح حتى {property.installmentYears} سنوات
            </p>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="space-y-4">
          {/* Main Active Image */}
          <div className="relative aspect-16/9 sm:aspect-21/9 rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-200 dark:border-slate-800">
            <img
              src={images[activeImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 sm:w-32 h-16 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-amber-500 scale-95 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Specs Overview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Maximize className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-bold block">المساحة الإجمالية</span>
              <span className="text-base font-black font-mono">{property.area} م²</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Bed className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-bold block">غرف النوم</span>
              <span className="text-base font-black font-mono">{property.bedrooms} غرف ماستر</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Bath className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-bold block">دورات المياه</span>
              <span className="text-base font-black font-mono">{property.bathrooms} حمامات</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-bold block">موعد الاستلام</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{property.deliveryDate || 'استلام فوري'}</span>
            </div>
          </div>
        </div>

        {/* Description & Amenities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 2 Cols: Description & Amenities */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Description Card */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                تفاصيل ومواصفات العقار
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Features & Amenities */}
            {property.features?.length > 0 && (
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  المميزات والخدمات المتاحة
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feat: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 text-xs font-bold text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* 1 Col: Floating Contact & Inspection Card */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#0f2942] to-[#0a192f] text-white p-6 sm:p-8 rounded-3xl border border-amber-500/20 shadow-2xl space-y-5 sticky top-24">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                حجز موعد جولة المعاينة
              </span>

              <h4 className="text-lg font-black">
                هل ترغب في معاينة هذه الوحدة على أرض الواقع؟
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                سيتولى مستشارك العقاري تجهيز تصريح الزيارة ومرافقتك في جولة معاينة شاملة بسيارة الشركة الخاصة VIP.
              </p>

              <div className="pt-2 space-y-2.5">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>طلب حجز موعد عبر واتساب</span>
                </a>

                <a
                  href="tel:+201096986091"
                  className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>اتصال هاتفي مباشر بالمستشار</span>
                </a>
              </div>

              <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 space-y-1">
                <p>🔒 معاينة مجانية 100% بدون أي رسوم أو عمولات</p>
                <p>📋 تسليم فوري لملف الحسابات وجدول الأقساط</p>
              </div>
            </div>
          </div>

        </div>

        {/* Tailored Mortgage Calculator */}
        <section className="pt-6">
          <MortgageCalculator
            initialPrice={property.price}
            currency={property.currency}
            whatsappPhone={whatsappVIPNumber}
            propertyTitle={property.title}
            propertyCode={property.code}
          />
        </section>

      </main>

    </div>
  );
}
