'use client';

import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const solutions = [
    { name: 'HRMS Software', href: '/solutions/hrms' },
    { name: 'CRM System', href: '/solutions/crm' },
    { name: 'Inventory Manager', href: '/solutions/inventory' },
    { name: 'Pharmacy Manager', href: '/solutions/pharmacy' },
    { name: 'Restaurant Manager', href: '/solutions/restaurant' },
    { name: 'Business Solutions', href: '/solutions/business' },
  ];

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: 'https://facebook.com/engispider', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: FaLinkedinIn, href: 'https://linkedin.com/company/engispider', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: FaTwitter, href: 'https://twitter.com/engispidertech', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: FaInstagram, href: 'https://instagram.com/engispider', label: 'Instagram', color: 'hover:bg-pink-600' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-white/10 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Top Section with Logo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <motion.img
                src="/images/EngiSpider-Wht.png"
                alt="Engispider Logo"
                className="h-16 md:h-20 w-auto"
                whileHover={{ scale: 1.05 }}
              />
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Leading software development company in Bhubaneswar, India. We deliver innovative HRMS, CRM, ERP, and custom business solutions that transform businesses.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  className={`bg-white/5 backdrop-blur-sm p-3 rounded-lg ${social.color} transition-all border border-white/10`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div className="lg:col-span-3">
            <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Solutions
            </h4>
            <ul className="space-y-3">
              {solutions.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Company
            </h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <FaMapMarkerAlt className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <span>Bhubaneswar, Odisha, India</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <FaEnvelope className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <a href="mailto:info@engispider.com" className="hover:text-blue-400 transition-colors block">
                    info@engispider.com
                  </a>
                  <a href="mailto:accounts@engispider.com" className="hover:text-blue-400 transition-colors block text-sm">
                    accounts@engispider.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <FaPhone className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+917377799937" className="hover:text-blue-400 transition-colors block">
                    +91 73777 99937
                  </a>
                  <a href="tel:+917873782505" className="hover:text-blue-400 transition-colors block text-sm">
                    +91 78737 82505
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} Engispider Infotech Private Limited. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs text-center md:text-right">
              Best Software Company in Bhubaneswar | HRMS, CRM, ERP Solutions India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
