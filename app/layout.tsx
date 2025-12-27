import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.engispider.com'),
  title: {
    default: "Engispider Infotech - Best Software Company in Bhubaneswar | HRMS, CRM, ERP Solutions",
    template: "%s | Engispider Infotech"
  },
  description: "Leading software development company in Bhubaneswar offering HRMS Software India, CRM System, Inventory Management, Pharmacy Manager, Restaurant POS, and custom business software solutions. Expert website development agency.",
  keywords: [
    // Software Company Keywords
    "software company",
    "software development company",
    "best software company",
    "software company in India",
    "software development company in India",
    "top software company India",
    "best software company bhubaneswar",
    "best software company in bhubaneswar",
    "best software company at bhubaneswar",
    "software company bhubaneswar",
    "software development bhubaneswar",
    "IT company bhubaneswar",
    "software solutions bhubaneswar",
    "tech company bhubaneswar",
    "software firm bhubaneswar",

    // Web Development Keywords
    "website development company",
    "website making agency",
    "web development company India",
    "website design company",
    "web development agency",
    "custom website development",
    "ecommerce website development",
    "responsive website design",

    // Software Solutions Keywords
    "HRMS software",
    "HRMS software India",
    "HR management system",
    "payroll software India",
    "employee management software",
    "attendance management system",

    "CRM software",
    "CRM system India",
    "customer relationship management",
    "sales CRM software",
    "CRM for small business",

    "inventory management software",
    "stock management system",
    "inventory tracking software",
    "warehouse management system",

    "pharmacy management software",
    "pharmacy billing software",
    "medical store software",
    "pharmacy POS system",

    "restaurant management software",
    "restaurant POS software",
    "restaurant billing system",
    "food ordering system",

    "ERP software India",
    "business management software",
    "enterprise software solutions",
    "custom software development",
    "software consulting services",

    // Technology Keywords
    "Angular development",
    "React development",
    "Next.js development",
    "Java Spring Boot",
    "MongoDB development",
    "full stack development",
    "cloud solutions",
    "API development"
  ],
  authors: [{ name: "Engispider Infotech Private Limited" }],
  creator: "Engispider Infotech",
  publisher: "Engispider Infotech Private Limited",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.engispider.com",
    siteName: "Engispider Infotech",
    title: "Engispider Infotech - Best Software Company in Bhubaneswar",
    description: "Leading software development company offering HRMS, CRM, ERP, and custom business solutions in India.",
    images: [
      {
        url: "/images/EngiSpider-fnl.png",
        width: 1200,
        height: 630,
        alt: "Engispider Infotech - Software Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engispider Infotech - Best Software Company in Bhubaneswar",
    description: "Leading software development company offering HRMS, CRM, ERP, and custom business solutions.",
    images: ["/images/EngiSpider-fnl.png"],
  },
  alternates: {
    canonical: "https://www.engispider.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/images/icon-logo.png" type="image/png" />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Engispider Infotech Private Limited",
              "alternateName": "Engispider",
              "url": "https://www.engispider.com",
              "logo": "https://www.engispider.com/images/EngiSpider-fnl.png",
              "description": "Leading software development company in Bhubaneswar, India offering HRMS, CRM, ERP, Inventory Management, Pharmacy, Restaurant POS, and custom business software solutions.",
              "foundingDate": "2014",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bhubaneswar",
                "addressRegion": "Odisha",
                "postalCode": "751024",
                "addressCountry": "IN"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+91-7377799937",
                  "contactType": "sales",
                  "areaServed": "IN",
                  "availableLanguage": ["English", "Hindi"]
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+91-7873782505",
                  "contactType": "customer support",
                  "areaServed": "IN",
                  "availableLanguage": ["English", "Hindi"]
                }
              ],
              "email": "info@engispider.com",
              "sameAs": [
                "https://www.facebook.com/Engispider",
                "https://www.linkedin.com/company/engispider",
                "https://twitter.com/EngispiderTech"
              ]
            })
          }}
        />

        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.engispider.com",
              "name": "Engispider Infotech Private Limited",
              "image": "https://www.engispider.com/images/EngiSpider-fnl.png",
              "telephone": "+91-7377799937",
              "email": "info@engispider.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bhubaneswar",
                "addressLocality": "Bhubaneswar",
                "addressRegion": "Odisha",
                "postalCode": "751024",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "20.2961",
                "longitude": "85.8245"
              },
              "url": "https://www.engispider.com",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "09:00",
                  "closes": "14:00"
                }
              ],
              "priceRange": "$$"
            })
          }}
        />

        {/* SoftwareApplication Schema for Products */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "SoftwareApplication",
                  "name": "HRMS Software",
                  "applicationCategory": "BusinessApplication",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "INR"
                  },
                  "operatingSystem": "Web",
                  "description": "Complete HR Management System for workforce management, payroll, and attendance tracking"
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "CRM System",
                  "applicationCategory": "BusinessApplication",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "INR"
                  },
                  "operatingSystem": "Web",
                  "description": "Customer Relationship Management system for business growth and sales tracking"
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "Inventory Manager",
                  "applicationCategory": "BusinessApplication",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "INR"
                  },
                  "operatingSystem": "Web",
                  "description": "Smart inventory tracking and stock management solution"
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "Pharmacy Manager",
                  "applicationCategory": "BusinessApplication",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "INR"
                  },
                  "operatingSystem": "Web",
                  "description": "Pharmacy management software with billing and inventory features"
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "Restaurant Manager",
                  "applicationCategory": "BusinessApplication",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "INR"
                  },
                  "operatingSystem": "Web",
                  "description": "Complete POS and management system for restaurants"
                }
              ]
            })
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Engispider Infotech",
              "url": "https://www.engispider.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.engispider.com/?s={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
