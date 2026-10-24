import { llmsTxt } from "@/lib/llms";

/** /llms.txt: company summary for AI assistants (llmstxt.org). Generated at build time. */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
