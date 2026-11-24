import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Property from '@/models/Property';
import { initialProperties } from '@/lib/seedProperties';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await dbConnect();

    let property = await Property.findOneAndUpdate(
      { slug },
      { $inc: { viewsCount: 1 } },
      { new: true }
    ).lean();

    if (!property) {
      // Fallback search in seed data
      const seedMatch = initialProperties.find((p) => p.slug === slug || p.code.toLowerCase() === slug.toLowerCase());
      if (seedMatch) {
        return NextResponse.json({ success: true, property: seedMatch });
      }
      return NextResponse.json({ success: false, message: 'العقار المطلوب غير موجود.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      property,
    });
  } catch (error) {
    console.error('Fetch property by slug error:', error);
    return NextResponse.json({ success: false, message: 'خطأ في جلب بيانات العقار.' }, { status: 500 });
  }
}
