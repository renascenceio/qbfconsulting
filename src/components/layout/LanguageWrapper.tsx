"use client";

import { useI18n } from "@/lib/i18n";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { lang, dir } = useI18n();

  return (
    <div lang={lang} dir={dir}>
      {children}
    </div>
  );
}
