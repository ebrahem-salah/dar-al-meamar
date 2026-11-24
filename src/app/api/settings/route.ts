import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import SiteSettings from '@/models/SiteSettings';

export async function GET() {
  try {
    await dbConnect();

    let settings: any = await SiteSettings.findOne().lean();

    if (!settings) {
      // Create initial luxury real estate default settings
      settings = await SiteSettings.create({
        siteName: 'دار المعمار للعقارات',
        siteNameEn: 'Dar Al-Meamar Real Estate',
        siteDescription: 'منصة حصرية لعرض وشراء أفخم الفيلات والشقق والوحدات السكنية في أرقى المواقع مع أنظمة سداد وتسهيلات حصرية.',
        siteDescriptionEn: 'Exclusive luxury villas, penthouses, and properties in prime locations with flexible installment plans.',
        primaryColor: '#0f2942', // Luxury Deep Navy
        secondaryColor: '#c59b27', // Luxury Warm Gold
        contactEmail: 'sales@dar-almeamar.com',
        contactPhone: '+201096986091',
        whatsappNumber: '201096986091',
        currency: 'ج.م',
      });
    }

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'تعذر جلب إعدادات الموقع.',
        settings: {
          siteName: 'دار المعمار للعقارات',
          siteNameEn: 'Dar Al-Meamar Real Estate',
          primaryColor: '#0f2942',
          secondaryColor: '#c59b27',
          whatsappNumber: '201096986091',
          currency: 'ج.م',
        },
      },
      { status: 500 }
    );
  }
}
