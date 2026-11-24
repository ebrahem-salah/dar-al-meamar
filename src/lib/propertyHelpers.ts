// Helper function to create WhatsApp inspection booking link (client-safe)
export function getWhatsAppInspectionLink(
  whatsappPhone: string,
  property: {
    code: string;
    title: string;
    price: number;
    currency: string;
    city: string;
    district: string;
  }
): string {
  const text = encodeURIComponent(
    `*طلب حجز موعد معاينة عقار* 🏡\n` +
    `*كود الوحدة:* #${property.code}\n` +
    `*اسم العقار:* ${property.title}\n` +
    `*الموقع:* ${property.city} - ${property.district}\n` +
    `*السعر:* ${property.price.toLocaleString('ar-EG')} ${property.currency}\n\n` +
    `مرحباً دار المعمار، أرغب في حجز موعد لمعاينة هذه الوحدة ومناقشة أنظمة السداد المتاحة.`
  );

  return `https://wa.me/${whatsappPhone.replace(/[^0-9]/g, '')}?text=${text}`;
}
