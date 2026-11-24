'use client';

import React from 'react';
import Link from 'next/link';
import { Bed, Bath, Maximize, MapPin, MessageSquare, ArrowLeft, Sparkles, Building2 } from 'lucide-react';
import { getWhatsAppInspectionLink } from '@/lib/propertyHelpers';

export interface PropertyItem {
  _id?: string;
  code: string;
  title: string;
  titleEn?: string;
  slug: string;
  type: string;
  status: string;
  city: string;
  district: string;
  price: number;
  currency: string;
  downPaymentPercent: number;
  installmentYears: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  featured?: boolean;
  developer?: string;
  deliveryDate?: string;
}

interface PropertyCardProps {
  property: PropertyItem;
  whatsappPhone?: string;
}

export default function PropertyCard({ property, whatsappPhone = '201096986091' }: PropertyCardProps) {
  const formatCurrency = (val: number) => val.toLocaleString('ar-EG');
  const mainImage = property.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

  const typeTranslations: Record<string, string> = {
    villa: 'فيلا مستقلة',
    apartment: 'شقة فاخرة',
    duplex: 'دوبلكس',
    penthouse: 'بنتهاوس',
    townhouse: 'تاون هاوس',
    commercial: 'تجاري وإداري',
  };

  const whatsappLink = getWhatsAppInspectionLink(whatsappPhone, {
    code: property.code,
    title: property.title,
    price: property.price,
    currency: property.currency,
    city: property.city,
    district: property.district,
  });

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
      
      {/* Property Image & Badges */}
      <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[11px] font-black bg-slate-900/90 text-amber-400 border border-amber-500/30 backdrop-blur-md shadow-xs">
            #{property.code}
          </span>

          <div className="flex items-center gap-1.5">
            {property.featured && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>مميز</span>
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-600/90 text-white backdrop-blur-md">
              {typeTranslations[property.type] || property.type}
            </span>
          </div>
        </div>

        {/* Bottom Location Overlay */}
        <div className="absolute bottom-3 inset-x-3.5 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 font-bold text-slate-200 drop-shadow-md truncate">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{property.city} - {property.district}</span>
          </div>
          {property.deliveryDate && (
            <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md shrink-0">
              {property.deliveryDate}
            </span>
          )}
        </div>
      </div>

      {/* Property Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          <h3 className="font-black text-slate-900 dark:text-white text-base leading-snug line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {property.title}
          </h3>

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-slate-400" />
              <span>{property.bedrooms} غرف</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-slate-400" />
              <span>{property.bathrooms} حمام</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize className="w-4 h-4 text-slate-400" />
              <span dir="ltr">{property.area} م²</span>
            </div>
          </div>

          {/* Payment Plan Badge */}
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1">
            <span>مقدم {property.downPaymentPercent}%</span>
            <span>تقسيط مريح حتى {property.installmentYears} سنوات</span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="pt-2 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-slate-400 font-bold">السعر الإجمالي:</span>
            <div className="text-lg font-black text-slate-900 dark:text-amber-400 font-mono">
              {formatCurrency(property.price)}
              <span className="text-xs font-bold text-slate-500 ms-1">{property.currency}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>طلب معاينة</span>
            </a>

            <Link
              href={`/properties/${property.slug}`}
              className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
            >
              <span>التفاصيل</span>
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
