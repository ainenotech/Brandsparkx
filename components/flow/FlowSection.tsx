"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { FlowDiagram } from "@/components/flow/FlowDiagram";
import { getFlow } from "@/content/flows";
import { contactHref } from "@/content/solutions";

/** Section copy on the left, flow card on the right. Pages only pass a flow id. */
export function FlowSection({ id }: { id: string }) {
  const flow = getFlow(id);
  if (!flow) return null;

  return (
    <section>
      <div className="wrap dflow-grid">
        <div>
          <div className="kicker">{flow.kicker}</div>
          <h2>{flow.title}</h2>
          <p className="lede">{flow.text}</p>
          <Link href={contactHref(flow.interest)} className="link">
            Talk to Us <Icon name="i-arrow" width={16} height={16} />
          </Link>
        </div>
        <FlowDiagram flow={flow} />
      </div>
    </section>
  );
}
