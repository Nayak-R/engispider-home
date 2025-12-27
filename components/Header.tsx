'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Home, Info, Briefcase, Mail, Sparkles } from 'lucide-react';
import { FaUsers, FaChartLine, FaBox, FaCapsules, FaUtensils, FaBriefcase } from 'react-icons/fa';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to check if a link is active
  const isLinkActive = (href: string, submenu?: any[]) => {
    // Exact match for home page
    if (href === '/' && pathname === '/') return true;
    // For other pages, check if pathname starts with href (but not for home)
    if (href !== '/' && pathname.startsWith(href)) return true;
    // Check submenu items
    if (submenu && submenu.some(sub => pathname === sub.href)) return true;
    return false;
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: Info },
    { href: '/services', label: 'Services', icon: Briefcase },
    { href: '/solutions', label: 'Solutions', icon: Sparkles,
      submenu: [
        { href: '/solutions/hrms', label: 'HRMS Software', icon: FaUsers, color: 'from-blue-600 to-cyan-500', description: 'HR & workforce management' },
        { href: '/solutions/crm', label: 'CRM System', icon: FaChartLine, color: 'from-purple-600 to-pink-500', description: 'Customer relationship tools' },
        { href: '/solutions/inventory', label: 'Inventory Manager', icon: FaBox, color: 'from-green-600 to-emerald-500', description: 'Stock tracking system' },
        { href: '/solutions/pharmacy', label: 'Pharmacy Manager', icon: FaCapsules, color: 'from-red-600 to-orange-500', description: 'Pharmacy operations' },
        { href: '/solutions/restaurant', label: 'Restaurant Manager', icon: FaUtensils, color: 'from-yellow-600 to-amber-500', description: 'POS & management' },
        { href: '/solutions/business', label: 'Business Solutions', icon: FaBriefcase, color: 'from-indigo-600 to-blue-500', description: 'Custom enterprise tools' },
      ]
    },
    { href: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <img
                src="/images/EngiSpider-Wht.png"
                alt="Engispider Logo"
                className="h-14 md:h-16 w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href, link.submenu);
              return (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={`font-medium transition-colors flex items-center gap-1 py-2 ${
                      isActive ? 'text-blue-400' : 'text-white hover:text-blue-400'
                    }`}
                  >
                    {link.label}
                    {link.submenu && (
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                {link.submenu && (
                  <div className="absolute left-1/2 -translate-x-1/2 pt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                    <div className="bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-xl overflow-hidden">
                      <div className="p-1.5">
                        {link.submenu.map((sublink, index) => {
                          const Icon = sublink.icon;
                          const isSubActive = pathname === sublink.href;
                          return (
                            <Link
                              key={sublink.href}
                              href={sublink.href}
                              className={`group/item relative block p-2.5 rounded-lg transition-all duration-200 ${
                                isSubActive ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br ${sublink.color} flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-transform duration-200`}>
                                  <Icon className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className={`text-sm font-semibold transition-colors truncate ${
                                    isSubActive ? 'text-blue-600' : 'text-gray-900 group-hover/item:text-blue-600'
                                  }`}>
                                    {sublink.label}
                                  </h3>
                                  <p className="text-xs text-gray-500 truncate">
                                    {sublink.description}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2.5 border-t border-gray-200">
                        <Link
                          href="/solutions"
                          className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 group/view"
                        >
                          View All Solutions
                          <ChevronDown className="w-3 h-3 -rotate-90 group-hover/view:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                </div>
              );
            })}
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="text-white w-6 h-6" />
            ) : (
              <Menu className="text-white w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-6"
            >
              <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 backdrop-blur-2xl border border-blue-200/50 rounded-2xl shadow-2xl p-3 space-y-2">
                {navLinks.map((link, index) => {
                  const isActive = isLinkActive(link.href, link.submenu);
                  const hasSubmenu = link.submenu;
                  const NavIcon = link.icon;

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {!hasSubmenu ? (
                        <Link
                          href={link.href}
                          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                              : 'text-gray-700 hover:bg-blue-100/50 hover:text-gray-900'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <NavIcon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                          <span>{link.label}</span>
                          {isActive && (
                            <motion.div
                              layoutId="mobileBubble"
                              className="ml-auto"
                            >
                              <div className="w-2 h-2 rounded-full bg-white" />
                            </motion.div>
                          )}
                        </Link>
                      ) : (
                        <div>
                          <button
                            onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                                : 'text-gray-700 hover:bg-blue-100/50 hover:text-gray-900'
                            }`}
                          >
                            <NavIcon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                            <span className="flex-1 text-left">{link.label}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`} />
                          </button>

                          <AnimatePresence>
                            {isSolutionsOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-2 space-y-1.5 overflow-hidden"
                              >
                                {link.submenu.map((sublink, subIndex) => {
                                  const Icon = sublink.icon;
                                  const isSubActive = pathname === sublink.href;
                                  return (
                                    <motion.div
                                      key={sublink.href}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: subIndex * 0.05 }}
                                    >
                                      <Link
                                        href={sublink.href}
                                        className={`flex items-center gap-3 pl-12 pr-4 py-3 rounded-xl transition-all group ${
                                          isSubActive
                                            ? 'bg-blue-100 border border-blue-300'
                                            : 'hover:bg-blue-50/50 border border-transparent'
                                        }`}
                                        onClick={() => {
                                          setIsMobileMenuOpen(false);
                                          setIsSolutionsOpen(false);
                                        }}
                                      >
                                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${sublink.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                          <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className={`text-sm font-semibold ${
                                            isSubActive ? 'text-blue-600' : 'text-gray-800 group-hover:text-blue-600'
                                          }`}>
                                            {sublink.label}
                                          </div>
                                          <div className="text-xs text-gray-600 truncate">
                                            {sublink.description}
                                          </div>
                                        </div>
                                        {isSubActive && (
                                          <div className="w-2 h-2 rounded-full bg-blue-600" />
                                        )}
                                      </Link>
                                    </motion.div>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="pt-2 mt-2 border-t border-blue-200"
                >
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:scale-[1.02]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Sparkles className="w-5 h-5" />
                    Get Started Now
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
