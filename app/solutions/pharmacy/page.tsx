'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PharmacyIllustration from '@/components/svg/PharmacyIllustration';
import { FaPills, FaReceipt, FaUserMd, FaCalendarAlt, FaDatabase, FaExclamationTriangle, FaChartBar, FaPrint } from 'react-icons/fa';

export default function PharmacyPage() {
  const features = [
    { icon: FaPills, title: 'Medicine Management', description: 'Complete drug database with batch tracking and expiry management' },
    { icon: FaReceipt, title: 'Billing & Invoicing', description: 'Fast billing with GST compliance and multiple payment options' },
    { icon: FaUserMd, title: 'Prescription Management', description: 'Digital prescription handling and doctor database integration' },
    { icon: FaCalendarAlt, title: 'Expiry Tracking', description: 'Automated expiry alerts and near-expiry drug management' },
    { icon: FaDatabase, title: 'Inventory Control', description: 'Real-time stock updates with automatic reorder notifications' },
    { icon: FaExclamationTriangle, title: 'Drug Interaction Alerts', description: 'Safety alerts for drug interactions and contraindications' },
    { icon: FaChartBar, title: 'Sales Analytics', description: 'Comprehensive reports on sales, profit margins, and trends' },
    { icon: FaPrint, title: 'Print & Export', description: 'Print bills, labels, and export reports easily' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 via-red-800/50 to-orange-700/50"></div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left pl-8 lg:pl-12">
              <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-bold mb-6 mt-16">
                Pharmacy Manager System
                <span className="block text-orange-400 mt-2 text-3xl md:text-4xl">Complete Pharmacy Solution</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl text-gray-300 mb-8">
                Specialized pharmacy management software with inventory tracking, billing, prescription management, and compliance features. Built for Indian pharmacies.
              </motion.p>
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mb-16">
                <Link href="/contact" className="inline-block bg-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-xl">
                  Request Demo
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }} className="relative h-96">
              <PharmacyIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Pharmacy Management Features</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="bg-black/50 backdrop-blur-sm border border-red-500/20 p-6 rounded-2xl hover:border-red-500/50 transition-all">
                <feature.icon className="w-12 h-12 text-red-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Modernize Your Pharmacy</h2>
            <Link href="/contact" className="inline-block bg-white text-red-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
