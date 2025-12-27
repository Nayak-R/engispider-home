import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HRMS Software India | Best HR Management System Solutions',
  description: 'Complete HRMS Software for Indian businesses. Manage payroll, attendance, leave, performance, and recruitment with our cloud-based HR management system. Best HRMS solutions in India.',
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
    'HR Software Bhubaneswar'
  ],
  openGraph: {
    title: 'HRMS Software India | Complete HR Management Solutions',
    description: 'Transform your HR operations with our comprehensive HRMS software. Payroll, attendance, leave management, and more.',
    type: 'website',
  },
};

export default function HRMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
