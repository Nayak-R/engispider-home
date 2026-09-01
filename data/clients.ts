/**
 * Customers shown on /customers and highlighted on the home page.
 *
 * `name` is read off each supplied logo rather than guessed from the domain
 * (mytechnosys.com brands itself "Technosys", shreemedu.in is the Shreem
 * Institute of Health Sciences), and `label` stays the domain so every card
 * carries a verifiable identity next to the mark.
 *
 * Logos are the optimised WebP renditions in public/images/clients/ — the
 * originals ranged up to 4200px / 1.2MB, which is far more than a ~200px tile
 * needs.
 */
/** Coarse category. Styling for each key lives in ClientLogoGrid — Tailwind
 *  does not scan this directory, so class names here would be purged. */
export type Sector = 'education' | 'healthcare' | 'logistics' | 'infrastructure' | 'hospitality';

export type Client = {
  slug: string;
  name: string;
  /** Domain where there is one, otherwise what the organisation actually is. */
  label: string;
  /** Omitted where no site has been supplied yet — the tile then isn't a link. */
  url?: string;
  /** Omitted where no mark has been supplied — `wordmark` is rendered instead. */
  logo?: string;
  /** Intrinsic size of the WebP, so the grid reserves space and never shifts. */
  width?: number;
  height?: number;
  /** Typeset stand-in used when `logo` is absent. */
  wordmark?: { kicker: string; title: string };
  /**
   * `sector` and `description` are filled in ONLY where the organisation's own
   * name or logo states its category — "Institute of Nursing", "RJ Logistic
   * Pvt. Ltd.", "Cafe & Kitchen". They are deliberately left empty for the
   * seven customers whose business is not stated on the assets supplied
   * (CloudsArtist21, JPS & JPN, MatLabs, MediJini, Pixelr, Technosys,
   * Waverra) rather than guessed, since this is a public page naming real
   * companies. Fill those in and the cards pick them up automatically.
   */
  sector?: Sector;
  description?: string;
};

export const CLIENTS: Client[] = [
  {
    slug: 'cloudsartist21',
    name: 'CloudsArtist21',
    label: 'cloudsartist21.com',
    url: 'https://cloudsartist21.com/',
    logo: '/images/clients/cloudsartist21.webp',
    width: 383,
    height: 280,
  },
  {
    slug: 'jpsandjpn',
    name: 'JPS & JPN',
    label: 'jpsandjpn.com',
    url: 'https://jpsandjpn.com/',
    logo: '/images/clients/jpsandjpn.webp',
    width: 130,
    height: 130,
  },
  {
    slug: 'matlabsindia',
    name: 'MatLabs',
    label: 'matlabsindia.com',
    url: 'https://matlabsindia.com/',
    logo: '/images/clients/matlabsindia.webp',
    width: 560,
    height: 177,
  },
  {
    slug: 'medijini',
    name: 'MediJini',
    label: 'medijini.com',
    url: 'https://medijini.com/',
    logo: '/images/clients/medijini.webp',
    width: 519,
    height: 280,
  },
  {
    slug: 'oreviacafe',
    name: 'Orevia Cafe & Kitchen',
    label: 'instagram.com/oreviacafe',
    url: 'https://www.instagram.com/oreviacafe/',
    logo: '/images/clients/oreviacafe.webp',
    width: 150,
    height: 150,
    sector: 'hospitality',
    description: 'Cafe and kitchen.',
  },
  {
    slug: 'pixelr',
    name: 'Pixelr',
    label: 'pixelr.co.in',
    url: 'https://pixelr.co.in/',
    logo: '/images/clients/pixelr.webp',
    width: 560,
    height: 159,
  },
  {
    slug: 'rjlogistic',
    name: 'RJ Logistic',
    label: 'rjlogistic.com',
    url: 'https://rjlogistic.com/',
    logo: '/images/clients/rjlogistic.webp',
    width: 362,
    height: 91,
    sector: 'logistics',
    description: 'Logistics services provider.',
  },
  {
    slug: 'rupalinfrastructure',
    name: 'Rupal Infrastructure',
    label: 'rupalinfrastructure.com',
    url: 'https://rupalinfrastructure.com/',
    logo: '/images/clients/rupalinfrastructure.webp',
    width: 256,
    height: 256,
    sector: 'infrastructure',
    description: 'Infrastructure development.',
  },
  {
    slug: 'shreemedu',
    name: 'Shreem Institute of Health Sciences',
    label: 'shreemedu.in',
    url: 'https://shreemedu.in/',
    logo: '/images/clients/shreemedu.webp',
    width: 280,
    height: 280,
    sector: 'education',
    description: 'Health sciences education in Odisha.',
  },
  {
    slug: 'technosys',
    name: 'Technosys',
    label: 'mytechnosys.com',
    url: 'https://mytechnosys.com/',
    logo: '/images/clients/technosys.webp',
    width: 560,
    height: 121,
  },
  {
    slug: 'waverra',
    name: 'Waverra',
    label: 'waverra.com',
    url: 'https://waverra.com/',
    logo: '/images/clients/waverra.webp',
    width: 560,
    height: 93,
  },

  // The Dhabaleswar group. No site URLs supplied yet, so these tiles are not
  // links — add a `url` to any entry and it becomes one. The ITI has no logo
  // either, so it falls back to a typeset wordmark.
  {
    slug: 'dhabaleswar-polytechnic',
    name: 'Dhabaleswar Institute of Polytechnic',
    label: 'Polytechnic institute',
    logo: '/images/clients/dhabaleswar-polytechnic.webp',
    width: 200,
    height: 200,
    sector: 'education',
    description: 'Polytechnic and technical education.',
  },
  {
    slug: 'dhabaleswar-pharmacy',
    name: 'Dhabaleswar Institute of Pharmacy',
    label: 'Pharmacy institute',
    logo: '/images/clients/dhabaleswar-pharmacy.webp',
    width: 110,
    height: 100,
    sector: 'education',
    description: 'Pharmacy education and training.',
  },
  {
    slug: 'dhabaleswar-nursing',
    name: 'Dhabaleswar Institute of Nursing',
    label: 'Nursing institute',
    logo: '/images/clients/dhabaleswar-nursing.webp',
    width: 280,
    height: 280,
    sector: 'education',
    description: 'Nursing education and training.',
  },
  {
    slug: 'dhabaleswar-iti',
    name: 'Dhabaleswar Industrial Training Institute',
    label: 'Industrial training institute',
    wordmark: { kicker: 'Dhabaleswar', title: 'Industrial Training' },
    sector: 'education',
    description: 'Industrial trade training.',
  },
];
