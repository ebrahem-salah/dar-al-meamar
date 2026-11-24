import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Property from '@/models/Property';
import { initialProperties } from '@/lib/seedProperties';
import { getSessionUser } from '@/lib/auth';
import { z } from 'zod';

export async function GET(req: Request) {
  try {
    await dbConnect();

    // Auto-seed if collection is empty
    const count = await Property.countDocuments();
    if (count === 0) {
      await Property.insertMany(initialProperties);
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.trim() || '';
    const city = searchParams.get('city') || '';
    const type = searchParams.get('type') || '';
    const minPrice = Number(searchParams.get('minPrice')) || 0;
    const maxPrice = Number(searchParams.get('maxPrice')) || 0;
    const bedrooms = Number(searchParams.get('bedrooms')) || 0;
    const featured = searchParams.get('featured');

    const filter: any = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { titleEn: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { district: { $regex: search, $options: 'i' } },
      ];
    }

    if (city && city !== 'all') {
      filter.city = city;
    }

    if (type && type !== 'all') {
      filter.type = type;
    }

    if (minPrice > 0 || maxPrice > 0) {
      filter.price = {};
      if (minPrice > 0) filter.price.$gte = minPrice;
      if (maxPrice > 0) filter.price.$lte = maxPrice;
    }

    if (bedrooms > 0) {
      filter.bedrooms = bedrooms;
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    const properties = await Property.find(filter).sort({ featured: -1, createdAt: -1 }).lean();

    // Extract unique available cities & types for filter dropdowns
    const allProperties = await Property.find({}, 'city type').lean();
    const availableCities = Array.from(new Set(allProperties.map((p) => p.city)));
    const availableTypes = Array.from(new Set(allProperties.map((p) => p.type)));

    return NextResponse.json({
      success: true,
      count: properties.length,
      properties,
      availableCities,
      availableTypes,
    });
  } catch (error) {
    console.error('Fetch properties error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'تعذر جلب العقارات، سيتم عرض النماذج الافتراضية.',
        properties: initialProperties,
        availableCities: ['القاهرة الجديدة', 'الشيخ زايد', 'المستقبل سيتي', 'العاصمة الإدارية', 'الساحل الشمالي'],
        availableTypes: ['villa', 'apartment', 'penthouse', 'duplex', 'townhouse'],
      },
      { status: 500 }
    );
  }
}

const CreatePropertySchema = z.object({
  title: z.string().trim().min(3),
  titleEn: z.string().trim().optional(),
  type: z.enum(['villa', 'apartment', 'duplex', 'penthouse', 'townhouse', 'commercial']),
  city: z.string().trim().min(2),
  district: z.string().trim().min(2),
  price: z.number().min(0),
  currency: z.string().default('ج.م'),
  downPaymentPercent: z.number().min(0).max(100).default(10),
  installmentYears: z.number().min(0).default(7),
  area: z.number().min(1),
  bedrooms: z.number().default(3),
  bathrooms: z.number().default(2),
  images: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  description: z.string().default(''),
  descriptionEn: z.string().default(''),
  features: z.array(z.string()).default([]),
  developer: z.string().default('دار المعمار للتطوير العقاري'),
  deliveryDate: z.string().default('استلام فوري'),
});

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'غير مصرح لك بإضافة عقارات.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const data = CreatePropertySchema.parse(body);

    await dbConnect();

    // Generate unique code & slug
    const code = `DM-${Math.floor(100 + Math.random() * 900)}`;
    const baseSlug = data.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\u0600-\u06FF]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const property = await Property.create({
      ...data,
      code,
      slug,
      status: 'available',
    });

    return NextResponse.json({
      success: true,
      message: 'تم إضافة العقار بنجاح! 🏡',
      property,
    });
  } catch (error: any) {
    console.error('Create property error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.issues[0]?.message || 'بيانات غير صالحة' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'حدث خطأ في الخادم أثناء إضافة العقار.' },
      { status: 500 }
    );
  }
}
