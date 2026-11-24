'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface SiteSettingsData {
  siteName: string;
  siteNameEn: string;
  siteDescription: string;
  siteDescriptionEn: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  facebookUrl: string;
  instagramUrl: string;
  currency: string;
  enableRegistration: boolean;
  enableGoogleAuth: boolean;
}

const defaultSettings: SiteSettingsData = {
  siteName: 'دار المعمار للعقارات',
  siteNameEn: 'Dar Al-Meamar Real Estate',
  siteDescription: 'منصة حصرية لعرض وشراء أفخم الفيلات والشقق والوحدات السكنية في أرقى المواقع مع أنظمة سداد وتسهيلات حصرية.',
  siteDescriptionEn: 'Exclusive luxury villas, penthouses, and properties in prime locations with flexible installment plans.',
  logoUrl: '',
  faviconUrl: '',
  primaryColor: '#0f2942',
  secondaryColor: '#c59b27',
  contactEmail: 'sales@dar-almeamar.com',
  contactPhone: '+201096986091',
  whatsappNumber: '201096986091',
  facebookUrl: '',
  instagramUrl: '',
  currency: 'ج.م',
  enableRegistration: true,
  enableGoogleAuth: true,
};

interface SiteSettingsContextType {
  settings: SiteSettingsData;
  loading: boolean;
  refreshSettings: () => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: defaultSettings,
  loading: true,
  refreshSettings: async () => {},
});

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettingsData>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success && data.settings) {
        setSettings(data.settings);
        applyThemeColors(data.settings.primaryColor, data.settings.secondaryColor);
      }
    } catch (err) {
      console.error('Failed to load site settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyThemeColors = (primary: string, secondary: string) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (primary) root.style.setProperty('--brand-primary', primary);
      if (secondary) root.style.setProperty('--brand-secondary', secondary);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
