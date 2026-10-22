import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'School & College ERP Software | Engispider Campus',
  description:
    'Engispider Campus is a complete school and college ERP — admissions, fees, online payments, exams, hostel, transport, library and staff payroll on one platform.',
  path: '/solutions/education',
  keywords: [
    'School Management Software',
    'College ERP Software',
    'Student Management System',
    'Fees Management Software',
    'Education ERP India',
    'College Management System',
    'School Fees Software',
    'Online Fee Payment',
    'Hostel Management Software',
    'School Accounting Software',
    'Student Information System',
    'Campus Management System',
    'School ERP India',
    'College Fees Software',
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
