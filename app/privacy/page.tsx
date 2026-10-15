import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Privacy Policy | BrandSparkX",
    description:
      "How BrandSparkX collects, uses and protects personal information shared through this website.",
    path: "/privacy",
  }),
  // Placeholder page: keep it out of search results until the real policy is published.
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" path="/privacy" />;
}
