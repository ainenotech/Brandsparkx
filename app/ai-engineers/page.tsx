import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/FinalCta";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { FaqSection } from "@/components/FaqSection";
import { ComparisonTable } from "@/components/solutions/ComparisonTable";
import { SolutionDetails } from "@/components/solutions/SolutionDetails";
import { SolutionDefinition } from "@/components/solutions/SolutionDefinition";
import { comparisons } from "@/content/comparisons";
import { faqs } from "@/content/faqs";
import { RelatedSolutions } from "@/components/solutions/RelatedSolutions";
import { CodeEditorDemo } from "@/components/engineers/CodeEditorDemo";
import { EngagementModels } from "@/components/engineers/EngagementModels";
import { contactHref, solutions } from "@/content/solutions";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

const PATH = "/ai-engineers";
const DESCRIPTION =
  "Hire AI engineers on demand by project, week or month. Agentic AI, full-stack, backend, cloud and application support with one point of contact.";

export const metadata = pageMetadata("ai-engineers");

const stack = [
  ["ai.engineering", "AI Engineering"],
  ["agents.agentic", "Agentic AI"],
  ["ai.apps", "AI Application Development"],
  ["fullstack", "Full-Stack Development"],
  ["backend", "Backend Development"],
  ["product", "Software Product Development"],
  ["cloud.deploy", "Cloud & Deployment"],
  ["support", "Application Support"],
];

const engineersContact = contactHref("AI Engineers");

export default function EngineersPage() {
  const solution = solutions.find((x) => x.slug === "ai-engineers")!;
  return (
    <div className="page on">
      <JsonLd data={serviceJsonLd("AI Engineers on Demand", DESCRIPTION, PATH)} />
      <div className="phero">
        <div className="wrap pgrid">
          <div className="ptext">
            <Breadcrumbs items={[{ name: "AI Engineers on Demand", path: PATH }]} />
            <h1>Add AI engineering capacity without building the team yourself.</h1>
            <p className="lede">
              From AI agents and automation to full-stack development and application support, our
              engineering network can plug into your existing team or take ownership of a defined
              requirement.
            </p>
            <Link href={engineersContact} className="btn btn-red">
              Hire an AI Engineer <Icon name="i-arrow" />
            </Link>
          </div>
          <div className="pvis" aria-hidden="true">
            <div className="win">
              <div className="win-bar">
                <span className="dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="ed-tab on">agent.py</span>
                <span className="ed-tab">deploy.yml</span>
              </div>
              <CodeEditorDemo />
            </div>
            <div className="fchip" style={{ right: 24, top: -16 }}>
              <i />
              Agentic AI
            </div>
            <div className="fchip" style={{ left: -40, top: "44%", animationDelay: "-2s" }}>
              <i />
              Cloud &amp; deploy
            </div>
            <div className="fchip" style={{ right: 30, bottom: -16, animationDelay: "-4s" }}>
              <i />
              Full-stack
            </div>
          </div>
        </div>
      </div>

      <SolutionDefinition
        pageKey="ai-engineers"
        question={solution.definitionQuestion}
        definition={solution.definition}
      />

      <section>
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <div className="kicker">Engagement models</div>
              <h2>Flexible engagement. Dedicated expertise.</h2>
            </div>
            <p className="lede">
              One point of contact, whichever model you choose. Select one to compare.
            </p>
          </div>
          <EngagementModels />
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <div className="kicker">Capabilities</div>
              <h2>What our engineers build.</h2>
            </div>
          </div>
          <div className="stack rv">
            {stack.map(([code, label]) => (
              <div key={code}>
                <code>{code}</code>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SolutionDetails slug="ai-engineers" />

      <ComparisonTable data={comparisons["ai-engineers"]} />

      <FaqSection items={faqs["ai-engineers"]} soft />

      <RelatedSolutions slug="ai-engineers" />

      <FinalCta title="Need AI talent now?" text="Tell us what you're building.">
        <Link href={engineersContact} className="btn btn-red">
          Find Your Engineer <Icon name="i-arrow" />
        </Link>
      </FinalCta>
    </div>
  );
}
