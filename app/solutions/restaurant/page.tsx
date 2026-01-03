'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RestaurantIllustration from '@/components/svg/RestaurantIllustration';
import { FaUtensils, FaCashRegister, FaConciergeBell, FaChartLine, FaUsersCog, FaFileInvoice, FaMobileAlt, FaClipboardList } from 'react-icons/fa';

export default function RestaurantPage() {
  const features = [
    { icon: FaCashRegister, title: 'POS System', description: 'Fast and efficient point-of-sale system for quick order processing' },
    { icon: FaConciergeBell, title: 'Table Management', description: 'Digital table booking, floor plan management, and real-time status' },
    { icon: FaUtensils, title: 'Menu Management', description: 'Easy menu creation, modification, and category management' },
    { icon: FaFileInvoice, title: 'Billing & KOT', description: 'Automated billing with Kitchen Order Ticket (KOT) generation' },
    { icon: FaUsersCog, title: 'Staff Management', description: 'Track waiter performance, shifts, and commission calculations' },
    { icon: FaChartLine, title: 'Sales Analytics', description: 'Detailed reports on sales, best-selling items, and revenue trends' },
    { icon: FaMobileAlt, title: 'Online Ordering', description: 'Integrated online ordering system with delivery management' },
    { icon: FaClipboardList, title: 'Inventory Control', description: 'Track ingredients, manage stock, and automate reordering' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/50 via-yellow-800/50 to-amber-700/50"></div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left lg:pl-12">
              <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-bold mb-6 mt-16">
                Restaurant Manager Software
                <span className="block text-amber-400 mt-2 text-3xl md:text-4xl">Complete POS & Management</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl text-gray-300 mb-8">
                All-in-one restaurant management system with POS, table booking, KOT, billing, inventory, and analytics. Built for restaurants and food businesses.
              </motion.p>
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mb-16">
                <Link href="/contact" className="inline-block bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-700 transition-all transform hover:scale-105 shadow-xl">
                  Request Demo
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }} className="relative h-96">
              <RestaurantIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Restaurant Management Features</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="bg-black/50 backdrop-blur-sm border border-yellow-500/20 p-6 rounded-2xl hover:border-yellow-500/50 transition-all">
                <feature.icon className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-yellow-600 to-amber-600">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Streamline Your Restaurant Operations</h2>
            <Link href="/contact" className="inline-block bg-white text-yellow-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
