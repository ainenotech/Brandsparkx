import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { JsonLd } from "@/components/JsonLd";

describe("components/JsonLd", () => {
  it("renders a script element with type application/ld+json", () => {
    const data = { "@context": "https://schema.org", "@type": "Organization", name: "BrandSparkX" };
    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
  });

  it("produces valid, parseable JSON", () => {
    const data = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "BrandSparkX",
      url: "https://brandsparkx.com",
    };
    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script?.innerHTML).toBeDefined();

    const parsed = JSON.parse(script!.innerHTML);
    expect(parsed).toEqual(data);
  });

  it("escapes '<' as '\\u003c' so it can never prematurely close the script tag", () => {
    const maliciousData = {
      title: "Attack</script><script>alert('xss')</script>",
      html: "<p>Hello & welcome</p>",
    };
    const { container } = render(<JsonLd data={maliciousData} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script?.innerHTML).not.toContain("</script>");
    expect(script?.innerHTML).not.toContain("<");
    expect(script?.innerHTML).toContain("\\u003c");

    // Standard JSON.parse understands \u003c and recovers the original string cleanly
    const parsed = JSON.parse(script!.innerHTML);
    expect(parsed.title).toBe(maliciousData.title);
    expect(parsed.html).toBe(maliciousData.html);
  });
});
