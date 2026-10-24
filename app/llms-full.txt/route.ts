import { llmsFullTxt } from "@/lib/llms";

/** /llms-full.txt: every service in full (definitions, steps, use cases, FAQs). Generated at build time. */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
