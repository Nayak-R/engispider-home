import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Restro360 Training Guide | How to Use the Restaurant App',
  description: 'Step-by-step training guide for the Restro360 restaurant management app — POS, KOT, inventory, recipes, billing, reports, loyalty and more. For staff and owners.',
  keywords: ['Restro360 guide', 'restaurant POS training', 'how to use restaurant software', 'restaurant app user manual'],
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
