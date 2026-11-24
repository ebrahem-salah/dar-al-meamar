import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProperty extends Document {
  code: string;
  title: string;
  titleEn: string;
  slug: string;
  type: 'villa' | 'apartment' | 'duplex' | 'penthouse' | 'townhouse' | 'commercial';
  status: 'available' | 'reserved' | 'sold';
  city: string;
  district: string;
  price: number;
  currency: string;
  downPaymentPercent: number;
  installmentYears: number;
  area: number; // in square meters
  bedrooms: number;
  bathrooms: number;
  images: string[];
  featured: boolean;
  description: string;
  descriptionEn?: string;
  features: string[];
  developer?: string;
  deliveryDate?: string;
  viewsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema: Schema<IProperty> = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    title: {
      type: String,
      required: [true, 'عنوان العقار مطلوب'],
      trim: true,
    },
    titleEn: {
      type: String,
      default: '',
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    type: {
      type: String,
      enum: ['villa', 'apartment', 'duplex', 'penthouse', 'townhouse', 'commercial'],
      default: 'apartment',
    },
    status: {
      type: String,
      enum: ['available', 'reserved', 'sold'],
      default: 'available',
    },
    city: {
      type: String,
      required: [true, 'المدينة مطلوبة'],
      trim: true,
    },
    district: {
      type: String,
      required: [true, 'الحي أو المنطقة مطلوبة'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'سعر العقار مطلوب'],
      min: 0,
    },
    currency: {
      type: String,
      default: 'ج.م',
    },
    downPaymentPercent: {
      type: Number,
      default: 10, // 10% default
      min: 0,
      max: 100,
    },
    installmentYears: {
      type: Number,
      default: 7, // 7 years default
      min: 0,
    },
    area: {
      type: Number,
      required: [true, 'المساحة بالمتر المربع مطلوبة'],
      min: 1,
    },
    bedrooms: {
      type: Number,
      default: 3,
      min: 0,
    },
    bathrooms: {
      type: Number,
      default: 2,
      min: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: '',
    },
    descriptionEn: {
      type: String,
      default: '',
    },
    features: {
      type: [String],
      default: [],
    },
    developer: {
      type: String,
      default: 'دار المعمار جروب',
    },
    deliveryDate: {
      type: String,
      default: 'استلام فوري',
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Helper function to create WhatsApp inspection booking link
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

const Property: Model<IProperty> =
  mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);

export default Property;
