"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/Icon";
import { chatSuggestions, chatWelcome, getReply, type ReplyPart } from "@/content/chat";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Message = { id: number; from: "bot" | "me"; parts: ReplyPart[] };

/**
 * Bottom-right controls: back-to-top, greeting bubble, chat launcher and the demo assistant.
 * PHASE 2: the assistant's answers come from `getReply` in content/chat.ts — swap it for an API call.
 */
export function FloatingControls() {
  const reduce = useReducedMotion();
  const [showTop, setShowTop] = useState(false);
  const [greetingGone, setGreetingGone] = useState(false);
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const replyTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const greetTimer = window.setTimeout(() => setGreetingGone(true), 12000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(greetTimer);
      window.clearTimeout(replyTimer.current);
    };
  }, []);

  // The original CSS reacts to `chat-open` on <body>.
  useEffect(() => {
    document.body.classList.toggle("chat-open", open);
    if (!open) return;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 300);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Keep the newest message in view.
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [messages, typing]);

  const toggleChat = (next: boolean) => {
    setOpen(next);
    setMinimized(false);
    if (next && messages.length === 0) {
      setMessages([{ id: nextId.current++, from: "bot", parts: [chatWelcome] }]);
    }
  };

  const send = (text: string) => {
    if (!text.trim() || typing) return;
    setMessages((m) => [...m, { id: nextId.current++, from: "me", parts: [text] }]);
    setInput("");
    setTyping(true);
    replyTimer.current = window.setTimeout(
      () => {
        setTyping(false);
        setMessages((m) => [...m, { id: nextId.current++, from: "bot", parts: getReply(text) }]);
      },
      reduce ? 100 : 900,
    );
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  // On small screens, following a link closes the panel so the page is visible.
  const onLinkClick = () => {
    if (window.innerWidth < 600) setOpen(false);
  };

  return (
    <>
      <div className="fab-wrap">
        <button
          type="button"
          className={showTop ? "totop show" : "totop"}
          aria-label="Back to top"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
            document.getElementById("main")?.focus({ preventScroll: true });
          }}
        >
          <Icon name="i-up" />
        </button>
        <div style={{ position: "relative" }}>
          <div className={greetingGone ? "greet gone" : "greet"}>
            Hi! Exploring AI for your business?
            <button
              type="button"
              aria-label="Dismiss greeting"
              onClick={() => setGreetingGone(true)}
            >
              ×
            </button>
          </div>
          <button
            ref={launcherRef}
            type="button"
            className="launcher"
            aria-label={open ? "Close BrandSparkX Assistant" : "Open BrandSparkX Assistant"}
            aria-expanded={open}
            aria-controls="chat"
            onClick={() => toggleChat(!open)}
          >
            <Icon name="i-chat" className="ic-c" />
            <Icon name="i-x" className="ic-x" />
          </button>
        </div>
      </div>

      <div
        className={minimized ? "chat min" : "chat"}
        id="chat"
        role="dialog"
        aria-label="BrandSparkX Assistant"
        inert={!open}
      >
        <div className="chat-h">
          <div className="av">
            <Icon name="i-spark" />
          </div>
          <div>
            <b>BrandSparkX Assistant</b>
            <small>
              <i />
              Demo mode
            </small>
          </div>
          <div className="ctl">
            <button
              type="button"
              aria-label="Minimize chat"
              onClick={() => setMinimized((m) => !m)}
            >
              <Icon name="i-min" />
            </button>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => {
                toggleChat(false);
                launcherRef.current?.focus();
              }}
            >
              <Icon name="i-x" />
            </button>
          </div>
        </div>

        <div className="chat-b" ref={bodyRef} aria-live="polite">
          {messages.length > 0 && (
            <div className="demo-note">Demo responses · no AI service connected</div>
          )}
          {messages.map((m, i) => (
            <Fragment key={m.id}>
              <div className={`bub ${m.from}`}>
                {m.parts.map((part, j) =>
                  typeof part === "string" ? (
                    part
                  ) : (
                    <Link key={j} href={part.href} onClick={onLinkClick}>
                      {part.label}
                    </Link>
                  ),
                )}
              </div>
              {/* Suggestions sit right under the welcome message, as in the original. */}
              {i === 0 && (
                <div className="sugg">
                  {chatSuggestions.map((s) => (
                    <button key={s} type="button" onClick={() => send(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </Fragment>
          ))}
          {typing && (
            <div className="bub bot" style={{ padding: 0 }}>
              <span className="typing">
                <i />
                <i />
                <i />
              </span>
            </div>
          )}
        </div>

        <form className="chat-f" onSubmit={onSubmit}>
          <label htmlFor="chati" className="sr">
            Message
          </label>
          <input
            ref={inputRef}
            id="chati"
            autoComplete="off"
            placeholder="Ask about AI for your business…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" aria-label="Send" disabled={!input.trim()}>
            <Icon name="i-send" />
          </button>
        </form>
      </div>
    </>
  );
}
