export type ClientLogo = {
  name: string;
  /** Path under /public, ideally a monochrome SVG. */ logo: string;
  /** Intrinsic size of the logo file, so it renders at the right aspect ratio. */
  width: number;
  height: number;
};

/** Add approved client logos here. While empty, six placeholder slots are shown (if placeholders are on). */
export const clientLogos: ClientLogo[] = [
  { name: "Tata 1mg", logo: "/clients/tata-1mg.webp", width: 48, height: 48 },
  { name: "Zydus Lifesciences", logo: "/clients/zydus-lifesciences.webp", width: 50, height: 43 },
  {
    name: "Cadila Pharmaceuticals",
    logo: "/clients/cadila-pharmaceuticals.webp",
    width: 43,
    height: 48,
  },
  { name: "Indira IVF", logo: "/clients/indira-ivf.webp", width: 161, height: 36 },
  { name: "Petpooja", logo: "/clients/petpooja.webp", width: 230, height: 222 },
  { name: "Jumbo King", logo: "/clients/jumbo-king.webp", width: 294, height: 170 },
  { name: "Aajpakao", logo: "/clients/aajpakao.webp", width: 279, height: 214 },
  { name: "Airroad", logo: "/clients/airroad.webp", width: 470, height: 194 },
  { name: "Bundee", logo: "/clients/bundee.webp", width: 242, height: 128 },
  { name: "Global Developers", logo: "/clients/global-developers.webp", width: 289, height: 95 },
  { name: "HRopal", logo: "/clients/hropal.webp", width: 161, height: 29 },
  { name: "Insuremile", logo: "/clients/insuremile.webp", width: 310, height: 68 },
  { name: "iRest", logo: "/clients/irest.webp", width: 215, height: 103 },
  { name: "Nuttyfox Gourmet", logo: "/clients/nuttyfox-gourmet.webp", width: 294, height: 192 },
  { name: "Tenbroeck Academy", logo: "/clients/tenbroeck-academy.webp", width: 430, height: 92 },
  { name: "Univva Group", logo: "/clients/univva-group.webp", width: 441, height: 110 },
  {
    name: "We Nurture Foundation",
    logo: "/clients/we-nurture-foundation.webp",
    width: 157,
    height: 161,
  },
  { name: "ZippSlip", logo: "/clients/zippslip.webp", width: 443, height: 168 },
];
