import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { pageSeo, type PageKey } from "@/content/seo";

/**
 * 1200×630 social-share image for each page in content/seo.ts, rendered once at build time
 * (/og/home, /og/contact, …). lib/seo.ts points og:image and twitter:image here.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pageSeo).map((key) => ({ key }));
}

const dataUrl = async (file: string) =>
  `data:image/png;base64,${(await readFile(path.join(process.cwd(), "public/brand", file))).toString("base64")}`;

export async function GET(_: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const page = pageSeo[key as PageKey];
  if (!page) return new Response("Not found", { status: 404 });

  const [wordmark, x] = await Promise.all([
    dataUrl("intro-logo-wordmark.png"),
    dataUrl("intro-logo-x.png"),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px 64px",
        background:
          "radial-gradient(circle at 92% 8%, rgba(216,50,50,0.16), rgba(255,255,255,0) 42%), #ffffff",
        borderBottom: "14px solid #D83232",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img>. */}
        <img src={wordmark} width={410} height={38} alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={x} width={60} height={47} alt="" />
      </div>
      <div
        style={{
          display: "flex",
          fontSize: page.ogTitle.length > 36 ? 64 : 76,
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          color: "#101014",
          maxWidth: 980,
        }}
      >
        {page.ogTitle}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 28,
          color: "#5b5b66",
        }}
      >
        <span>www.brandsparkx.com</span>
        <span>Dubai · Bengaluru · AI growth & automation</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
