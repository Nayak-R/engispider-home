'use client';

import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaRocket, FaUsers, FaAward, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

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

  const stats = [
    { icon: FaRocket, value: '1000+', label: 'Projects' },
    { icon: FaUsers, value: '500+', label: 'Clients' },
    { icon: FaAward, value: '10+', label: 'Years' },
    { icon: FaCheckCircle, value: '99%', label: 'Success' },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Border top with gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="relative p-6 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all"></div>

                <div className="relative z-10 text-center">
                  <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA Section - Hidden on contact page */}
        {!pathname?.startsWith('/contact') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 relative"
          >
            <div className="relative p-8 md:p-12 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-rotate-gradient"></div>

              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  Ready to Transform Your Business?
                </h3>
                <p className="text-gray-300 mb-6">
                  Get in touch with us today and discover how our innovative software solutions can drive your business growth.
                </p>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/30 text-white"
                  >
                    Contact Us
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Top Section with Logo */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Large Background Text - Only for this section - Hidden on mobile */}
          <div className="hidden lg:flex absolute inset-0 items-center justify-center overflow-hidden pointer-events-none">
            <h2
              className="text-[9rem] lg:text-[12rem] font-bold select-none tracking-tight leading-none"
              style={{
                color: 'transparent',
                WebkitTextStroke: '2px rgba(59, 130, 246, 0.15)',
              } as React.CSSProperties}
            >
              EngiSpider
            </h2>
          </div>

          {/* Logo and Description */}
          <div className="lg:col-span-4 relative z-10">
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
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.15, y: -3, rotate: 360 }}
                  className="relative group"
                  aria-label={social.label}
                >
                  <div className={`relative p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 ${social.color} transition-all overflow-hidden`}>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all"></div>
                    <social.icon className="w-5 h-5 relative z-10" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3 relative z-10"
          >
            <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Solutions
            </h4>
            <ul className="space-y-3">
              {solutions.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-blue-400 transition-all flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all group-hover:scale-150"></span>
                    <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative z-10"
          >
            <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Company
            </h4>
            <ul className="space-y-3">
              {company.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-blue-400 transition-all flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all group-hover:scale-150"></span>
                    <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-3 relative z-10"
          >
            <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 text-gray-400 group hover:text-blue-400 transition-colors cursor-pointer"
              >
                <FaMapMarkerAlt className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>Bhubaneswar, Odisha, India</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 text-gray-400"
              >
                <FaEnvelope className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <a href="mailto:info@engispider.com" className="hover:text-blue-400 transition-all block group">
                    <span className="group-hover:translate-x-1 inline-block transition-transform">info@engispider.com</span>
                  </a>
                  <a href="mailto:accounts@engispider.com" className="hover:text-blue-400 transition-all block text-sm group">
                    <span className="group-hover:translate-x-1 inline-block transition-transform">accounts@engispider.com</span>
                  </a>
                </div>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 text-gray-400"
              >
                <FaPhone className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <a href="tel:+917377799937" className="hover:text-blue-400 transition-all block group">
                    <span className="group-hover:translate-x-1 inline-block transition-transform">+91 73777 99937</span>
                  </a>
                  <a href="tel:+917873782505" className="hover:text-blue-400 transition-all block text-sm group">
                    <span className="group-hover:translate-x-1 inline-block transition-transform">+91 78737 82505</span>
                  </a>
                </div>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Large Background Text - Mobile only - Between contact info and copyright */}
        <div className="lg:hidden relative flex items-center justify-center overflow-hidden pointer-events-none py-8 mt-4">
          <h2
            className="text-[5rem] sm:text-[7rem] font-bold select-none tracking-tight leading-none"
            style={{
              color: 'transparent',
              WebkitTextStroke: '2px rgba(59, 130, 246, 0.15)',
            } as React.CSSProperties}
          >
            EngiSpider
          </h2>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mt-8"
        >
          {/* Gradient border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm text-center md:text-left"
            >
              &copy; {currentYear} <span className="text-blue-400 font-semibold">Engispider Infotech Private Limited</span>. All rights reserved.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 text-sm"
            >
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms &amp; Conditions
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-500 text-xs text-center md:text-right"
            >
              Best Software Company in Bhubaneswar | HRMS, CRM, ERP Solutions India
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Animated gradient bar at bottom */}
      <div className="relative h-1 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-rotate-gradient"></div>
      </div>
    </footer>
  );
}
