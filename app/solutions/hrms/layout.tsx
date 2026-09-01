import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'HRMS Software India | HR Management System',
  description:
    'Complete HRMS software for Indian businesses — payroll, attendance, leave, performance and recruitment in one cloud-based HR management system.',
  path: '/solutions/hrms',
  keywords: [
    'HRMS Software India',
    'HRMS Solutions',
    'HR Management System',
    'Payroll Software India',
    'Attendance Management System',
    'Leave Management Software',
    'Best HRMS India',
    'Cloud HRMS',
    'Biometric HRMS',
    'HR Software Bhubaneswar',
  ],
});

export default function HRMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        trail={[
          { name: 'Solutions', path: '/solutions' },
          { name: 'HRMS Software', path: '/solutions/hrms' },
        ]}
      />
      {children}
    </>
  );
}
