'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InventoryIllustration from '@/components/svg/InventoryIllustration';
import { FaBoxes, FaBarcode, FaWarehouse, FaTruck, FaChartPie, FaBell, FaMobile, FaFileExport } from 'react-icons/fa';

export default function InventoryPage() {
  const features = [
    { icon: FaBoxes, title: 'Stock Management', description: 'Real-time inventory tracking across multiple locations with automated stock updates' },
    { icon: FaBarcode, title: 'Barcode Scanning', description: 'Quick product identification and stock updates with barcode/QR code integration' },
    { icon: FaWarehouse, title: 'Warehouse Management', description: 'Multi-warehouse support with location-based inventory tracking' },
    { icon: FaTruck, title: 'Order Management', description: 'Purchase orders, sales orders, and delivery tracking in one place' },
    { icon: FaChartPie, title: 'Analytics & Reports', description: 'Detailed insights into stock levels, sales trends, and inventory turnover' },
    { icon: FaBell, title: 'Low Stock Alerts', description: 'Automated notifications for low stock levels and reorder points' },
    { icon: FaMobile, title: 'Mobile App', description: 'Manage inventory on-the-go with our mobile application' },
    { icon: FaFileExport, title: 'Import/Export', description: 'Easy data import/export with Excel and CSV support' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 via-green-800/50 to-emerald-700/50"></div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left pl-8 lg:pl-12">
              <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-bold mb-6 mt-16">
                Inventory Manager Software
                <span className="block text-emerald-400 mt-2 text-3xl md:text-4xl">Smart Stock Management</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl text-gray-300 mb-8">
                Complete inventory management solution with real-time tracking, automated alerts, and comprehensive reporting. Built for businesses of all sizes.
              </motion.p>
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mb-16">
                <Link href="/contact" className="inline-block bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-xl">
                  Request Demo
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }} className="relative h-96">
              <InventoryIllustration />
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Complete Inventory Features</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="bg-black/50 backdrop-blur-sm border border-green-500/20 p-6 rounded-2xl hover:border-green-500/50 transition-all">
                <feature.icon className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Transform Your Inventory Management</h2>
            <Link href="/contact" className="inline-block bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
