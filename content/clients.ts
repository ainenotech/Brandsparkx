export type ClientLogo = {
  name: string;
  /** Path under /public, ideally a monochrome SVG. */ logo: string;
};

/** Add approved client logos here. While empty, six placeholder slots are shown (if placeholders are on). */
export const clientLogos: ClientLogo[] = [];
