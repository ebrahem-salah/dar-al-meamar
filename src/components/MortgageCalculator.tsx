'use client';

import React, { useState } from 'react';
import { Calculator, MessageSquare, CheckCircle, Percent, Calendar, ShieldCheck } from 'lucide-react';

interface MortgageCalculatorProps {
  initialPrice?: number;
  currency?: string;
  whatsappPhone?: string;
  propertyTitle?: string;
  propertyCode?: string;
}

export default function MortgageCalculator({
  initialPrice = 8500000,
  currency = 'ج.م',
  whatsappPhone = '201096986091',
  propertyTitle,
  propertyCode,
}: MortgageCalculatorProps) {
  const [price, setPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(10);
  const [years, setYears] = useState<number>(8);

  const downPaymentAmount = Math.round((price * downPaymentPercent) / 100);
  const remainingAmount = price - downPaymentAmount;
  const totalMonths = Math.max(1, years * 12);
  const monthlyInstallment = Math.round(remainingAmount / totalMonths);
  const quarterlyInstallment = Math.round(remainingAmount / (years * 4));

  const formatCurrency = (val: number) => {
    return val.toLocaleString('ar-EG');
  };

  const getWhatsAppCalculationLink = () => {
    const text = encodeURIComponent(
      `*استفسار عن خطة سداد وتقسيط عقار* 📊\n` +
      (propertyCode ? `*كود الوحدة:* #${propertyCode}\n` : '') +
      (propertyTitle ? `*العقار:* ${propertyTitle}\n` : '') +
      `*سعر العقار التقديري:* ${formatCurrency(price)} ${currency}\n` +
      `*المقدم المختار (${downPaymentPercent}%):* ${formatCurrency(downPaymentAmount)} ${currency}\n` +
      `*فترة السداد:* ${years} سنوات (${totalMonths} شهر)\n` +
      `*القسط الشهري المتوقع:* ${formatCurrency(monthlyInstallment)} ${currency} / شهرياً\n` +
      `*القسط الربع سنوي:* ${formatCurrency(quarterlyInstallment)} ${currency}\n\n` +
      `مرحباً دار المعمار، أرغب في تأكيد هذه الخطة ومعرفة العروض المتاحة للتقسيط بدون فوائد.`
    );
    return `https://wa.me/${whatsappPhone.replace(/[^0-9]/g, '')}?text=${text}`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
            <Calculator className="w-3.5 h-3.5" />
            <span>حاسبة الأقساط والتمويل الذكية</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            احسب خطة سداد عقارك المثالية
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            حدد سعر العقار ونسبة المقدم وفترة التقسيط لمعرفة القسط الشهري والربع سنوي فوراً
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-xl font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>تسهيلات سداد بدون فوائد بنكية</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Property Price Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">سعر العقار الإجمالي:</span>
              <span className="text-amber-400 font-mono text-base font-black">
                {formatCurrency(price)} {currency}
              </span>
            </div>
            <input
              type="range"
              min={2000000}
              max={30000000}
              step={250000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>2,000,000 {currency}</span>
              <span>15,000,000 {currency}</span>
              <span>30,000,000 {currency}</span>
            </div>
          </div>

          {/* 2. Down Payment % Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">الدفعة الأولى (المقدم):</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold text-xs">
                  {downPaymentPercent}%
                </span>
                <span className="text-white font-mono text-sm font-bold">
                  ({formatCurrency(downPaymentAmount)} {currency})
                </span>
              </div>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>5% (أقل مقدم)</span>
              <span>25%</span>
              <span>50%</span>
            </div>
          </div>

          {/* 3. Installment Duration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">مدة التقسيط:</span>
              <span className="text-emerald-400 font-bold text-sm">
                {years} سنوات ({totalMonths} شهر)
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[5, 7, 8, 10].map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setYears(y)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    years === y
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {y} سنوات
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Card Column */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          
          <div className="text-center space-y-1 border-b border-slate-800 pb-4">
            <span className="text-xs text-slate-400 font-bold">القسط الشهري المتوقع</span>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
              {formatCurrency(monthlyInstallment)}
              <span className="text-xs font-normal text-slate-400 ms-1.5">{currency} / شهر</span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">قيمة الدفعة الأولى (المقدم):</span>
              <span className="font-bold text-white font-mono">{formatCurrency(downPaymentAmount)} {currency}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">المبلغ المتبقي للتقسيط:</span>
              <span className="font-bold text-white font-mono">{formatCurrency(remainingAmount)} {currency}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">القسط الربع سنوي (كل 3 أشهر):</span>
              <span className="font-bold text-emerald-400 font-mono">{formatCurrency(quarterlyInstallment)} {currency}</span>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-400">نظام الفوائد:</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>0% فوائد (أقساط متساوية)</span>
              </span>
            </div>
          </div>

          <a
            href={getWhatsAppCalculationLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>تأكيد الخطة وحجز موعد عبر واتساب</span>
          </a>

        </div>

      </div>

    </div>
  );
}
