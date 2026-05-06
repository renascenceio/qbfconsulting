"use client";

import { useEffect, useState } from "react";
import { Save, Check, Globe, Mail, Phone, MapPin, Image as ImageIcon, Share2, Search } from "lucide-react";

interface Settings {
  siteName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  phone: string;
  address: string;
  logoUrl: string;
  faviconUrl: string;
  social: {
    linkedin: string;
    twitter: string;
    youtube: string;
    instagram: string;
  };
  seoDefaultTitle: string;
  seoDefaultDescription: string;
  defaultLanguage: string;
  updatedAt?: string;
}

const empty: Settings = {
  siteName: "",
  tagline: "",
  description: "",
  contactEmail: "",
  phone: "",
  address: "",
  logoUrl: "",
  faviconUrl: "",
  social: { linkedin: "", twitter: "", youtube: "", instagram: "" },
  seoDefaultTitle: "",
  seoDefaultDescription: "",
  defaultLanguage: "en",
};

export default function AdminSettingsPage() {
  const [data, setData] = useState<Settings>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) =>
        setData({
          ...empty,
          ...d,
          social: { ...empty.social, ...(d?.social || {}) },
        })
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    setData((p) => ({ ...p, [key]: value }));

  const updateSocial = (key: keyof Settings["social"], value: string) =>
    setData((p) => ({ ...p, social: { ...p.social, [key]: value } }));

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("save failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } catch {
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-muted-foreground">Loading settings...</div>;
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage global site identity, contact details, and SEO defaults.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-50"
        >
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving..." : saved ? "Saved" : "Save changes"}
        </button>
      </div>

      <div className="space-y-6">
        <Section title="Identity" icon={<Globe className="h-4 w-4" />}>
          <Field label="Site name">
            <input
              value={data.siteName}
              onChange={(e) => update("siteName", e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </Field>
          <Field label="Tagline">
            <input
              value={data.tagline}
              onChange={(e) => update("tagline", e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </Field>
          <Field label="Description" full>
            <textarea
              value={data.description}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </Field>
          <Field label="Default language">
            <select
              value={data.defaultLanguage}
              onChange={(e) => update("defaultLanguage", e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="en">English</option>
              <option value="ar">Arabic</option>
              <option value="hi">Hindi</option>
            </select>
          </Field>
        </Section>

        <Section title="Contact" icon={<Mail className="h-4 w-4" />}>
          <Field label="Contact email">
            <input
              type="email"
              value={data.contactEmail}
              onChange={(e) => update("contactEmail", e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </Field>
          <Field
            label="Phone"
            icon={<Phone className="h-3.5 w-3.5 text-muted-foreground" />}
          >
            <input
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </Field>
          <Field
            label="Address"
            full
            icon={<MapPin className="h-3.5 w-3.5 text-muted-foreground" />}
          >
            <input
              value={data.address}
              onChange={(e) => update("address", e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </Field>
        </Section>

        <Section title="Branding" icon={<ImageIcon className="h-4 w-4" />}>
          <Field label="Logo URL">
            <input
              value={data.logoUrl}
              onChange={(e) => update("logoUrl", e.target.value)}
              placeholder="/logo.svg"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </Field>
          <Field label="Favicon URL">
            <input
              value={data.faviconUrl}
              onChange={(e) => update("faviconUrl", e.target.value)}
              placeholder="/favicon.ico"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </Field>
        </Section>

        <Section title="Social" icon={<Share2 className="h-4 w-4" />}>
          <Field label="LinkedIn">
            <input
              value={data.social.linkedin}
              onChange={(e) => updateSocial("linkedin", e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </Field>
          <Field label="Twitter / X">
            <input
              value={data.social.twitter}
              onChange={(e) => updateSocial("twitter", e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </Field>
          <Field label="YouTube">
            <input
              value={data.social.youtube}
              onChange={(e) => updateSocial("youtube", e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </Field>
          <Field label="Instagram">
            <input
              value={data.social.instagram}
              onChange={(e) => updateSocial("instagram", e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </Field>
        </Section>

        <Section title="SEO defaults" icon={<Search className="h-4 w-4" />}>
          <Field label="Default title" full>
            <input
              value={data.seoDefaultTitle}
              onChange={(e) => update("seoDefaultTitle", e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </Field>
          <Field label="Default description" full>
            <textarea
              value={data.seoDefaultDescription}
              onChange={(e) => update("seoDefaultDescription", e.target.value)}
              rows={3}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </Field>
        </Section>

        {data.updatedAt && (
          <p className="text-xs text-muted-foreground">
            Last updated {new Date(data.updatedAt).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border bg-card">
      <header className="flex items-center gap-2 px-5 py-3.5 border-b border-border">
        {icon}
        <h2 className="font-semibold text-sm tracking-tight">{title}</h2>
      </header>
      <div className="p-5 grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  label,
  icon,
  full,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}
