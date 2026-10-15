import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Terms & Conditions | BrandSparkX",
    description:
      "The terms and conditions that apply to using the BrandSparkX website and services.",
    path: "/terms",
  }),
  // Placeholder page: keep it out of search results until the real terms are published.
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return <LegalPage title="Terms & Conditions" path="/terms" />;
}
