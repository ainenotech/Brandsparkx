"use client";

import { CaretDownIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent,
} from "react";
import { getCountryCallingCode, type Country } from "react-phone-number-input";

type Option = { value?: Country; label: string; divider?: boolean };

/**
 * Searchable country picker for react-phone-number-input (`countrySelectComponent`).
 * A button shows the flag and dial code; it opens a popover with a search box (combobox)
 * and a listbox of countries. Fully keyboard operable: arrows move, Enter picks, Esc closes.
 */
export function CountrySelect({
  value,
  onChange,
  options,
  iconComponent: Flag,
  disabled,
  onFocus,
  onBlur,
}: {
  value?: Country;
  onChange: (value?: Country) => void;
  options: Option[];
  iconComponent: ComponentType<{ country?: Country; label: string }>;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  const id = useId();
  const listId = `${id}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const dial = (c: Country) => `+${getCountryCallingCode(c)}`;
  const current = options.find((o) => o.value === value);

  // While searching, drop the divider and match by name, dial code or ISO code.
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^\+/, "");
    if (!q) return options.filter((o) => o.value || o.divider);
    return options.filter(
      (o) =>
        o.value &&
        (o.label.toLowerCase().includes(q) ||
          getCountryCallingCode(o.value).startsWith(q) ||
          o.value.toLowerCase() === q),
    );
  }, [options, query]);
  const choices = shown.filter((o) => o.value) as Required<Pick<Option, "value" | "label">>[];
  const indexOf = new Map(choices.map((o, i) => [o.value, i]));

  const openList = () => {
    setQuery("");
    setActive(
      Math.max(
        0,
        choices.findIndex((o) => o.value === value),
      ),
    );
    setOpen(true);
  };
  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  };
  const pick = (c: Country) => {
    onChange(c);
    close();
  };

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keep the active option scrolled into view.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView?.({ block: "nearest" });
  }, [active, open]);

  const onSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => Math.min(choices.length - 1, Math.max(0, i + step)));
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      setActive(e.key === "Home" ? 0 : choices.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (choices[active]) pick(choices[active].value);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      close(false);
    }
  };

  return (
    <div className="cs" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="cs__btn"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={`Country code: ${current?.label ?? "International"}${value ? ` ${dial(value)}` : ""}. Change country`}
        onClick={() => (open ? close() : openList())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            openList();
          }
        }}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <span className="cs__flag" aria-hidden="true">
          <Flag country={value} label={current?.label ?? "International"} />
        </span>
        <span className="cs__dial">{value ? dial(value) : "+"}</span>
        <CaretDownIcon className="cs__caret" aria-hidden="true" />
      </button>

      {open && (
        <div className="cs__pop">
          <div className="cs__search">
            <MagnifyingGlassIcon aria-hidden="true" />
            <input
              ref={searchRef}
              type="text"
              role="combobox"
              aria-label="Search countries"
              aria-expanded="true"
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={choices[active] ? `${id}-${choices[active].value}` : undefined}
              placeholder="Search country or code"
              autoComplete="off"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onSearchKey}
            />
          </div>
          <ul className="cs__list" id={listId} role="listbox" aria-label="Countries" ref={listRef}>
            {shown.map((o, i) => {
              if (o.divider)
                return <li key={`div-${i}`} className="cs__divider" role="presentation" />;
              const c = o.value!;
              const n = indexOf.get(c)!;
              return (
                <li
                  key={c}
                  id={`${id}-${c}`}
                  role="option"
                  aria-label={`${o.label} ${dial(c)}`}
                  aria-selected={c === value}
                  data-index={n}
                  className={n === active ? "cs__opt is-active" : "cs__opt"}
                  onPointerMove={() => setActive(n)}
                  onClick={() => pick(c)}
                >
                  <span className="cs__flag" aria-hidden="true">
                    <Flag country={c} label={o.label} />
                  </span>
                  <span className="cs__name">{o.label}</span>
                  <span className="cs__code">{dial(c)}</span>
                </li>
              );
            })}
            {choices.length === 0 && (
              <li className="cs__empty" role="presentation">
                No matching country
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
