"use client";

import { CheckIcon } from "@phosphor-icons/react";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Confirmation shown in place of a form after it was sent. Focus moves to the heading
 * so screen readers announce it.
 */
export function FormSuccess({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children?: ReactNode;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);

  return (
    <div className="cf-done" role="status">
      <span className="cf-done__icon" aria-hidden="true">
        <CheckIcon weight="bold" />
      </span>
      <h3 ref={headingRef} tabIndex={-1}>
        {title}
      </h3>
      <p>{text}</p>
      {children}
    </div>
  );
}
