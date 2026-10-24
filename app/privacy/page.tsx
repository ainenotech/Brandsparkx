import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("privacy");

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" path="/privacy" />;
}
