import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

/**
 * Metadata for /solutions/education.
 *
 * The canonical is unchanged — `pageMetadata` resolves `path` against
 * metadataBase and the trailing-slash setting, so this page stays
 * https://engispider.com/solutions/education/ exactly as it was. Nothing
 * here redirects, moves or 404s.
 *
 * The title was "School & College ERP Software | Engispider Campus", and the
 * root layout appends "| Engispider" to every title — so what actually
 * shipped was 68 characters and Google truncated the brand off the end. It
 * now reads "School & College ERP Software in India | Engispider" at 50,
 * which survives the cut and leads with the search intent rather than with
 * a product name nobody is typing yet.
 */

export const metadata = pageMetadata({
  title: 'School & College ERP Software in India',
  description:
    'School and college ERP built in Bhubaneswar: admissions, fee collection with two-step approval, automatic accounting, exams, hostel, transport and a parent app.',
  path: '/solutions/education',
  ogTitle: 'Engispider Campus — school & college ERP for Indian institutions',
  ogDescription:
    'Admissions, fees, accounting, exams, hostel, transport and a parent app on one platform. Guided demo on a live system, usually within two working days.',
  keywords: [
    'School ERP Software',
    'School Management Software',
    'College ERP Software',
    'School ERP software India',
    'School management software Odisha',
    'College ERP software India',
    'School fee management software',
    'College fee management software',
    'Student Information System',
    'Campus Management System',
    'Multi-campus education ERP',
    'Fees Management Software',
    'Online Fee Payment',
    'Hostel Management Software',
    'School Accounting Software',
    'Education ERP Bhubaneswar',
    'Academic ERP',
  ],
});

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        trail={[
          { name: 'Solutions', path: '/solutions' },
          { name: 'Engispider Campus', path: '/solutions/education' },
        ]}
      />
      {children}
    </>
  );
}
