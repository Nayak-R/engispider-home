# Engispider Infotech - Next.js Website

Modern, SEO-optimized website for Engispider Infotech built with Next.js 16, Tailwind CSS, and Framer Motion.

## Features

- Modern, responsive design with premium animations
- SEO-optimized with meta tags, structured data, and sitemap
- Dedicated pages for all products/solutions:
  - HRMS Software India
  - CRM System for Businesses
  - Inventory Manager Software
  - Pharmacy Manager System
  - Restaurant Manager Software
  - Business Software Solutions
- About, Services, and Contact pages
- Static export ready for Hostinger deployment
- Framer Motion scroll animations
- Mobile-first responsive design
- Performance optimized

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: React Icons, Lucide React
- **Language**: TypeScript
- **SEO**: next-sitemap

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or navigate to the project directory:
```bash
cd engispider-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

To create an optimized production build:

```bash
npm run build
```

This will:
1. Build the Next.js application
2. Generate static HTML files in the `out` directory
3. Create sitemap.xml and robots.txt automatically

The build output will be in the `out` folder, ready for deployment.

## Deployment to Hostinger

### Step 1: Build the Project

```bash
npm run build
```

### Step 2: Upload to Hostinger

1. Log in to your Hostinger account
2. Go to **File Manager**
3. Navigate to `public_html` (or your domain's root directory)
4. Delete any existing files (if this is a fresh deployment)
5. Upload all files from the `out` folder to `public_html`

You can upload files by:
- Using the File Manager's upload feature
- Using FTP client (FileZilla, etc.)
- Using Hostinger's File Manager

### Step 3: Configure .htaccess (Important!)

Create a `.htaccess` file in your `public_html` directory with the following content:

```apache
# Enable HTTPS redirect (if you have SSL)
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle trailing slashes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !(.*)/$
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1/ [L,R=301]

# Serve index.html for routes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^/]+)/$ /$1.html [L]

# Remove .html extension
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L]

# Cache static assets
<FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js|svg|webp)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

### Step 4: Verify Deployment

1. Visit your domain (e.g., https://www.engispider.com)
2. Check all pages are loading correctly:
   - Home page (/)
   - About (/about)
   - Services (/services)
   - Solutions (/solutions)
   - All product pages (/solutions/hrms, /solutions/crm, etc.)
   - Contact (/contact)

3. Verify SEO elements:
   - Check `/sitemap.xml` is accessible
   - Check `/robots.txt` is accessible
   - Verify meta tags using browser dev tools

## SEO Configuration

The website is optimized for the following keywords:

- Best software company
- Best software company at Bhubaneswar / in Bhubaneswar
- Website making agency
- HRMS Software India / HRMS Solutions
- CRM System for Businesses
- Inventory Manager Software
- Pharmacy Manager System
- Restaurant Manager Software
- Business Software Solutions

All pages include:
- Meta descriptions
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)
- Canonical URLs

## Project Structure

```
engispider-nextjs/
├── app/
│   ├── about/
│   ├── contact/
│   ├── services/
│   ├── solutions/
│   │   ├── hrms/
│   │   ├── crm/
│   │   ├── inventory/
│   │   ├── pharmacy/
│   │   ├── restaurant/
│   │   └── business/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   └── Footer.tsx
├── public/
│   ├── images/
│   └── robots.txt
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

## Customization

### Update Company Information

Edit the following files:
- `app/layout.tsx` - Update meta tags and structured data
- `components/Footer.tsx` - Update contact information and social links
- `app/contact/page.tsx` - Update contact details

### Update Domain

1. Edit `.env.local`:
```
SITE_URL=https://your-domain.com
```

2. Edit `next-sitemap.config.js`:
```javascript
siteUrl: 'https://your-domain.com'
```

### Add Images

Place your images in the `public/images/` folder and reference them as:
```tsx
<img src="/images/your-image.jpg" alt="Description" />
```

## Important Notes for Hostinger

1. **Static Export**: This project uses Next.js static export (`output: 'export'`) which is compatible with Hostinger's shared hosting
2. **No Server-Side Features**: Features like API routes, server components with data fetching, and image optimization are not available in static export
3. **Images**: All images must be placed in the `public` folder and will not use Next.js Image Optimization
4. **Trailing Slashes**: The config includes `trailingSlash: true` for better compatibility with Hostinger

## Support

For issues or questions about deployment:
- Check Hostinger documentation
- Verify file permissions on server
- Check browser console for errors
- Ensure .htaccess is properly configured

## License

Private - Engispider Infotech Private Limited

## Contact

- **Email**: info@engispider.com
- **Website**: https://www.engispider.com
- **Location**: Bhubaneswar, Odisha, India
