export type IconName =
  | "i-pause"
  | "i-play"
  | "i-cloud"
  | "i-db"
  | "i-users"
  | "i-arrow"
  | "i-up"
  | "i-left"
  | "i-check"
  | "i-info"
  | "i-growth"
  | "i-content"
  | "i-mkt"
  | "i-sales"
  | "i-auto"
  | "i-eng"
  | "i-voice"
  | "i-pin"
  | "i-phone"
  | "i-mail"
  | "i-wa"
  | "i-in"
  | "i-ig"
  | "i-chat"
  | "i-x"
  | "i-min"
  | "i-send"
  | "i-spark"
  | "s-attract"
  | "s-engage"
  | "s-capture"
  | "s-nurture"
  | "s-convert"
  | "s-retain";

type IconProps = {
  name: IconName;
  className?: string;
  width?: number;
  height?: number;
};

/** Renders an icon from the inline sprite (components/IconSprite.tsx). Decorative by default. */
export function Icon({ name, className, width, height }: IconProps) {
  return (
    <svg className={className} width={width} height={height} aria-hidden="true" focusable="false">
      <use href={`#${name}`} />
    </svg>
  );
}
